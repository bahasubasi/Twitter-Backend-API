const db = require('../../db');
// const constants = require('../../constants');

module.exports.tweet = async (body) => {
    return await new db.mongodb.CRUD('twitter', 'tweets').insert(body);
};

module.exports.getTweet = async (userId, tweetId) => {
    return await new db.mongodb.CRUD('twitter', 'tweets').find({ _id: tweetId, authorID: userId }, [0, 0], { tweet: true });
};

module.exports.changeTweet = async (body) => {
    return await new db.mongodb.CRUD('twitter', 'tweets').update({ _id: body.tweetId, authorID: body.userId },
        { $set: { tweet: body.tweet } });
};

module.exports.deleteTweet = async (body) => {
    let query = await new db.mongodb.CRUD('twitter', 'tweets').delete({ _id: body.tweetId, authorID: body.userId });

    const exist = await new db.mongodb.CRUD('twitter', 'tweets').find({ _id: body.tweetId, authorID: body.userId });
    if (!(exist.length == 0)) {
        if (body.tweetType == 1) {
            new db.mongodb.CRUD('twitter', 'tweets').update({ _id: body.belongID },
                { $inc: { quoteCount: -1 } });
        } else if (body.tweetType == 2) {
            new db.mongodb.CRUD('twitter', 'tweets').update({ _id: body.belongID },
                { $inc: { retweetCount: -1 } });
        } else if (body.tweetType == 3 || body.tweetType == 4) {
            new db.mongodb.CRUD('twitter', 'tweets').update({ _id: body.belongID },
                { $inc: { commentCount: -1 } });
        }
    }
    else {
        return false;
    }
    return query;
};

module.exports.quote = async (body) => {
    new db.mongodb.CRUD('twitter', 'tweets').update({ _id: body.belongTo.tweetID },
        { $inc: { quoteCount: 1 } });
    let belong = await new db.mongodb.CRUD('twitter', 'tweets').aggregate([
        {
            '$match': {
                _id: body.belongTo.tweetID
            }
        },
        {
            '$lookup': {
                from: 'users',
                localField: 'authorID',
                foreignField: '_id',
                as: 'author'
            }
        },
        {
            '$unwind': '$author'
        },
        {
            '$project': {
                'belong': '$author.username',
                'tweet': 1
            }
        }
    ]);

    body.belongTo.belong = belong[0].belong;
    body.belongTo.content = belong[0].tweet;

    return await new db.mongodb.CRUD('twitter', 'tweets').insert(body);
};

module.exports.retweet = async (body) => {
    const exist = await new db.mongodb.CRUD('twitter', 'tweets').find({ authorID: body.authorID, 'belongTo.tweetID': body.belongTo.tweetID, tweetType: body.tweetType });
    if (exist.length === 0) {
        new db.mongodb.CRUD('twitter', 'tweets').update({ _id: body.belongTo.tweetID },
            { $inc: { retweetCount: 1 } });
        let belong = await new db.mongodb.CRUD('twitter', 'tweets').aggregate([
            {
                '$match': {
                    _id: body.belongTo.tweetID
                }
            },
            {
                '$lookup': {
                    from: 'users',
                    localField: 'authorID',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                '$unwind': '$author'
            },
            {
                '$project': {
                    'belong': '$author.username',
                    'tweet': 1
                }
            }
        ]);

        body.belongTo.belong = belong[0].belong;
        body.belongTo.content = belong[0].tweet;

        return await new db.mongodb.CRUD('twitter', 'tweets').insert(body);
    }
    else {
        return false;
    }
};

module.exports.like = async (body) => {
    const exist = await new db.mongodb.CRUD('twitter', 'likes').find({ likerID: body.likerID, tweetID: body.tweetID });
    if (exist.length == 0) {
        new db.mongodb.CRUD('twitter', 'tweets').update({ _id: body.tweetID },
            { $inc: { likeCount: 1 } });
        return await new db.mongodb.CRUD('twitter', 'likes').insert(body);
    }
    else {
        return false;
    }
};

module.exports.destroyLike = async (userId, tweetId) => {
    let exist = await new db.mongodb.CRUD('twitter', 'likes').delete({ likerID: userId, tweetID: tweetId });
    if (exist.result !== 0) {
        new db.mongodb.CRUD('twitter', 'tweets').update({ _id: tweetId, authorID: userId },
            { $inc: { likeCount: -1 } });
        return exist;
    }
    else {
        return false;
    }
};

module.exports.comment = async (comment) => {
    new db.mongodb.CRUD('twitter', 'tweets').update({ _id: comment.belongTo.tweetID },
        { $inc: { commentCount: 1 } });
    let belong = await new db.mongodb.CRUD('twitter', 'tweets').aggregate([
        {
            '$match': {
                _id: comment.belongTo.tweetID
            }
        },
        {
            '$lookup': {
                from: 'users',
                localField: 'authorID',
                foreignField: '_id',
                as: 'author'
            }
        },
        {
            '$unwind': '$author'
        },
        {
            '$project': {
                'belong': '$author.username',
                'tweet': 1
            }
        }
    ]);

    comment.belongTo.belong = belong[0].belong;
    comment.belongTo.content = belong[0].tweet;

    return await new db.mongodb.CRUD('twitter', 'tweets').insert(comment);
};

module.exports.pressContent = async (userId, tweetId) => {
    return await new db.mongodb.CRUD('twitter', 'tweets').aggregate([{
        '$match': {
            '_id': tweetId
        }
    }, {
        '$lookup': {
            'from': 'tweets',
            'localField': 'belongTo.tweetID',
            'foreignField': '_id',
            'as': 'belong'
        }
    }, {
        '$lookup': {
            'from': 'tweets',
            'localField': '_id',
            'foreignField': 'belongTo.tweetID',
            'as': 'below'
        }
    }, {
        '$project': {
            'belong': 1,
            'below': 1
        }
    }]);
};

module.exports.getQuotes = async (body) => {
    const skip = (body.page - 1) * body.pageSize;
    const limit = body.pageSize * 1;
    return await new db.mongodb.CRUD('twitter', 'tweets').aggregate([{
        '$match': {
            '_id': body.tweetId,
            'authorID': body.userId
        }
    }, {
        '$lookup': {
            'from': 'tweets',
            'localField': '_id',
            'foreignField': 'belongTo.tweetID',
            'as': 'quotes'
        }
    }, {
        '$unwind': '$quotes'
    }, {
        '$match': {
            'quotes.tweetType': 1
        }
    }, {
        '$lookup': {
            'from': 'users',
            'localField': 'quotes.authorID',
            'foreignField': '_id',
            'as': 'quoters'
        }
    }, {
        '$unwind': '$quoters'
    }, {
        '$group': {
            '_id': '$quoters._id',
            'quoters': { '$first': '$quoters' }
        }
    }, {
        '$replaceRoot': { 'newRoot': '$quoters' }
    }, {
        '$project': {
            'username': 1
        }
    }, {
        '$skip': skip
    }, {
        '$limit': limit
    }]);
};

module.exports.getRetweets = async (body) => {
    const skip = (body.page - 1) * body.pageSize;
    const limit = body.pageSize * 1;
    return await new db.mongodb.CRUD('twitter', 'tweets').aggregate([{
        '$match': {
            '_id': body.tweetId,
            'authorID': body.userId
        }
    }, {
        '$lookup': {
            'from': 'tweets',
            'localField': '_id',
            'foreignField': 'belongTo.tweetID',
            'as': 'retweets'
        }
    }, {
        '$unwind': '$retweets'
    }, {
        '$match': {
            'retweets.tweetType': 2
        }
    }, {
        '$lookup': {
            'from': 'users',
            'localField': 'retweets.authorID',
            'foreignField': '_id',
            'as': 'retweeters'
        }
    }, {
        '$unwind': '$retweeters'
    }, {
        '$group': {
            '_id': '$retweeters._id',
            'retweeters': { '$first': '$retweeters' }
        }
    }, {
        '$replaceRoot': { 'newRoot': '$retweeters' }
    }, {
        '$project': {
            'username': 1
        }
    }, {
        '$skip': skip
    }, {
        '$limit': limit
    }]);
};
const db = require('../../db');
// const constants = require('../../constants');


module.exports.login = async (match) => {
    let query = await new db.mongodb.CRUD('twitter', 'users').find(match, [0, 1], { password: false });

    if (query !== false) {
        if (query.length > 0) {
            return query[0];
        }
        return null;
    }
    return false;
};

module.exports.register = async (user) => {
    return await new db.mongodb.CRUD('twitter', 'users').insert(user);
};

module.exports.getUser = async (userId) => {
    let user = await new db.mongodb.CRUD('twitter', 'users').find({ _id: userId });
    if (user.objectIdError !== true) {
        if (user.length > 0) {
            return user[0];
        }
        return null;
    }
    return false;
};

module.exports.changeUser = async (user) => {
    return await new db.mongodb.CRUD('twitter', 'users').update({ _id: user._id },
        { $set: { username: user.username, name: user.name, surname: user.surname, userType: user.userType, biography: user.biography } }
    );
};

module.exports.changePass = async (match, newpass2) => {
    return await new db.mongodb.CRUD('twitter', 'users').update(match,
        { $set: { password: newpass2 } }
    );
};

module.exports.deleteUser = async (user) => {
    return await new db.mongodb.CRUD('twitter', 'users').delete({ _id: user._id });
};

module.exports.profilePage = async (body, profile) => {
    const ctrl = await new db.mongodb.CRUD('twitter', 'follows').find({ followerID: body.userId, followingID: profile._id });
    let tweets;
    if ((profile.userType == 1) || ((profile.userType == 0) && !(ctrl.length == 0)) || (body.userId == profile._id)) {
        const skip = (body.page - 1) * body.pageSize;
        const limit = body.pageSize * 1;

        tweets = await new db.mongodb.CRUD('twitter', 'tweets').find({ authorID: profile._id }, [skip, limit]);

    }
    else {
        tweets = ('This account is private.');
    }
    return [profile.username, profile.biography, profile.createdAt, profile.followerCount, profile.followingCount, tweets];
};

module.exports.homePage = async (body) => {
    let temp = await new db.mongodb.CRUD('twitter', 'follows').find({ followerID: body.userId }, [0, 0], { followingID: true });

    let followingIDs = temp.map(follow => follow.followingID);

    const skip = (body.page - 1) * body.pageSize;
    const limit = body.pageSize * 1;

    let tweets = await new db.mongodb.CRUD('twitter', 'tweets').aggregate([
        {
            '$match': {
                authorID: { $in: followingIDs },
                tweetType: { $ne: 3 }
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
            '$sort': { createdAt: -1 }
        },
        {
            '$project': {
                '_id': 1,
                'authorID': 1,
                'tweet': 1,
                'tweetType': 1,
                'belongTo': 1,
                'likeCount': 1,
                'quoteCount': 1,
                'retweetCount': 1,
                'commentCount': 1,
                'createdAt': 1,
                'author.username': 1,
            }
        },
        {
            '$skip': skip
        },
        {
            '$limit': limit
        }
    ]);

    return tweets;
};

module.exports.searchUser = async (body) => {
    let agg = [];

    if (body.limit > 0) {
        agg.push({ $limit: body.limit });
    }

    if (body.skip > 0) {
        agg.push({ $skip: body.skip });
    }

    agg.push({
        $project: {
            username: true
        }
    });

    const query = await new db.mongodb.CRUD('twitter', 'users').aggregate([
        {
            $match: { username: { $regex: body.search } }
        },
        {
            $facet: {
                'data': agg,
                stats: [{ $count: 'total' }]

            }
        }
    ]
    );
    if (query !== false) {
        if (query.length > 0) {

            if (!query[0].stats[0].total) {
                query.stats.total = null;
            }
            query[0].stats[0].skip = body.skip;
            query[0].stats[0].limit = body.limit;
            return query;
        }
        return null;
    }
    return false;
};

module.exports.control = async (userId, tweetId) => {
    let user = await new db.mongodb.CRUD('twitter', 'tweets').aggregate([
        {
            '$match': {
                _id: tweetId
            }
        },
        {
            '$lookup': {
                from: 'users',
                localField: 'authorID',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            '$unwind': '$user'
        }
    ]);
    const ctrl = await new db.mongodb.CRUD('twitter', 'follows').find({ followerID: userId, followingID: user[0].user._id });
    if ((user[0].userType == 1) || ((user[0].userType == 0) && !(ctrl.length == 0)) || (userId == user[0].user._id)) {
        return true;
    }
    else {
        return false;
    }
};
const helpers = require('../../helpers');
const db = require('../../db');
// const constants = require('../../constants');


module.exports.follow = async (userType, userId, userId1) => {
    let ctrl = await new db.mongodb.CRUD('twitter', 'follows').find({ followerID: userId, followingID: userId1 });
    if (!ctrl[0]) {
        if (userType == 0) {
            return await new db.mongodb.CRUD('twitter', 'users').update({ _id: userId1 }, { $addToSet: { followreqs: userId } });
        }
        else if (userType == 1) {
            let body = {
                followerID: userId,
                followingID: userId1,
                createdAt: new Date()
            };
            new db.mongodb.CRUD('twitter', 'users').update({ _id: userId },
                { $inc: { followingCount: 1 } });
            new db.mongodb.CRUD('twitter', 'users').update({ _id: userId1 },
                { $inc: { followerCount: 1 } });
            return await new db.mongodb.CRUD('twitter', 'follows').insert(body);
        }
        else {
            return new helpers.error.WrongParam();
        }
    }
    else {
        return new helpers.error.WrongParam();
    }
};

module.exports.acceptReq = async (body) => {
    let ctrl = await new db.mongodb.CRUD('twitter', 'users').update(
        { _id: body.followingID },
        { $pull: { followreqs: body.followerID } }
    );

    if (ctrl.modifiedCount == 1) {
        new db.mongodb.CRUD('twitter', 'users').update({ _id: body.followerID },
            { $inc: { followingCount: 1 } });
        new db.mongodb.CRUD('twitter', 'users').update({ _id: body.followingID },
            { $inc: { followerCount: 1 } });
        return await new db.mongodb.CRUD('twitter', 'follows').insert(body);
    }
    else {
        return false;
    }
};

module.exports.denyReq = async (body) => {
    return await new db.mongodb.CRUD('twitter', 'users').update(
        { _id: body.followingID },
        { $pull: { followreqs: body.followerID } }
    );

};

module.exports.getReqs = async (body) => {
    const skip = (body.page - 1) * body.pageSize;
    const limit = body.pageSize * 1;

    return await new db.mongodb.CRUD('twitter', 'users').aggregate([{
        '$match': {
            '_id': body.userId
        }
    }, {
        '$lookup': {
            'from': 'users',
            'localField': 'followreqs',
            'foreignField': '_id',
            'as': 'result'
        }
    }, {
        '$unwind': '$result'
    }, {
        '$project': {
            '_id': '$result._id',
            'username': '$result.username',
        }
    },
    {
        '$skip': skip
    },
    {
        '$limit': limit
    }]);
};

module.exports.getFollowers = async (body) => {
    const skip = (body.page - 1) * body.pageSize;
    const limit = body.pageSize * 1;
    return await new db.mongodb.CRUD('twitter', 'follows').aggregate([{
        '$match': {
            'followingID': body.userId
        }
    }, {
        '$lookup': {
            'from': 'users',
            'localField': 'followerID',
            'foreignField': '_id',
            'as': 'result'
        }
    }, {
        '$unwind': '$result'
    }, {
        '$project': {
            '_id': '$result._id',
            'username': '$result.username',
        }
    },
    {
        '$skip': skip
    },
    {
        '$limit': limit
    }]);
};

module.exports.getFollowings = async (body) => {
    const skip = (body.page - 1) * body.pageSize;
    const limit = body.pageSize * 1;
    return await new db.mongodb.CRUD('twitter', 'follows').aggregate([{
        '$match': {
            'followerID': body.userId
        }
    }, {
        '$lookup': {
            'from': 'users',
            'localField': 'followingID',
            'foreignField': '_id',
            'as': 'result'
        }
    }, {
        '$unwind': '$result'
    }, {
        '$project': {
            '_id': '$result._id',
            'username': '$result.username',
        }
    },
    {
        '$skip': skip
    },
    {
        '$limit': limit
    }]);
};

module.exports.deleteFollower = async (userId, followerId) => {
    return await new db.mongodb.CRUD('twitter', 'follows').delete({ followingID: userId, followerID: followerId });
};

module.exports.deleteFollowing = async (userId, followingId) => {
    return await new db.mongodb.CRUD('twitter', 'follows').delete({ followerID: userId, followingID: followingId });
};
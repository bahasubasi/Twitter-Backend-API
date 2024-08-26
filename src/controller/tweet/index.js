const { ObjectId } = require('mongodb');
const helpers = require('../../helpers');
// const constants = require('../../constants');

module.exports.tweet = (req, res, next) => {
    try {
        let body = {};

        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        if (!req.body.tweet) {
            throw new helpers.error.MissingField();
        }
        body.tweet = req.body.tweet.toString();

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getTweet = (req, res, next) => {
    try {
        let body = {};
        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.changeTweet = (req, res, next) => {
    try {
        let body = {};
        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);
        body.tweet = req.body.tweet;

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.deleteTweet = (req, res, next) => {
    try {
        let body = {};
        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);
        body.tweetType = req.body.tweetType;
        body.belongID = req.body.belongID;

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.quote = (req, res, next) => {
    try {
        let body = {};

        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);
        body.tweet = req.body.tweet;

        if (!body.tweet) {
            throw new helpers.error.MissingField();
        }

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.retweet = (req, res, next) => {
    try {
        let body = {};

        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.like = (req, res, next) => {
    try {

        let body = {};

        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.destroyLike = (req, res, next) => {
    try {
        let body = {};
        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.comment = (req, res, next) => {
    try {
        let body = {};

        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);
        body.tweet = req.body.tweet;

        if (!body.tweet) {
            throw new helpers.error.MissingField();
        }

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.pressContent = (req, res, next) => {
    try {
        let body = {};
        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getQuotes = (req, res, next) => {
    try {
        let body = {};
        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);
        body.page = req.body.page;
        body.pageSize = req.body.pageSize;

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getRetweets = (req, res, next) => {
    try {
        let body = {};
        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.tweetId = ObjectId.createFromHexString(req.params.tweetId);
        body.page = req.body.page;
        body.pageSize = req.body.pageSize;

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

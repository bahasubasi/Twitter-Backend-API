const { ObjectId } = require('mongodb');
const helpers = require('../../helpers');
// const constants = require('../../constants');

module.exports.follow = (req, res, next) => {
    try {
        let body = {};

        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }
        if (!req.params.userId1 || (req.params.userId == req.params.userId1)) {
            throw new helpers.error.MissingField();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.userId1 = ObjectId.createFromHexString(req.params.userId1);

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.acceptReq = (req, res, next) => {
    try {
        let body = {};

        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }
        if (!req.params.userId1) {
            throw new helpers.error.MissingField();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.userId1 = ObjectId.createFromHexString(req.params.userId1);

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.denyReq = (req, res, next) => {
    try {
        let body = {};

        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }
        if (!req.params.userId1) {
            throw new helpers.error.MissingField();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.userId1 = ObjectId.createFromHexString(req.params.userId1);

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getReqs = (req, res, next) => {
    try {
        let body = {};
        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.page = req.body.page;
        body.pageSize = req.body.pageSize;
        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getFollowers = (req, res, next) => {
    try {
        let body = {};
        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.page = req.body.page;
        body.pageSize = req.body.pageSize;
        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getFollowings = (req, res, next) => {
    try {
        let body = {};
        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.page = req.body.page;
        body.pageSize = req.body.pageSize;
        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.deleteFollower = (req, res, next) => {
    try {
        let body = {};

        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }
        if (!req.params.userId1) {
            throw new helpers.error.MissingField();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.userId1 = ObjectId.createFromHexString(req.params.userId1);

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.deleteFollowing = (req, res, next) => {
    try {
        let body = {};

        if (req.params.userId != req.user._id) {
            throw new helpers.error.AccessDenied();
        }
        if (!req.params.userId1) {
            throw new helpers.error.MissingField();
        }

        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.userId1 = ObjectId.createFromHexString(req.params.userId1);

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
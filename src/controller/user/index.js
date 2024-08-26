const { ObjectId } = require('mongodb');
const helpers = require('../../helpers');
const Joi = require('joi');
// const constants = require('../../constants');

module.exports.login = (req, res, next) => {
    try {
        let body = {};
        if (!req.body.username || !req.body.password) {
            throw new helpers.error.MissingField();
        }
        body.username = req.body.username.toString();
        body.password = req.body.password.toString();

        req.body = body;

        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.register = (req, res, next) => {
    try {
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            name: Joi.string()
                .regex(/^[A-Za-z]+$/).required(),

            surname: Joi.string()
                .regex(/^[A-Za-z]+$/).required(),

            userType: Joi.number()
                .valid(0, 1).required(),

            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

            biography: Joi.string()
                .max(130).allow(''),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

            repeat_password: Joi.ref('password')

        });

        const body = req.body;

        const { error } = schema.validate(body);

        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details.map(detail => detail.message).join(', ')
            });
        }

        req.body = body;

        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.getUser = (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (req.user._id !== userId) {
            throw new helpers.error.AccessDenied();
        }
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.changeUser = (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (req.user._id != userId) {
            throw new helpers.error.AccessDenied();
        }

        const schema = Joi.object({

            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            name: Joi.string()
                .regex(/^[A-Za-z]+$/).required(),

            surname: Joi.string()
                .regex(/^[A-Za-z]+$/).required(),

            userType: Joi.number()
                .valid(0, 1).required(),

            biography: Joi.string()
                .max(130).allow(''),

        });

        const body = req.body;

        const { error } = schema.validate(body);

        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details.map(detail => detail.message).join(', ')
            });
        }

        body.userId = userId;

        req.body = body;

        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.changePass = (req, res, next) => {
    try {
        let body = {};
        const userId = req.params.userId;
        if (req.user._id != userId) {
            throw new helpers.error.AccessDenied();
        }
        if (!req.body.password || !req.body.newpass1 || !req.body.newpass2) {
            throw new helpers.error.MissingField();
        }
        if (req.body.newpass1 != req.body.newpass2) {
            throw new helpers.error.WrongParam();
        }
        body._id = userId.toString();
        body.password = req.body.password.toString();
        body.newpass2 = req.body.newpass2.toString();

        req.body = body;

        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.deleteUser = (req, res, next) => {
    try {
        let body = {};
        const userId = req.params.userId;
        if (req.user._id != userId) {
            throw new helpers.error.AccessDenied();
        }
        if (!userId) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        body._id = userId.toString();

        req.body = body;

        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.profilePage = (req, res, next) => {
    try {
        let body = {};
        body.userId = req.params.userId;
        body.profileId = req.params.profileId;
        body.page = req.body.page;
        body.pageSize = req.body.pageSize;
        if (req.user._id != body.userId) {
            throw new helpers.error.AccessDenied();
        }

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.homePage = (req, res, next) => {
    try {
        let body = {};
        body.userId = ObjectId.createFromHexString(req.params.userId);
        body.page = req.body.page;
        body.pageSize = req.body.pageSize;
        if (req.user._id != body.userId) {
            throw new helpers.error.AccessDenied();
        }

        req.body = body;
        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};

module.exports.searchUser = (req, res, next) => {
    try {
        let body = {
            skip: 0,
            limit: 10
        };
        if (req.user._id != req.params.userId) {
            throw new helpers.error.AccessDenied();
        }

        if (typeof req.body.skip === 'number') {
            body.skip = parseInt(req.body.skip, 10);
        }
        if (typeof req.body.limit === 'number') {
            body.limit = parseInt(req.body.limit, 10);
        }
        if (!req.body.search) {
            throw new helpers.error.MissingField();
        }
        body.search = req.body.search.toString();
        req.body = body;

        return next();
    } catch (error) {
        helpers.error.logger(error);
        return res.status(helpers.error.errorHandler(error).httpStatus).json(helpers.error.errorHandler(error));
    }
};
const helpers = require('../helpers');
const repositories = require('../repositories');

module.exports = async (req, res, next) => {
    try {

        if (req.user._id && req.params.tweetId) {
            let control = await repositories.user.control(req.params.userId, req.params.tweetId);
            if (control == false) {
                throw new helpers.error.AccessDenied();
            }

            return next();
        }

        return res.status(new helpers.error.UnAuth(22).httpStatus).json(new helpers.error.UnAuth(22));
    } catch (error) {
        helpers.error.logger(error);

        return res.status(new helpers.error.ServerError().httpStatus).json(new helpers.error.ServerError());
    }
};
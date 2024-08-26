const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let followerId = req.body.userId;
        let followingId = req.body.userId1;

        let following = await repositories.user.getUser(followingId);

        if (!following) {
            throw new helpers.error.NotFound(2);
        }

        let result = await repositories.follow.follow(following[0].userType, followerId, followingId);
        responseBody.result = result;

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
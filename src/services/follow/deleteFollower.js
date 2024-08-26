const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let userId = req.body.userId;
        let followerId = req.body.userId1;

        let follower = await repositories.user.getUser(followerId);

        if (!follower) {
            throw new helpers.error.NotFound(2);
        }

        let result = await repositories.follow.deleteFollower(userId, followerId);
        responseBody.result = result;

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
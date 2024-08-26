const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let resId = req.body.userId;
        let reqId = req.body.userId1;

        let request = await repositories.user.getUser(reqId);

        if (!request) {
            throw new helpers.error.NotFound(2);
        }

        let body = {
            followerID: reqId,
            followingID: resId
        };

        let result = await repositories.follow.denyReq(body);
        responseBody.result = result;

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let profile = await repositories.user.getUser(req.body.profileId);
        if (!profile) {
            throw new helpers.error.NotFound(2);
        }
        let result = await repositories.user.profilePage(req.body, profile[0]);
        responseBody.result = result;
    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
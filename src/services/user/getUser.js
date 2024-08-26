const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let user_id = req.params.userId;
        let user = await repositories.user.getUser(user_id);

        if (!user) {
            throw new helpers.error.NotFound(2);
        }

        responseBody.result = { user };
    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
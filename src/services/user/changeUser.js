const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let user = {
            _id: req.body.userId,
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            userType: req.body.userType,
            biography: req.body.biography
        };

        let result = await repositories.user.changeUser(user);

        responseBody.result = result;
    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
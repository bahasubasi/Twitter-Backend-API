const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let match = {
            _id: req.body._id,
            password: req.body.password,
        };
        let newpass2 = req.body.newpass2;
        let user = await repositories.user.changePass(match, newpass2);

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
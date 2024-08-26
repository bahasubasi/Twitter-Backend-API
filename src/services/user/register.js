const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let user = {
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            userType: req.body.userType,
            email: req.body.email,
            password: req.body.password,
            biography: req.body.biography,
            followreqs: [],
            followerCount: 0,
            followingCount: 0,
            createdAt: new Date()
        };

        let ctrl = await repositories.user.getUser(user.username);

        if (!ctrl[0]) {
            let result = await repositories.user.register(user);
            responseBody.result = result;
        }
        else {
            responseBody.result = ('Username is already used!');
        }

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
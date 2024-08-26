const constants = require('../../constants');
const helpers = require('../../helpers');
const repositories = require('../../repositories');

module.exports = async (req, res) => {
    let responseBody = constants.response.DEFAULT();

    try {
        let body = {
            authorID: req.body.userId,
            tweet: null,
            tweetType: 2,
            belongTo: {
                tweetID: req.body.tweetId,
                belong: null,
                content: null
            },
            likeCount: 0,
            quoteCount: 0,
            retweetCount: 0,
            commentCount: 0,
            createdAt: new Date()
        };
        let result = await repositories.tweet.retweet(body);
        responseBody.result = result;

    } catch (error) {
        helpers.error.logger(error);
        responseBody = helpers.error.errorHandler(error);
    }

    return res.status(responseBody.httpStatus).json(responseBody);
};
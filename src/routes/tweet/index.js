const express = require('express');
const router = express.Router();

const services = require('../../services');
const controller = require('../../controller');

const middlewares = require('../../middlewares');

/**
 * POST /tweet/{userId}/tweet
 * @summary tweet Endpoint
 * @description Retrieves userId from params, tweet from body. Adds tweet to tweet collection as tweetType 0.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {tweet} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * tweet
   * @typedef {object} tweet
   * @property {string} tweet.required 
   */

router.post('/:userId/tweet', [middlewares.authorization, controller.tweet.tweet], services.tweet.tweet);

/**
 * GET /tweet/{userId}/{tweetId}/getTweet
 * @summary getTweet Endpoint
 * @description Retrieves userId and tweetId from params. Returns tweet data.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.get('/:userId/:tweetId/getTweet', [middlewares.authorization, controller.tweet.getTweet], services.tweet.getTweet);

/**
 * PUT /tweet/{userId}/{tweetId}/changeTweet
 * @summary changeTweet Endpoint
 * @description Retrieves userId and tweetId from params, tweet from body. Changes tweet in database.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @param {changeTweet} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * changeTweet
   * @typedef {object} changeTweet
   * @property {string} tweet.required 
   */

router.put('/:userId/:tweetId/changeTweet', [middlewares.authorization, controller.tweet.changeTweet], services.tweet.changeTweet);

/**
 * DELETE /tweet/{userId}/{tweetId}/deleteTweet
 * @summary deleteTweet Endpoint
 * @description Retrieves userId and tweetId from params, tweetType and belongID from body. Deletes tweet from database.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @param {deleteTweet} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * deleteTweet
   * @typedef {object} deleteTweet
   * @property {string} tweetType.required 
   * @property {string} belongID.required 
   */

router.delete('/:userId/:tweetId/deleteTweet', [middlewares.authorization, controller.tweet.deleteTweet], services.tweet.deleteTweet);

/**
 * POST /tweet/{userId}/{tweetId}/quote
 * @summary quote Endpoint
 * @description Retrieves userId and tweetId from params, tweet from body. Creates a quote for tweetId and adds it to tweet collection as tweetType 1.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @param {quote} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * quote
   * @typedef {object} quote
   * @property {string} tweet.required 
   */

router.post('/:userId/:tweetId/quote', [middlewares.authorization, middlewares.control, controller.tweet.quote], services.tweet.quote);

/**
 * POST /tweet/{userId}/{tweetId}/retweet
 * @summary retweet Endpoint
 * @description Retrieves userId and tweetId from params. Creates a retweet for tweetId and adds it to tweet collection as tweetType 2.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.post('/:userId/:tweetId/retweet', [middlewares.authorization, middlewares.control, controller.tweet.retweet], services.tweet.retweet);

/**
 * POST /tweet/{userId}/{tweetId}/comment
 * @summary comment Endpoint
 * @description Retrieves userId and tweetId from params, tweet from body. Creates a comment for tweetId and adds it to tweet collection as tweetType 3.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @param {comment} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * comment
   * @typedef {object} comment
   * @property {string} tweet.required 
   */

router.post('/:userId/:tweetId/comment', [middlewares.authorization, middlewares.control, controller.tweet.comment], services.tweet.comment);

/**
 * POST /tweet/{userId}/{tweetId}/like
 * @summary like Endpoint
 * @description Retrieves userId and tweetId from params. Creates a like for tweetId and adds it to like collection.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.post('/:userId/:tweetId/like', [middlewares.authorization, middlewares.control, controller.tweet.like], services.tweet.like);

/**
 * POST /tweet/{userId}/{tweetId}/destroyLike
 * @summary destroyLike Endpoint
 * @description Retrieves userId and tweetId from params. Deletes a like of tweetId from database.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.post('/:userId/:tweetId/destroyLike', [middlewares.authorization, middlewares.control, controller.tweet.destroyLike], services.tweet.destroyLike);

/**
 * GET /tweet/{userId}/{tweetId}/pressContent
 * @summary pressContent Endpoint
 * @description Retrieves userId and tweetId from params. Returns content data. Content can be tweet, quote, retweet or comment.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.get('/:userId/:tweetId/pressContent', [middlewares.authorization, middlewares.control, controller.tweet.pressContent], services.tweet.pressContent);

/**
 * GET /tweet/{userId}/{tweetId}/getQuotes
 * @summary getQuotes Endpoint
 * @description Retrieves userId and tweetId from params, page and pageSize from body. Returns quotes of tweetId. page and pageSize are for pagination operations.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @param {getQuotes} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * getQuotes
   * @typedef {object} getQuotes
   * @property {string} page.required
   * @property {string} pageSize.required
   */

router.get('/:userId/:tweetId/getQuotes', [middlewares.authorization, middlewares.control, controller.tweet.getQuotes], services.tweet.getQuotes);

/**
 * GET /tweet/{userId}/{tweetId}/getRetweets
 * @summary getRetweets Endpoint
 * @description Retrieves userId and tweetId from params, page and pageSize from body. Returns retweets of tweetId. page and pageSize are for pagination operations.
 * @tags TWEET
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} tweetId.path - tweet id
 * @param {getRetweets} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * getRetweets
   * @typedef {object} getRetweets
   * @property {string} page.required
   * @property {string} pageSize.required
   */

router.get('/:userId/:tweetId/getRetweets', [middlewares.authorization, middlewares.control, controller.tweet.getRetweets], services.tweet.getRetweets);

module.exports = router;
const express = require('express');
const router = express.Router();

const services = require('../../services');
const controller = require('../../controller');

const middlewares = require('../../middlewares');

/**
 * POST /follow/{userId}/{userId1}
 * @summary follow Endpoint
 * @description Retrieves userId, userId1 from params. userId is follower and userId1 is following. If userId1's userType is 0, userId1's account is private, adds userId to userId1's followreqs in database. If userType is 1, userId1's account is public, adds them in follow collection in database. 
 * @tags FOLLOW
 * @security UserAuth
 * @param {string} userId.path - follower id
 * @param {string} userId1.path - following id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.post('/:userId/:userId1', [middlewares.authorization, controller.follow.follow], services.follow.follow);

/**
 * POST /follow/{userId}/{userId1}/acceptReq
 * @summary acceptReq Endpoint
 * @description Retrieves userId, userId1 from params. userId is responser, userId1 is requester. Deletes UserId1 from userId's followreqs and adds them to follow collection.
 * @tags FOLLOW
 * @security UserAuth
 * @param {string} userId.path - responser id
 * @param {string} userId1.path - requester id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.post('/:userId/:userId1/acceptReq', [middlewares.authorization, controller.follow.acceptReq], services.follow.acceptReq);

/**
 * POST /follow/{userId}/{userId1}/denyReq
 * @summary denyReq Endpoint
 * @description Retrieves userId, userId1 from params. userId is responser, userId1 is requester. Deletes UserId1 from userId's followreqs.
 * @tags FOLLOW
 * @security UserAuth
 * @param {string} userId.path - responser id
 * @param {string} userId1.path - requester id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.post('/:userId/:userId1/denyReq', [middlewares.authorization, controller.follow.denyReq], services.follow.denyReq);

/**
 * GET /follow/{userId}/getReqs
 * @summary getReqs Endpoint
 * @description Retrieves userId from params, page and pageSize from body. Returns userId's follow requests. page and pageSize are for pagination operations.
 * @tags FOLLOW
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {getReqs} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * getReqs
   * @typedef {object} getReqs
   * @property {string} page.required 
   * @property {string} pageSize.required 
   */

router.get('/:userId/getReqs', [middlewares.authorization, controller.follow.getReqs], services.follow.getReqs);

/**
 * GET /follow/{userId}/getFollowers
 * @summary getFollowers Endpoint
 * @description Retrieves userId from params, page and pageSize from body. Returns userId's followers. page and pageSize are for pagination operations.
 * @tags FOLLOW
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {getFollowers} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * getFollowers
   * @typedef {object} getFollowers
   * @property {string} page.required 
   * @property {string} pageSize.required 
   */

router.get('/:userId/getFollowers', [middlewares.authorization, controller.follow.getFollowers], services.follow.getFollowers);

/**
 * GET /follow/{userId}/getFollowings
 * @summary getFollowings Endpoint
 * @description Retrieves userId from params, page and pageSize from body. Returns userId's followings. page and pageSize are for pagination operations.
 * @tags FOLLOW
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {getFollowings} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * getFollowings
   * @typedef {object} getFollowings
   * @property {string} page.required 
   * @property {string} pageSize.required 
   */

router.get('/:userId/getFollowings', [middlewares.authorization, controller.follow.getFollowings], services.follow.getFollowings);

/**
 * DELETE /follow/{userId}/{userId1}/deleteFollower
 * @summary deleteFollower Endpoint
 * @description Retrieves userId and userId1 from params. userId is following, userId1 is follower. Deletes userId1 from userId's followers.
 * @tags FOLLOW
 * @security UserAuth
 * @param {string} userId.path - following id
 * @param {string} userId1.path - follower id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.delete('/:userId/:userId1/deleteFollower', [middlewares.authorization, controller.follow.deleteFollower], services.follow.deleteFollower);

/**
 * DELETE /follow/{userId}/{userId1}/deleteFollowing
 * @summary deleteFollowing Endpoint
 * @description Retrieves userId and userId1 from params. userId is follower, userId1 is following. Deletes userId from userId1's followers.
 * @tags FOLLOW
 * @security UserAuth
 * @param {string} userId.path - follower id
 * @param {string} userId1.path - following id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.delete('/:userId/:userId1/deleteFollowing', [middlewares.authorization, controller.follow.deleteFollowing], services.follow.deleteFollowing);

module.exports = router;
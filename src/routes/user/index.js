const express = require('express');
const router = express.Router();

const services = require('../../services');
const controller = require('../../controller');

const middlewares = require('../../middlewares');

/**
 * POST /user/login
 * @summary Login Endpoint 
 * @description Retrieves username and password from body, returns user token for a login.
 * @tags USER
 * @param {Login} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * login
   * @typedef {object} Login
   * @property {string} username.required 
   * @property {string} password.required 
   */

router.post('/login', [controller.user.login], services.user.login);

/**
 * POST /user/register
 * @summary Register Endpoint
 * @description Retrieves user data from body, creates a new user.
 * @tags USER
 * @param {Register} request.body.required 
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbiden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - Server error - application/json
 */

/**
   * register
   * @typedef {object} Register
   * @property {string} username.required 
   * @property {string} name.required 
   * @property {string} surname.required 
   * @property {string} userType.required
   * @property {string} email.required 
   * @property {string} biography.required 
   * @property {string} password.required 
   * @property {string} repeat_password.required 
   */

router.post('/register', [controller.user.register], services.user.register);

/**
 * GET /user/{userId}/getUser
 * @summary getUser Endpoint
 * @description Retrieves userId from params, returns user data.
 * @tags USER
 * @security UserAuth
 * @param {string} userId.path - user id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.get('/:userId/getUser', [middlewares.authorization, controller.user.getUser], services.user.getUser);

/**
 * PUT /user/{userId}/changeUser
 * @summary changeUser Endpoint
 * @description Retrieves userId from params, changes user data in database.
 * @tags USER
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {changeUser} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * changeUser
   * @typedef {object} changeUser
   * @property {string} username.required 
   * @property {string} name.required 
   * @property {string} surname.required 
   * @property {string} userType.required 
   * @property {string} biography.required 
   */

router.put('/:userId/changeUser', [middlewares.authorization, controller.user.changeUser], services.user.changeUser);

/**
 * PUT /user/{userId}/changePass
 * @summary changePass Endpoint
 * @description Retrieves userId from params; passwords from body and changes user password in database.
 * @tags USER
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {changeUser} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * changePass
   * @typedef {object} changePass
   * @property {string} password.required 
   * @property {string} newpass1.required 
   * @property {string} newpass2.required 
   */

router.put('/:userId/changePass', [middlewares.authorization, controller.user.changePass], services.user.changePass);

/**
 * DELETE /user/{userId}/deleteUser
 * @summary deleteUser Endpoint
 * @description Retrieves userId from params, deletes user in database.
 * @tags USER
 * @security UserAuth
 * @param {string} userId.path - user id
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

router.delete('/:userId/deleteUser', [middlewares.authorization, controller.user.deleteUser], services.user.deleteUser);

/**
 * GET /user/{userId}/{profileId}/profilePage
 * @summary profilePage Endpoint
 * @description Retrieves userId and profileId from params; page, pageSize from body and returns profile data of profileId. page and pageSize are for pagination operations.
 * @tags USER
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {string} profileId.path - profile id
 * @param {profilePage} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * profilePage
   * @typedef {object} profilePage
   * @property {string} page.required 
   * @property {string} pageSize.required 
   */

router.get('/:userId/:profileId/profilePage', [middlewares.authorization, controller.user.profilePage], services.user.profilePage);

/**
 * GET /user/{userId}/homePage
 * @summary homePage Endpoint
 * @description Retrieves userId from params; page, pageSize from body and returns homepage data of userId. page and pageSize are for pagination operations.
 * @tags USER
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {homePage} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * homePage
   * @typedef {object} homePage
   * @property {string} page.required 
   * @property {string} pageSize.required 
   */

router.get('/:userId/homePage', [middlewares.authorization, controller.user.homePage], services.user.homePage);

/**
 * GET /user/{userId}/searchUser
 * @summary searchUser Endpoint
 * @description Retrieves userId from params; search, page, pageSize from body and returns users whose usernames matches with search. page and pageSize are for pagination operations.
 * @tags USER
 * @security UserAuth
 * @param {string} userId.path - user id
 * @param {searchUser} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 403 - forbidden response - application/json
 * @return {object} 422 - wrong parameter(s) - application/json
 * @return {object} 500 - server error - application/json
 */

/**
   * searchUser
   * @typedef {object} searchUser
   * @property {string} search.required 
   * @property {string} page.required 
   * @property {string} pageSize.required 
   */

router.get('/:userId/searchUser', [middlewares.authorization, controller.user.searchUser], services.user.searchUser);

module.exports = router;
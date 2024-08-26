const express = require('express');
const router = express.Router();


const user = require('./user');
const follow = require('./follow');
const tweet = require('./tweet');


router.use('/user', user);
router.use('/follow', follow);
router.use('/tweet', tweet);


module.exports = router;
const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlData = require('../controllers/data.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.get('/getResume/:user',jwtHelper.verifyJwtToken, ctrlData.getData);
router.post('/uploadResume',jwtHelper.verifyJwtToken, ctrlData.upload);
router.put('/updateResume/:id',jwtHelper.verifyJwtToken, ctrlData.update);
router.delete('/deleteResume/:id',jwtHelper.verifyJwtToken, ctrlData.delete);
router.delete('/deleteAllResume',jwtHelper.verifyJwtToken, ctrlData.deleteAll);

module.exports = router;

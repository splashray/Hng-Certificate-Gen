/* eslint-disable linebreak-style */
const { body } = require('express-validator');
const { Router } = require('express');
const controller = require('../controllers/formUploadController');

const router = Router();

router
  .post('/',  
      body('name').not().isEmpty(),
      body('description').not().isEmpty(),
      body('award').not().isEmpty(),
      body('name_of_organization').not().isEmpty(),
      body('date').not().isEmpty(),
      body('signed').not().isEmpty(),  
      controller.postData)
  .post('/download', controller.getUserData)

module.exports = router;

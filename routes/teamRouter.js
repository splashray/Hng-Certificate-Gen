/* eslint-disable linebreak-style */
const { Router } = require('express');
const controller = require('../controllers/teamController');

const router = Router();

router
  .get('/', controller.getTeamMembers)
  .get('/:id', controller.getTeamMember)
  .post('/', controller.addTeamMember)
  .put('/:id', controller.updateTeamMember)
  .delete('/:id', controller.deleteTeamMember);

module.exports = router;

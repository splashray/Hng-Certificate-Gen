/* eslint-disable linebreak-style */
const Member = require('../models/Member');

// get list of all team members
exports.getTeamMembers = async (req, res, next) => {
  try {
    Member.find({}, 'role avatar email name', (err, team) => {
      if (err) {
        next(err);
      }
      res.status(200).json(team);
    });
  } catch (error) {
    next(error);
  }
};

// get a team member using a unique identifier
exports.getTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    Member.findById(id, (err, member) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(member);
    });
  } catch (error) {
    next(error);
  }
};

exports.addTeamMember = async (req, res, next) => {
  try {
    const { body } = req;
    const member = await new Member(body).save();
    return res.status(200).json({
      success: true,
      message: 'member added successfully',
      id: member._id,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    res.send(`updated members ${id}`);
  } catch (error) {
    next(error);
  }
};

exports.deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndDelete(id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'member details not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'member deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

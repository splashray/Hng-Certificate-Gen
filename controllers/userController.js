const User = require('../models/userModel');

const updateUserName = async (req, res) => {
    if(!req?.params.id) return res.status(400).json({'message': 'user ID required'});

    const { name } = req.body

    const user = await User.findOne({_id: req.params.id}).exec();
    
    user.name = name;
    await user.save();

    return res.status(201).json({user})
}

const updateAvatar = async (req, res) => {
    if(!req?.params.id) return res.status(400).json({'message': 'user ID required'});

    const { avatar } = req.body;

    const user = await User.findOne({_id: req.params.id}).exec();

    user.avatar = avatar;
    await user.save();

    return res.status(201).json({user});
}


module.exports = {
    updateUserName,
    updateAvatar,
}
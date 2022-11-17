const express = require('express')
const router = express.Router()
const Profile = require('../models/userProfile');



//This is for getting each user profile
router.get("/:id", async (req, res) => {
    const profile = await Profile.findById(req.params.id);
  
    if (!profile) return res.status(404).send('profile not available.');
  
    res.status(200).send(profile);
  });



  //This is for creating each user profile
  router.post('/:id', async (req, res) => {
   const  profile = new Profile({ 
    avatar:req.body.avatar,
    name: req.body.name,
    job: req.body.job,
    location: req.body.location,
    email: req.body.email,
    phoneNumber: req.body.phonenNmber,
    });
   await profile.save();
   if(!profile)
    return res.status(404).send('profile cannot be created')
    
    res.send(profile);
  });


  //this for updating profile
  router.put('/:id', async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('invalid profile Id')
    }
    const profile = await Profile.findByIdAndUpdate(req.params.id,
      { 
      avatar:req.body.avatar,
      name: req.body.name,
      job: req.body.job,
      location: req.body.location,
      email: req.body.email,
      phoneNumber: req.body.phonenNmber,
      }, 
      { new: true });
  
    if (!profile) return res.status(404).send('profile not updated.');
    
    res.send(profile);
  });


  router.delete('/:id', async (req, res) => {
    const profile = await Profile.findByIdAndRemove(req.params.id);
  
    if (!profile) return res.status(404).send('The profile with the given ID was not found.');
  
    res.send("profile deleted");
  });


module.exports = router

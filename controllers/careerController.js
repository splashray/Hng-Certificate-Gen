const Career = require( "../models/careerModel")
const createError = require('../utils/error')


 const createCareer = async(req, res, next) =>{
    try {
        const newCareer = new Career({...req.body})
        await newCareer.save()
        res.status(201).json({response: newCareer, message:`New Career Created`})
    } catch (err) {
            next(err)
    }
}

const getAllCareer = async (req, res) =>{
    const careers = await Career.find({})
    res.status(200).json({response: careers})
}

 const getCareer =  async (req, res, next) =>{
        const {id:careerID} = req.params
        const career = await Career.findOne({_id:careerID})

        if(!career){
            return next(createError(404, `No Career with id: ${careerID}`))         
        }
            res.status(200).json({response:career})
}

const DeleteCareer =  async (req, res,next) =>{
        const {id:careerID} = req.params
        const career = await Career.findOneAndDelete({_id:careerID})

        if(!Career){
            return  next(createError(404, `No Career with id: ${CareerID}`))         
        }
            res.status(200).json({response: Career, message:`Career has been Deleted`})
}

const updateCareer =  async (req, res, next) =>{
        const {id:careerID} = req.params
        const career = await Career.findOneAndUpdate({_id:careerID},req.body,{
            new:true,
            runValidator:true
        })

        if(!career){
            return next(createError(404, `No Career with id: ${careerID}`))         
        }
        res.status(200).json({response: career, message:`Career Info Updated`})
}

module.exports ={
    createCareer, getAllCareer ,getCareer, DeleteCareer, updateCareer
}
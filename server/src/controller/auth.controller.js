const jwt = require("jsonwebtoken")
require("dotenv").config()
const Doctor = require("../model/doctor.model")
const {validationResult} = require("express-validator")


const newToken = (doctor) => {
    return jwt.sign({id: doctor.id}, process.env.JWT_SECRETKEY)
}

const register = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const doctor = await Doctor.create(req.body)
        const token = newToken(doctor)
        return res.status(201).json({token: token})
    }catch(e){
        return res.status(500).json({status: "failed", message: "Something went wrong"})
    }
}
const signin = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const doctor = await Doctor.findOne({username: req.body.username})
        if(!doctor){
            return res.status(401).json({status: "failed",message: "User doesnt exist. Kindly Register"})
        }
        const passwordMatch = await doctor.checkPassword(req.body.password)
        if (!passwordMatch){
            return res.status(401).json({status: "failed",message: "Incorrect Pasword"})
        }
        const token = newToken(doctor)
        return res.status(201).json({token: token})
    }catch (e) {
        return res.status(500).json({status: "failed",message: "Something went wrong."})
    }
}



module.exports = {
    register: register,
    signin: signin
}
const express = require("express")
const router = express.Router()


const Doctor = require("../model/doctor.model")

router.get("/", async(req, res) => {
    const doctors = await Doctor.find({}).lean().exec()
    res.status(201).json({data: doctors})
})

module.exports = router
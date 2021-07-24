const express = require("express")
const router = express.Router()
const Patient = require("../model/patient.model")


router.get("/", async(req, res) => {
    try{
        const search = req.query.s
        const resp = await Patient.find({$text: {$search: search}})
        res.status(200).json({data: resp})
    }
    catch(e){
        res.status(404).send("something went wrong")
    }
})

module.exports = router
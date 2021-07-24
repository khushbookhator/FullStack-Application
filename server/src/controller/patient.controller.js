const express = require("express")
const router = express.Router()
const upload = require("../utils/fileUpload")

const Patient = require("../model/patient.model")
const Med = require("../model/med.model")

//{gender: {$eq: gender}}
router.get("/", async(req, res) => {

    const page = +req.query.page || 1;
    const size = +req.query.size || 10;
    const asc = +req.query.asc || 0
    const offset = (page-1)*size
    const patient = await Patient.find().sort({"age": asc}).skip(offset).limit(size).populate('med').lean().exec()

    const totalPages = Math.ceil((await Patient.find().countDocuments().lean().exec())/size)
    const data = {patient, totalPages}
    return res.status(201).json({data: data})
})

router.get("/:id", async(req, res) => {
    const id = req.params.id
    const patient = await Patient.findById(id).populate('medicines').populate('doctor').lean().exec()
    res.status(201).json({data: patient})
})

router.get("/:type", async(req, res) => {
    const type = req.params.type
    const patient = await Patient.find({$gender: {$eq: type}})
    res.status(201).json({data: patient})
})


router.post("/" ,async(req, res) => {
    let meds = await Med.create(req.body.medicines);

    meds = meds.map(med=> med._id);
    
    const patient = await Patient.create({...req.body, medicines: meds})

    res.status(201).json({data: patient})
})





module.exports = router
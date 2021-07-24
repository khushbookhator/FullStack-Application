const express = require("express")
const router = express.Router()
const upload = require("../utils/fileUpload")

const Patient = require("../model/patient.model")

router.get("/", async(req, res) => {

    const page = +req.query.page || 1;
    const size = +req.query.size || 10;
    const offset = (page-1)*size
    const patient = await Patient.find().skip(offset).limit(size).lean().exec()

    const totalPages = Math.ceil((await Patient.find().countDocuments().lean().exec())/size)
    const data = {patient, totalPages}
    return res.status(201).json({data: data})
})


router.post("/", upload.single("profilePic") ,async(req, res) => {
    const patient = await Patient.create({
        name: req.body.name,
        age: req.body.age,
        profile: req.file.path,
        gender: req.body.gender,
        doctor: req.body.doctor,
        medicines: req.body.medicines
    })
    res.status(201).json({data: patient})
})

module.exports = router
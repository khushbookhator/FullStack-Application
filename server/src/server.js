const express = require('express');
const app = express();
const cors = require('cors')
const {register, signin} = require("./controller/auth.controller")
const doctorController = require("./controller/doctor.controller")
const patientController = require("./controller/patient.controller")

app.use(express.json());
app.use(cors())

app.use('/api/doctor', doctorController);
app.use("/api/patient", patientController)


app.post("/register", register)
app.post("/signin",signin)



module.exports = app;
const mongoose = require("mongoose")


const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        text: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        text: true
    },
    profile: {
        type:String,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "doctor"
    },
    medicines : [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "med" 
    }]
},
{
    timestamps: true,
    versionKey: false
})



const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient
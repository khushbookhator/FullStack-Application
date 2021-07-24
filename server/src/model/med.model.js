const mongoose = require("mongoose")


const medSchema = new mongoose.Schema({
    medicines :{type: String},
    qty: {type: Number}
},
{
    timestamps: true,
    versionKey: false
})



const Meds = mongoose.model("med", medSchema);

module.exports = Meds
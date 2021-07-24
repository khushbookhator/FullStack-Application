const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const doctorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
})

doctorSchema.pre("save", function(next){
    if(!this.isModified("password")) return next();
    bcrypt.hash(this.password, 8, (err, hash) => {
        if(err) return next(err)
        this.password = hash;
        next();
    })
})

doctorSchema.methods.checkPassword = function(password){
    const userPassword = this.password
    return new Promise((res, rej) => {
        bcrypt.compare(password, userPassword, (err, same) => {
            if(err) return rej(err)
            res(same)
        })
    })
}



const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = Doctor
import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema({})

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema)

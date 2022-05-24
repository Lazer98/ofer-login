const mongoose = require("mongoose");
const Joi = require("joi");


let studentSchema = new mongoose.Schema({
  name:String,
  grade:Number,
  subject:String,
  // יכיל את האיי די מהקולקשן יוזרס של המשתמש
  // שהוסיף את העוגה
  user_id:String,
  date_created:{
    type:Date, default:Date.now()
  }
})

exports.StudentModel = mongoose.model("students", studentSchema);

exports.validateStudent = (_reqBody) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(99).required(),
    grade:Joi.number().min(0).max(100).allow(null,""),
    subject:Joi.string().min(3).max(500).allow(null,"")
  })
  return joiSchema.validate(_reqBody)
}
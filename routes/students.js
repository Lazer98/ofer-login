const express= require("express");
const { auth } = require("../middleWares/atuh");
const { validateStudent, StudentModel } = require("../models/studentsModel");
const router = express.Router();

router.get("/",async(req,res)=>{
   
    try{
        let perPage=    req.query.perPage || 2;
        let page=  req.query.page ||1;
        let data =await StudentModel.find({})
         .limit(perPage)
         .skip((page-1)*perPage)
       res.json(data);

    }catch (err){
        console.log(err);
        res.status(500).json({msg_err:"There is a problem with the server"});
    }


})

router.get("/myInfo",auth,async(req,res)=>{
    try{
        let perPage=    req.query.perPage || 2;
        let page=  req.query.page ||1;
        let data =await StudentModel.find({user_id:req.tokenData._id})
         .limit(perPage)
         .skip((page-1)*perPage)
       res.json(data);

    }catch (err){
        console.log(err);
        res.status(500).json({msg_err:"There is a problem with the server"});
    }
})

router.get("/search",async(req,res)=>{
    try{
        let searchQ=req.query.s;
        let searchReg= new RegExp(searchQ,"i");
        let data= await StudentModel.find({$or:[{name:searchReg},{subject:searchReg}]})
        .limit(20)
        res.json(data);


    }catch (err){
        console.log(err);
        res.status(500).json({msg_err:"There is a problem with the server"});
    }


})


router.post("/",auth,async(req,res)=>{
    let validBody= validateStudent(req.body);
        if(validBody.error){
            return res.status(400).json(validBody.error.details);
        }
    try{
        let student= new StudentModel(req.body);
        student.user_id=req.tokenData._id;
        await student.save();
        res.status(201).json(student);

    }catch{
        console.log(err);
        res.status(500).json({msg_err:"There problem in server try again later"})
    }

})

router.put("/:idStudent",auth,async(req,res)=>{
    let validateBody= validateStudent(req.body);
        if(validateStudent){
            return res.status(400).json(validateBody.error.details);
        }
    try{
        let idStudent=  req.params.idStudent;
        let data =await StudentModel.updateOne({_id:idStudent,user_id:req.tokenData._id},req.body);

        res.json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({msg_err:"There problem in server try again later"})

    }
})

router.delete("/idDel",auth,async(req,res)=>{

    try{
    let idDel=req.params.idDel;
    let data= await StudentModel.deleteOne({_id:idDel,user_id:req.tokenData._id});
    res.json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({msg_err:"There problem in server try again later"})
    }

})

module.exports = router;
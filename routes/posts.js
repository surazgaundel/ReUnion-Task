const router=require('express').Router();
const verify=require('./verifyToken');

router.get('/', verify , (req,res)=>{
    res.json({
        posts:{
            title:'My first Posts',
            descriptions:'This is the random posts which you will after using jsonweb tokens'
        }
    })
})

module.exports=router;
const router=require('express').Router();
const User=require('../models/User');
const Post=require('../models/Post');
const {registerValidator,loginValidator, postValidator}=require('../Validation');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const followUser=require('./userFollow');



router.post('/register',async(req,res)=>{

    //TODO: validate the req.body 
    const {error}=registerValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check for unique user
    const emailPresent=await User.findOne({email:req.body.email})
    if(emailPresent) return res.status(400).send('Already email is present in our db')

    //hash the password
    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(req.body.password,salt)
    //create a new user
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword,

    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }

})

router.post('/authenticate',async(req,res)=>{
    //validate the login field
    const {error}=loginValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     //check for  user
     const userPresent=await User.findOne({email:req.body.email})
     if(!userPresent) return res.status(400).send('Invalid Email');

     //check the password
     const validPassword=await bcrypt.compare(req.body.password,userPresent.password);
     if(!validPassword) return res.status(400).send('Invalid password')

    //  res.send("You are successfully login")

     //create and assign the json web token
    const token=jwt.sign({_id:userPresent._id},process.env.SECRET_TOKEN);
    res.header('auth-token',token).send(token)

})

router.post('/follow',async(req,res)=>{

    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('User not Found');



});

//create post
router.post('/posts',async (req,res)=>{
    // const {error}=postValidator(req.body);
    // if(error) return res.status(400).send(error.details[0].message)

    const post=new Post({
        name:req.body.title,
        description:req.body.description
    });
    try{
        const savedPost = await post.save();
        res.send(savedPost);
    }
    catch(err){
        res.status(400).send(err);
    }
})
module.exports = router;
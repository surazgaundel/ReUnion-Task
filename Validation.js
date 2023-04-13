const Joi=require('joi');

//register validation
 const registerValidator=(data)=>{
    const schema=Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(6).required()
    })

    return schema.validate(data)
}

 const loginValidator=(data)=>{
    const schema=Joi.object({
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(6).required()
    })

    return schema.validate(data)
}

const postValidator=(data)=>{
    const schema=Joi.object({
        title:Joi.string().min(6).max(100).required(),
        description:Joi.string().min(50).required()
    })
    return schema.validate(data)
}
module.exports={registerValidator,loginValidator,postValidator};
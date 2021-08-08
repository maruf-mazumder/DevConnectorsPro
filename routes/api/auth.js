const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt  =  require('jsonwebtoken');
const config = require('config');
const {check , validationResult} = require('express-validator/check');

//@route  GET /api/auth
//@desc    Test route
//@access public
router.get('/', auth ,async (req,res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');  
        console.log(req.user.id);
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route  POST /api/users
//@desc    Authenticate User and get token
//@access public
router.post('/',[
    check('email','Please include a valid E-mail').isEmail(),
    check('password','Password is required').exists()
    ],
    async (req,res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
        }
    console.log(req.body);

    const {email,password} = req.body;

    try{

    //See if the user exists
    let user =await User.findOne({email});
    if(!user) return res.status(400).json({errors:[{msg : 'Invalid credentials '}]});

        
    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch) return res.status(400).json({errors:[{msg : 'Invalid credentials '}]}); 

    //Return jwt
    const payload = {
        user:{
            id:user.id
        }
    }
    jwt.sign(payload,
         config.get('jwtSecret'),
         {expiresIn:360000},
         function(err, token) {
            console.log(token);
            if(err){throw err}
             res.json({token});
             return
          })
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
}
);



module.exports = router;
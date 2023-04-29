const express=require('express');
const User=require("../Controllers/UserController");
const jwt = require('jsonwebtoken');
const router=express.Router();




router.post('/register',async(req,res) => {
    
    let resultData=await User.UserController.registerUser(req);
    res.json(resultData);

});

router.post('/login',async(req,res) => {
    
    let resultData=await User.UserController.login(req);
    res.json(resultData);

});

router.get('/protect', CheckAuthToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.email}!` });
  });
function CheckAuthToken(req, res, next) {
    // Get the authorization header
    const authHeader = req.headers['authorization'];
    // Extract the JWT token from the authorization header
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      // Return an error response if the JWT token is missing
      return res.sendStatus(401);
    }
    // Verify the JWT token using the secret key
    jwt.verify(token,process.env.JWT_KEY, (err, user) => {
      if (err) {
        // Return an error response if the JWT token is invalid
        return res.sendStatus(403);
        //res.status(403).json({ message: 'Authentication is invalid error' });
      }
      // Store the user object in the request object
      req.user = user;
      // Call the next middleware function
      next();
    });
  }


module.exports=router;
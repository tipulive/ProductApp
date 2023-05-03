const express=require('express');
const User=require("../Controllers/UserController");
const Product=require("../Controllers/ProductController");
const jwt = require('jsonwebtoken');
const router=express.Router();


const tokenSuspendList = new Set();

router.post('/register',async(req,res) => {
    
    let resultData=await User.UserController.registerUser(req);
    res.json(resultData);

});

router.post('/login',async(req,res) => {
    
    let resultData=await User.UserController.login(req);
    res.json(resultData);

});
router.get('/logout', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
      return res.status(401).json({ 
          status:false,
          message: 'Unauthorized' });
    }
  
    tokenSuspendList.add(token);
    res.json({
        status:true,
         message: 'Logged out successfully' 
        });
  });
//Crud Of Products List

router.post('/addProduct',CheckAuthToken,async(req,res) => {
    req.body.uid = 'John';
   

    products=req.body;

    res.json((await Product.ProductController.addProduct(products)));

});
router.get('/getProducts',CheckAuthToken,async(req,res) => {
    
    
    res.json((await Product.ProductController.getProducts()));

});

router.get('/getProductById/:id',CheckAuthToken,async(req,res) => {
    
    
    res.json((await Product.ProductController.getProductById(req)));

});
router.get('/getProductByName/:name',CheckAuthToken,async(req,res) => {
    
    
  res.json((await Product.ProductController.getProductByName(req)));

});

router.put('/updateProduct/:id',CheckAuthToken,async(req,res) => {
 
    res.json((await Product.ProductController.updateProduct(req)));

});
router.delete('/deleteProduct/:id',CheckAuthToken,async(req,res) => {
    
    
    res.json((await Product.ProductController.deleteProduct(req)));

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
     return res.status(401).json({ 
          status:false,
          message: 'Unauthorized' 
    });
    }
    if (tokenSuspendList.has(token)) {
       return res.status(401).json({ message: 'Unauthorized' });
      }
    // Verify the JWT token using the secret key
    jwt.verify(token,process.env.JWT_KEY, (err, user) => {
      if (err) {
        // Return an error response if the JWT token is invalid
        
       return res.status(403).json({ 
            status:false,
            message: 'Authentication is invalid' });
      }
      // Store the user object in the request object
      req.user = user;
      // Call the next middleware function
      next();
    });
  }


module.exports=router;
const db_connect=require('../Config/db_config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const connection =db_connect.database_config;



exports.UserController = {

  registerUser:async(req)=>{
   
    const { name,email, password } = req.body;

    return new Promise(function(resolve, reject) {
      var returnValue = "";
      try {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], async (error, results) => {
          if (error) {
         

            returnValue = {
                  
              status:false,
              message:"Server error"
              };
              resolve(returnValue);
          }
    
          if (results.length > 0) {
            
            returnValue = {
                  
              status:false,
              message:"Email already exists"
              };
              resolve(returnValue);
          }
          else{
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = 'INSERT INTO users (name,email, password) VALUES (?,?,?)';
            connection.query(insertQuery, [name,email,hashedPassword], (error, results) => {
              if (error) {
                
                returnValue= {
                    
                  status:false,
                  message:"Server error"
                  };
              }
              if(results.affectedRows> 0)
              {
                returnValue = {
                    
                  status:true,
                  message:"User created"
                  };
              }
             
      
              resolve(returnValue);
              
                
            });
          }
    
        
        
        });
      } catch (error) {
        
        returnValue = {
                  
          status:true,
          message:"Server error"
          };
          resolve(returnValue);
      }
     
  });
  
    
  },
 
  login:async(req)=>{


    const { email, password } = req.body;

    // TODO: Validate the user's credentials
    

    return new Promise(function(resolve, reject) {
      var returnValue = "";
  
    /*const token = jwt.sign({ username }, 'testsecret');
  
    res.json({ token });*/


    
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
      if (error) {
       
        returnValue = {
                  
          status:false,
          message:"Server error"
          };

      }

      if (results.length === 0) {
      
        returnValue = {
                  
          status:false,
          message:"Invalid email or password"
          };
      }

      const user = results[0];
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        returnValue = {
                  
          status:false,
          message:"Invalid email or password"
          };
      }

      //const token = jwt.sign({ email },process.env.JWT_KEY, { expiresIn: '1h' }); //because it is simple test no need for expiration
      const token = jwt.sign({ email },process.env.JWT_KEY);
     // res.status(200).json({ token });

      returnValue = {
                  
        status:true,
        token:token
        };
     
        resolve(returnValue);
    });
  } catch (error) {
    
    returnValue = {
                  
      status:false,
      message:"Server error"
      };
      resolve(returnValue);
  }

});

  }
}
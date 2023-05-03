const db_connect=require('../Config/db_config');
const connection =db_connect.database_config;



exports.ProductController = {

  addProduct:async(products)=>{
   
    return new Promise(function(resolve, reject) {
        var returnValue = "";
        connection.query('INSERT INTO products SET ?', products, function(error, result) {
            if (error) {
                returnValue = {
                  
                status:false,
                message:error.message
                };
            } else {
                if(result.affectedRows> 0) {
                    returnValue =(
                        {
                            "status":true,
                            "message":"Record created"            
                        }
                    );
                }else{
                    returnValue =(
                        {
                            "status":false,
                            "message":`Something Wrong please contact System Admin`
                        }
                    );
                }
               
             
            }
            resolve(returnValue)
        });
    });
    
  },
  getProducts:async(req)=>{//get All Products
   
    return new Promise(function(resolve, reject) {
        var returnValue = "";
        const uidCreator=req.user.email;
        connection.query('SELECT * FROM products where uidCreator=? order by id desc',uidCreator, (err, results) => {
        //connection.query('SELECT * FROM products order by id desc', (err, results) => {
            if (err) throw err;
           
            if(results.length > 0) {
                returnValue =(
                    {
                        "status":true,
                        "user":req.user.email,
                        "resultData":results,
                        
                        "message":"Records retrieved"
                    }
                );
            }else{
                returnValue =(
                    {
                        "status":false,
                        "message":"no Data found"
                    }
                );
            }
            resolve(returnValue)
          });
    });
    
  },
  getProductById:async(req)=>{//get Product By Id
    const id = req.params.id;
    const uidCreator=req.user.email;
    return new Promise(function(resolve, reject) {
        var returnValue = "";
        connection.query('SELECT * FROM products WHERE id = ? and uidCreator=?', [id,uidCreator], (err, result) => {
            if (err) throw err;
          
            if(result.length > 0) {
                returnValue=(
                    {
                        "status":true,
                        "resultData":result,
                        "message":"Records retrieved"
                    }
                );
            }else{
                returnValue=(
                    {
                        "status":false,
                        "message":"no Data found"
                    }
                );
            }
            resolve(returnValue)
           
          });
    });
    
  },
  getProductByName:async(req)=>{//get Product By Id
    const name = req.params.name;
    const uidCreator=req.user.email;
    return new Promise(function(resolve, reject) {
        var returnValue = "";
        const nameParam = [`%${name}%`];
        connection.query('SELECT * FROM products WHERE uidCreator=? and name LIKE ?',[uidCreator,nameParam], (err, result) => {
            if (err) throw err;
          
            if(result.length > 0) {
                returnValue=(
                    {
                        "status":true,
                        "resultData":result,
                        "message":"Records retrieved"
                    }
                );
            }else{
                returnValue=(
                    {
                        "status":false,
                        "message":"no Data found"
                    }
                );
            }
            resolve(returnValue)
           
          });
    });
    
  },

  updateProduct:async(req)=>{//update Product By Id

    const id = req.params.id;
    const record = req.body;
    const uidCreator=req.user.email;
   
    return new Promise(function(resolve, reject) {
        var returnValue = "";
        connection.query('UPDATE products SET ? WHERE id = ? and uidCreator=? limit 1', [record, id,uidCreator], (err, result) => {
            if (err) throw err;
            
        
            if(result.affectedRows> 0) {
                returnValue=(
                    {
                        "status":true,
                        "message":result.changedRows>0?"Record updated":"Record affected Rows but not changed"
                    }
                );
            }else{
                returnValue=(
                    {
                        "status":false,
                        "message":`this Id '${id}' not found`
                    }
                );
            }
            resolve(returnValue)
          });
    });
    
  },

  deleteProduct:async(req)=>{//delete Product By Id
    const id = req.params.id;
    const uidCreator=req.user.email;
    return new Promise(function(resolve, reject) {
        var returnValue = "";
        connection.query('DELETE FROM products WHERE id = ? and uidCreator=?', [id,uidCreator], (err, result) => {
            if (err) throw err;
           
            
            if(result.affectedRows> 0) {
                returnValue=(
                    {
                        "status":true,
                        "message":"Record deleted"            }
                );
            }else{
                returnValue=(
                    {
                        "status":false,
                        "message":`this Id '${id}' not found`
                    }
                );
            }
            resolve(returnValue)
          });
    });
    
  },
 
  
}
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
  getProducts:async()=>{//get All Products
   
    return new Promise(function(resolve, reject) {
        var returnValue = "";
        connection.query('SELECT * FROM products order by id desc', (err, results) => {
            if (err) throw err;
           
            if(results.length > 0) {
                returnValue =(
                    {
                        "status":true,
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
  getProduct:async(req)=>{//get Product By Id
    const id = req.params.id;
    return new Promise(function(resolve, reject) {
        var returnValue = "";
        connection.query('SELECT * FROM products WHERE id = ?', id, (err, result) => {
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
   
    return new Promise(function(resolve, reject) {
        var returnValue = "";
        connection.query('UPDATE products SET ? WHERE id = ?', [record, id], (err, result) => {
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
    return new Promise(function(resolve, reject) {
        var returnValue = "";
        connection.query('DELETE FROM products WHERE id = ?', id, (err, result) => {
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
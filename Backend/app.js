require('dotenv').config();
const express=require('express');
const apiRoute=require('./routes');


const bodyParser = require('body-parser');
const cors = require('cors');


const app=express();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1",apiRoute);//this is to specify API endpoint and version
app.use(express.json);


app.use(express.json({}));
 serverport=process.env.PORT || '3000';
app.listen(serverport,()=>{
    console.log(`Server is running on port ${serverport}`);
});
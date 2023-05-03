require('dotenv').config();
const express=require('express');
const apiRoute=require('./routes');


const bodyParser = require('body-parser');
const cors = require('cors');


const app=express();

app.use(express.static('../FrontEnd/dist/front-end'));

app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1",apiRoute);//this is to specify API endpoint and version
app.use(express.json);

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '../FrontEnd/dist/front-end' });
  });



 serverport=process.env.PORT || '3000';
app.listen(serverport,()=>{
    console.log(`Server is running on port ${serverport}`);
});
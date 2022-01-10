import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from 'cors';

const app = express()
const port = process.env.PORT || 8081
const accessCode = process.env.CLASTER_ACCESS_PIN;
const adminName = process.env.ADMIN_NAME;
const connection_url = `mongodb+srv://matt-admin:U88tWXTqbrqvzQeC@cluster0.14vum.mongodb.net/tinderdb?retryWrites=true&w=majority`


//app config


//middlewares
app.use(express.json())
app.use(Cors())

//db config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});




//api endpoint
app.get('/',(req,res)=> res.status(200).send('hello from server ---'))

app.post('/tinder/cards', (req, res)=>{
    const dbCard = req.body;
    
    Cards.create(dbCard, (err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards', (req, res)=>{

    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    });
});

// listener

app.listen(port, ()=> console.log(`listening on local host ${port}`));


const express=require('express')
const app=express()
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const Movies=require('./models/movies')
const {MONGOURI}=require('./config/keys')
const PORT=process.env.PORT || 5000
var movie = require('./routes/movies');


//create server mongoose
mongoose.connect(MONGOURI,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true}, (err) => {
    if (err) throw err
    console.log('data base connected...')
})


//middlwares
app.use(bodyParser.json())
// routes
app.use(('/api'),movie)





if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

//create server 
app.listen(PORT,()=>{
    
    console.log(`server runnnig on port ${PORT}`)
})

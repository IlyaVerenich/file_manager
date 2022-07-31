const express = require('express');
const corsMiddleware = require('./middleware/cors.middleware');
const mongoose = require('mongoose');
const router = require('./routes/main')
const config = require("./config/default.json");
const PORT = config.serverPort;

const app = express()

app.use(express.json())
app.use(corsMiddleware);
app.use('/api',router);

const start = async () => {
    try {
        await mongoose.connect(config.dbUrl, {
            useNewUrlParser: true
        },(err)=>{
            if (err) {
                console.log(err);
            }
            console.log('Connected to MongoDB');
        });
        app.listen(PORT,()=>{
    
        console.log(`Start server at port:${PORT}`)
    })
    } catch (error) {
        console.log(error);
    }
}

start()
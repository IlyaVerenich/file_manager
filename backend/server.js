const express = require('express');
const corsMiddleware = require('./middleware/cors.middleware');
const router = require('./routes/main');
const config = require("./config/default.json");
const PORT = config.serverPort;

const app = express()

app.use(express.json())
app.use(corsMiddleware);
app.use('/api',router);

app.listen(PORT,()=>{console.log(`Start server at port:${PORT}`)})
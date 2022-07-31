const {model, Schema} = require('mongoose')


const Folder = new Schema({
    name: {type: String, required: true},
    path: {type: String, default: ''},
    date: {type: Date, default: Date.now()},
})

module.exports = model('Folder', Folder)
const mongoose = require('mongoose')

const database = {}

database.CodeSchema = new mongoose.Schema({
    title:String,
    code:String,
    lectrue:String,
    week:Number,
    No:Number
})

database.CodeModel = new mongoose.model('Code',database.CodeSchema)

module.exports = database
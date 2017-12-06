const mongoose=require('mongoose')

let CardSchema= new mongoose.Schema({
    count:Number,
})

module.exports=mongoose.model('Card',CardSchema)
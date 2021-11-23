const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ElephantSchema = new mongoose.Schema({
    name: {type: String, required:true},
    age: {type:Number, required:true},
    type:{type:String, required:true},
   })

ElephantSchema.plugin(AutoIncrement, {inc_field: 'id'});

const Elephant = mongoose.model('Elephant', ElephantSchema);

const elephantModel={
    create: function(newElephant){
        return Elephant.create(newElephant)
    },
    findAll:function(){
        return Elephant.find()
    },

    findById:function(Id){

        return Elephant.findOne({id:Id})
    },

    update: function(Id,newElephant){
        return Elephant.updateOne({id:Id},newElephant)
    },

    delete: function(Id){
        return Elephant.deleteOne({id:Id})
    }

}

module.exports = {elephantModel}
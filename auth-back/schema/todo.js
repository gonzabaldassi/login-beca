const Mongoose = require("mongoose");

const TodoSchema = new Mongoose.Schema({
    id: {type: Object},
    iduser: {type:String, required:true},
    title: {type:String, required:true},
    completed: {type:String, required:true},
});

module.exports = Mongoose.model("todo", TodoSchema);
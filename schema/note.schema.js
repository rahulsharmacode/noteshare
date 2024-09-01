const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true,
    },
    description : {
        type : String,
        required : true,
        trim : true,
    },
    aurthor : {
        type : String,
        required : true,
        trim : true,
    },
    content_id : {
        type : String,
        required : false,
        trim : true,
    },
    user_id : {
        required : false,
        // type : mongoose.Schema.Types.ObjectId ,ref: "users" ,
        type : String,

    },
    slug : String
}, {
    timestamps : true
});

const NoteModel = mongoose.model("notes" , noteSchema);
module.exports = {NoteModel}; 
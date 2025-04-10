const mongoose = require('mongoose')

const chanterSchema = new mongoose.Schema(
    {
        reference: {
            type: String,
            required: true,
        },
        details:{
            type:String,
            required:false
        },
        addrese:{
            type:String,
            required:true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        }
    },
    { timestamps: true }
);

const Chanter = mongoose.model("Chanter", chanterSchema);
module.exports = {Chanter}
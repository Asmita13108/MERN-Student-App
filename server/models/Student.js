const mongoose = require("mongoose");


const StudentSchema = new mongoose.Schema(

{

name:{

type:String,
required:true

},


email:{

type:String,
required:true

},


age:{

type:Number,
required:true

},


phone:{

type:String,
default:""

},


gender:{

type:String,
default:""

},


subjects:{

type:Array,
default:[]

},


languages:{

type:Array,
default:[]

},


nationality:{

type:String,
default:""

},


dob:{

type:String,
default:""

},


course:{

type:String,
default:""

},


address:{

type:String,
default:""

},


image:{

type:String,
default:""

},
video: {
    type: String,
    default: ""
},



// Toggle Status

status:{

type:Boolean,

default:true

}


},


{

timestamps:true

}

);



module.exports = mongoose.model(
"Student",
StudentSchema
);
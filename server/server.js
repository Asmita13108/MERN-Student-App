const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
require("dotenv").config();

const Student = require("./models/Student");


const app = express();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

let otpStore = {};
// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));


// ================= UPLOAD FOLDER =================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname,"uploads")
    )
);


// Create uploads folder if not exists

if(!fs.existsSync("uploads")){

    fs.mkdirSync("uploads");

}



// ================= DATABASE =================


mongoose.connect(process.env.MONGO_URI)

.then(()=>{

    console.log("MongoDB Connected");

})

.catch(err=>{

    console.log(err);

});




// ================= MULTER =================


const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/");

    },


    filename:(req,file,cb)=>{


        cb(
            null,
            Date.now()+"-"+file.originalname
        );


    }


});



const upload = multer({

    storage:storage,

    limits:{
        fileSize:100 * 1024 * 1024
    }

});




// ================= TEST =================


app.get("/",(req,res)=>{

    res.send("Server Running");

});





// ================= CREATE =================


app.post(

"/students",

upload.fields([

    {
        name:"image",
        maxCount:1
    },

    {
        name:"video",
        maxCount:1
    }

]),


async(req,res)=>{


try{


const student = await Student.create({


name:req.body.name,

email:req.body.email,

age:Number(req.body.age),

phone:req.body.phone,


gender:req.body.gender,



subjects:req.body.subjects

? JSON.parse(req.body.subjects)

: [],



languages:req.body.languages

? JSON.parse(req.body.languages)

: [],



nationality:req.body.nationality || "",


dob:req.body.dob,


course:req.body.course,


address:req.body.address,


status:req.body.status==="false"
?false
:true,



image:req.files?.image

?"/uploads/"+req.files.image[0].filename

:"",



video:req.files?.video

?"/uploads/"+req.files.video[0].filename

:""



});



res.status(201).json(student);



}

catch(error){


res.status(500).json({

message:error.message

});


}



});







// ================= GET =================



app.get(

"/students",

async(req,res)=>{


try{


const students = await Student.find()
.sort({
createdAt:-1
});


res.json(students);


}

catch(error){


res.status(500).json({

message:error.message

});


}


});







// ================= UPDATE =================



app.put(

"/students/:id",


upload.fields([

{
name:"image",
maxCount:1
},

{
name:"video",
maxCount:1
}

]),



async(req,res)=>{


try{


const oldStudent = await Student.findById(
req.params.id
);



if(!oldStudent){

return res.status(404).json({

message:"Student not found"

});

}





const updateData={


name:req.body.name,

email:req.body.email,

age:Number(req.body.age),

phone:req.body.phone,


gender:req.body.gender,


subjects:req.body.subjects

?JSON.parse(req.body.subjects)

:[],


languages:req.body.languages

?JSON.parse(req.body.languages)

:[],


nationality:req.body.nationality,


dob:req.body.dob,


course:req.body.course,


address:req.body.address,


status:req.body.status==="false"
?false
:true


};





// IMAGE UPDATE


if(req.files?.image){


updateData.image =
"/uploads/"+req.files.image[0].filename;



if(oldStudent.image){


const oldImage = path.join(

__dirname,

oldStudent.image

);



if(fs.existsSync(oldImage)){


fs.unlinkSync(oldImage);

}


}



}







// VIDEO UPDATE


if(req.files?.video){


updateData.video =
"/uploads/"+req.files.video[0].filename;



if(oldStudent.video){


const oldVideo = path.join(

__dirname,

oldStudent.video

);



if(fs.existsSync(oldVideo)){


fs.unlinkSync(oldVideo);

}


}


}





const student = await Student.findByIdAndUpdate(

req.params.id,

updateData,

{
new:true
}

);



res.json(student);



}


catch(error){


res.status(500).json({

message:error.message

});


}


});









// ================= DELETE =================



app.delete(

"/students/:id",

async(req,res)=>{


try{


const student = await Student.findById(
req.params.id
);



if(!student){

return res.status(404).json({

message:"Student not found"

});

}




// delete image

if(student.image){


const imagePath = path.join(

__dirname,

student.image

);


if(fs.existsSync(imagePath)){

fs.unlinkSync(imagePath);

}

}




// delete video

if(student.video){


const videoPath = path.join(

__dirname,

student.video

);


if(fs.existsSync(videoPath)){

fs.unlinkSync(videoPath);

}

}




await Student.findByIdAndDelete(
req.params.id
);



res.json({

message:"Deleted Successfully"

});


}


catch(error){


res.status(500).json({

message:error.message

});


}


});









// ================= STATUS TOGGLE =================



app.put(

"/students/status/:id",

async(req,res)=>{


try{


const student = await Student.findById(
req.params.id
);



student.status=!student.status;


await student.save();



res.json(student);



}

catch(error){


res.status(500).json({

message:error.message

});


}


});

// ================= EXPORT EXCEL =================

app.get("/students/export/excel", async (req, res) => {
    try {

        const students = await Student.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Students");

        worksheet.columns = [
            { header: "Name", key: "name", width: 20 },
            { header: "Email", key: "email", width: 30 },
            { header: "Age", key: "age", width: 10 },
            { header: "Phone", key: "phone", width: 20 },
            { header: "Gender", key: "gender", width: 15 },
            { header: "Course", key: "course", width: 20 },
            { header: "Nationality", key: "nationality", width: 20 },
            { header: "DOB", key: "dob", width: 15 },
            { header: "Status", key: "status", width: 10 }
        ];

        students.forEach(student => {
            worksheet.addRow({
                name: student.name,
                email: student.email,
                age: student.age,
                phone: student.phone,
                gender: student.gender,
                course: student.course,
                nationality: student.nationality,
                dob: student.dob,
                status: student.status ? "Active" : "Inactive"
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=students.xlsx"
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});



// ================= EXPORT PDF =================

app.get("/students/export/pdf", async (req, res) => {

    try {

        const students = await Student.find();

        const doc = new PDFDocument({
            margin: 30
        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=students.pdf"
        );

        doc.pipe(res);

        doc.fontSize(20).text("Student Management Report", {
            align: "center"
        });

        doc.moveDown();

        students.forEach((student, index) => {

            doc
                .fontSize(12)
                .text(`${index + 1}. Name : ${student.name}`);

            doc.text(`Email : ${student.email}`);
            doc.text(`Age : ${student.age}`);
            doc.text(`Phone : ${student.phone}`);
            doc.text(`Gender : ${student.gender}`);
            doc.text(`Course : ${student.course}`);
            doc.text(`Nationality : ${student.nationality}`);
            doc.text(`DOB : ${student.dob}`);
            doc.text(`Status : ${student.status ? "Active" : "Inactive"}`);

            doc.moveDown();

        });

        doc.end();

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// ================= SEND OTP =================

app.post("/send-otp", async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = otp;

    try {

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Email Verification OTP",

            html: `
                <h2>Student Management System</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP is valid for 5 minutes.</p>
            `

        });

        res.json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});



// ================= VERIFY OTP =================

app.post("/verify-otp", (req, res) => {

    const { email, otp } = req.body;

    if (otpStore[email] == otp) {

        delete otpStore[email];

        return res.json({

            success: true,

            message: "OTP Verified Successfully"

        });

    }

    res.status(400).json({

        success: false,

        message: "Invalid OTP"

    });

});




// ================= SERVER =================


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{


console.log(
`Server running on ${PORT}`
);


});

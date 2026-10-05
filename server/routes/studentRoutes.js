const express = require("express");

const router = express.Router();

const Student = require("../models/Student");


// ===============================
// POST API - Save Student Data
// ===============================

router.post("/", async (req, res) => {

    try {

        const student = new Student(req.body);

        await student.save();


        res.status(201).json({

            message: "Student Saved Successfully",

            student: student

        });


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});




// ===============================
// GET API - Get All Students
// ===============================

router.get("/", async (req, res) => {

    try {

        const students = await Student.find();


        res.status(200).json(students);


    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});



module.exports = router;

import { useEffect, useState } from "react";
import axios from "axios";

import {
  Routes,
  Route
} from "react-router-dom";

import "./App.css";

import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import StudentDetails from "./pages/StudentDetails";


function App(){

const API="http://localhost:5000/students";


// Students

const [students,setStudents]=useState([]);



// Show Form

const [showForm,setShowForm]=useState(false);



// Form Data

const [name,setName]=useState("");

const [email,setEmail]=useState("");
const [otp, setOtp] = useState("");
const [otpVerified, setOtpVerified] = useState(false);

const [age,setAge]=useState("");

const [phone,setPhone]=useState("");

const [gender,setGender]=useState("");

const [subjects,setSubjects]=useState([]);

const [languages,setLanguages]=useState([]);

const [nationality,setNationality]=useState("");

const [dob,setDob]=useState("");

const [course,setCourse]=useState("");

const [address,setAddress]=useState("");



const [image,setImage]=useState(null);

const [imagePreview,setImagePreview]=useState(null);


const [video,setVideo]=useState(null);

const [videoPreview,setVideoPreview]=useState(null);




// Status

const [status,setStatus]=useState(true);



// Edit

const [editId,setEditId]=useState(null);



// Search

const [search,setSearch]=useState("");





// GET STUDENTS

const getStudents=async()=>{

try{

const res=await axios.get(API);

setStudents(res.data);

}

catch(error){

console.log(error);

}

};




useEffect(()=>{

getStudents();

},[]);


const sendOtp = async () => {
  try {
    await axios.post("http://localhost:5000/send-otp", {
      email: email,
    });

    alert("OTP Sent Successfully");
  } catch (error) {
    alert(error.response?.data?.message || "Failed to send OTP");
  }
};
const verifyOtp = async () => {
  try {
    await axios.post("http://localhost:5000/verify-otp", {
      email: email,
      otp: otp,
    });

    setOtpVerified(true);
    alert("OTP Verified Successfully");
  } catch (error) {
    setOtpVerified(false);
    alert("Invalid OTP");
  }
};




// ADD / UPDATE STUDENT

const handleSubmit=async(e)=>{


e.preventDefault();

if (!otpVerified) {
    alert("Please verify OTP first");
    return;
}

if(name.trim().length < 3){

alert("Name minimum 3 characters hona chahiye");

return;

}



if(!email.includes("@")){

alert("Valid email enter karo");

return;

}



if(age < 5 || age > 100){

alert("Age 5 se 100 ke beech honi chahiye");

return;

}



if(subjects.length===0){

alert("At least one subject select karo");

return;

}



try{


const formData=new FormData();



formData.append("name",name);

formData.append("email",email);

formData.append("age",age);

formData.append("phone",phone);

formData.append("gender",gender);



formData.append(
"subjects",
JSON.stringify(subjects)
);



formData.append(
"languages",
JSON.stringify(languages)
);



formData.append(
"nationality",
nationality
);



formData.append(
"dob",
dob
);



formData.append(
"course",
course
);



formData.append(
"address",
address
);



formData.append(
"status",
status
);




if(image){

formData.append(
"image",
image
);

}



if(video){

formData.append(
"video",
video
);

}






if(editId){


await axios.put(

`${API}/${editId}`,

formData

);


alert("Student Updated");


}
else{


await axios.post(

API,

formData

);


alert("Student Added");


}




clearForm();

setShowForm(false);

getStudents();



}

catch(error){

console.log(error);

}


};








// CLEAR FORM


const clearForm=()=>{


setName("");

setEmail("");

setAge("");

setPhone("");

setGender("");

setSubjects([]);

setLanguages([]);

setNationality("");

setDob("");

setCourse("");

setAddress("");

setImage(null);

setImagePreview(null);

setVideo(null);

setVideoPreview(null);

setStatus(true);

setEditId(null);


};

const handleCancel = () => {
  clearForm();
  setShowForm(false);
};





// EDIT STUDENT


const editStudent=(student)=>{


setShowForm(true);



setName(student.name);

setEmail(student.email);

setAge(student.age);

setPhone(student.phone || "");

setGender(student.gender || "");


setSubjects(student.subjects || []);


setLanguages(student.languages || []);


setNationality(student.nationality || "");


setDob(student.dob || "");


setCourse(student.course || "");


setAddress(student.address || "");



setStatus(
student.status ?? true
);



// old file clear

setImage(null);

setVideo(null);




// image preview


if(student.image){

setImagePreview(

`http://localhost:5000${student.image}`

);

}

else{

setImagePreview(null);

}





// video preview


if(student.video){

setVideoPreview(

`http://localhost:5000${student.video}`

);

}

else{

setVideoPreview(null);

}



setEditId(student._id);



window.scrollTo({

top:0,

behavior:"smooth"

});


};
// DELETE STUDENT

const deleteStudent=async(id)=>{


const confirmDelete = window.confirm(
"Delete Student?"
);


if(!confirmDelete)
return;



try{


await axios.delete(

`${API}/${id}`

);


alert("Deleted");


getStudents();


}

catch(error){

console.log(error);

}


};






// STATUS TOGGLE

const toggleStatus=async(id)=>{


try{


await axios.put(

`${API}/status/${id}`

);



getStudents();


}

catch(error){

console.log(error);

}


};






return(

<Routes>



<Route

path="/"

element={


<div className="container">



<h1>
Student Management System
</h1>





{/* ADD BUTTON */}


<button

className="add-btn"

onClick={()=>setShowForm(true)}

>

Add Student

</button>







{/* EXPORT BUTTONS */}


<div className="export-box">


<button

className="excel-btn"

onClick={()=>{

window.open(

"http://localhost:5000/students/export/excel",

"_blank"

)

}}

>

Export Excel

</button>






<button

className="pdf-btn"

onClick={()=>{

window.open(

"http://localhost:5000/students/export/pdf",

"_blank"

)

}}

>

Export PDF

</button>



</div>









{/* STUDENT FORM */}


{

showForm &&


<StudentForm


name={name}

setName={setName}



email={email}

setEmail={setEmail}
otp={otp}
setOtp={setOtp}
sendOtp={sendOtp}
verifyOtp={verifyOtp}
otpVerified={otpVerified}



age={age}

setAge={setAge}



phone={phone}

setPhone={setPhone}



gender={gender}

setGender={setGender}




subjects={subjects}

setSubjects={setSubjects}




languages={languages}

setLanguages={setLanguages}




nationality={nationality}

setNationality={setNationality}




dob={dob}

setDob={setDob}




course={course}

setCourse={setCourse}




address={address}

setAddress={setAddress}




status={status}

setStatus={setStatus}




image={image}

setImage={setImage}




imagePreview={imagePreview}

setImagePreview={setImagePreview}




video={video}

setVideo={setVideo}



videoPreview={videoPreview}

setVideoPreview={setVideoPreview}




editId={editId}



handleSubmit={handleSubmit}

handleCancel={handleCancel}

/>


}









{/* STUDENT TABLE */}


{!showForm && (
  <StudentTable
    students={students}
    search={search}
    setSearch={setSearch}
    editStudent={editStudent}
    deleteStudent={deleteStudent}
    toggleStatus={toggleStatus}
  />
)}





</div>


}


/>









<Route


path="/student-details"


element={

<StudentDetails/>

}


/>






</Routes>


);


}



export default App;

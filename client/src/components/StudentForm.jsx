import Select from "react-select";


function StudentForm(props){


const subjectOptions=[

{value:"Math",label:"Math"},

{value:"Science",label:"Science"},

{value:"English",label:"English"},

{value:"Computer",label:"Computer"},

{value:"History",label:"History"}

];


return(

<div className="form-card">




<form onSubmit={props.handleSubmit}>


{/* PERSONAL DETAILS */}

<div className="section">

<h3>
Personal Details
</h3>


<div className="form-grid">


<div>

<label>Name</label>

<input

type="text"

placeholder="Student Name"
minLength="3"

required

value={props.name}

onChange={(e)=>props.setName(e.target.value)}

/>

</div>





<div className="form-group">
  <label>Email</label>

  <div className="input-button">
    <input
      type="email"
      placeholder="Email"
      value={props.email}
      onChange={(e) => props.setEmail(e.target.value)}
    />

    <button
      type="button"
      className="send-otp-btn"
      onClick={props.sendOtp}
    >
      Send OTP
    </button>
  </div>
</div>


<div className="form-group">
  <label>OTP</label>

  <div className="input-button">
    <input
      type="text"
      placeholder="Enter OTP"
      value={props.otp}
      onChange={(e) => props.setOtp(e.target.value)}
    />

    <button
      type="button"
      className="verify-btn"
      onClick={props.verifyOtp}
    >
      Verify OTP
    </button>
  </div>
</div>


{props.otpVerified && (
  <p style={{ color: "green", fontWeight: "bold" }}>
    ✅ OTP Verified
  </p>
)}


<div>

<label>Age</label>

<input

type="number"
min="5"

max="100"

required

value={props.age}

onChange={(e)=>props.setAge(e.target.value)}

/>

</div>




<div>

<label>Phone</label>

<input

type="tel"

placeholder="Enter 10 digit phone number"

value={props.phone}

maxLength="10"

onChange={(e)=>{

const value = e.target.value;


if(/^\d*$/.test(value)){

props.setPhone(value);

}

}}

/>

</div>


</div>

</div>






{/* GENDER */}


<div className="section">


<h3>
Gender
</h3>


<div className="radio-group">


<label>

<input

type="radio"

name="gender"

value="Male"

checked={props.gender==="Male"}

onChange={(e)=>props.setGender(e.target.value)}

/>

Male

</label>




<label>

<input

type="radio"

name="gender"

value="Female"

checked={props.gender==="Female"}

onChange={(e)=>props.setGender(e.target.value)}

/>

Female

</label>




<label>

<input

type="radio"

name="gender"

value="Other"

checked={props.gender==="Other"}

onChange={(e)=>props.setGender(e.target.value)}

/>

Other

</label>



</div>

</div>









{/* EDUCATION DETAILS */}


<div className="section">


<h3>
Education Details
</h3>


<div className="form-grid">



<div>

<label>
Subjects
</label>


<Select

isMulti

closeMenuOnSelect={false}

options={subjectOptions}


value={subjectOptions.filter(

(item)=>

props.subjects.includes(item.value)

)}


onChange={(data)=>{


props.setSubjects(

data.map(item=>item.value)

);


}}


/>



</div>




<div>

<label>
Course
</label>


<input

type="text"

placeholder="Course"

value={props.course}

onChange={(e)=>props.setCourse(e.target.value)}

/>


</div>




<div>

<label>
Date Of Birth
</label>


<input
  type="date"
  value={props.dob}
  max={new Date().toISOString().split("T")[0]}
  onChange={(e)=>props.setDob(e.target.value)}
/>

</div>




<div>

<label>
Nationality
</label>


<select

value={props.nationality}

onChange={(e)=>props.setNationality(e.target.value)}

>


<option value="">
Select
</option>

<option>
India
</option>

<option>
USA
</option>

<option>
UK
</option>

<option>
Canada
</option>


</select>


</div>



</div>

</div>









{/* LANGUAGE */}


<div className="section">


<h3>
Languages
</h3>


<div className="radio-group">


{

["English","Hindi","Marathi"].map((lang)=>(


<label key={lang}>


<input

type="checkbox"

checked={props.languages.includes(lang)}

onChange={(e)=>{


if(e.target.checked){


props.setLanguages([

...props.languages,

lang

]);


}

else{


props.setLanguages(

props.languages.filter(

(item)=>item!==lang

)

);


}


}}


/>


{lang}


</label>


))


}



</div>


</div>








{/* ADDRESS */}


<div className="section">


<h3>
Address
</h3>


<textarea

placeholder="Address"

value={props.address}

onChange={(e)=>props.setAddress(e.target.value)}

></textarea>


</div>








{/* IMAGE */}


<div className="section">


<h3>
Profile Image
</h3>


<input

type="file"

accept="image/*"

onChange={(e)=>{


const file=e.target.files[0];


if(file){

props.setImage(file);

props.setImagePreview(

URL.createObjectURL(file)

);

}


}}

/>



{

props.imagePreview &&

<img

src={props.imagePreview}

width="120"

height="120"

/>

}



</div>

{/* STUDENT VIDEO */}

<div className="section">

<h3>
Student Video
</h3>


<input

type="file"

accept="video/*"

onChange={(e)=>{


const file = e.target.files[0];


if(file){


props.setVideo(file);


// NEW VIDEO PREVIEW

props.setVideoPreview(

URL.createObjectURL(file)

);


}


}}

/>



{

props.videoPreview &&


<video

width="300"

controls

key={props.videoPreview}

>

<source

src={props.videoPreview}

type="video/mp4"

/>

</video>


}


</div>




{/* STATUS */}


<div className="section">


<h3>
Status
</h3>


<button

type="button"

className={
props.status
?
"active-status"
:
"inactive-status"
}


onClick={()=>props.setStatus(!props.status)}

>

{

props.status

?

"Active"

:

"Inactive"

}


</button>


</div>








<div className="button-group">

  <button type="submit" className="submit-btn">
    {props.editId ? "Update Student" : "Submit"}
  </button>

  <button
    type="button"
    className="cancel-btn"
    onClick={props.handleCancel}
  >
    Cancel
  </button>

</div>


</form>


</div>

);


}


export default StudentForm;
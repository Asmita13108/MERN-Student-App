function StudentPopup({

selectedStudent,
setSelectedStudent

}){


if(!selectedStudent)
return null;



return(

<div className="popup-overlay">


<div className="popup-box">


<h2>
Student Details
</h2>





{/* PROFILE IMAGE */}

{

selectedStudent.image &&

<div className="popup-image-box">


<img

src={`http://localhost:5000${selectedStudent.image}`}

alt="Student"

className="popup-image"

/>


</div>

}

{/* STUDENT INFORMATION */}


<div className="student-info">


<p>
<b>Name:</b> {selectedStudent.name}
</p>



<p>
<b>Email:</b> {selectedStudent.email}
</p>



<p>
<b>Age:</b> {selectedStudent.age}
</p>



<p>
<b>Phone:</b> {selectedStudent.phone}
</p>



<p>
<b>Gender:</b> {selectedStudent.gender}
</p>



<p>
<b>Subjects:</b> 

{
selectedStudent.subjects?.join(", ")
}

</p>



<p>
<b>Course:</b> {selectedStudent.course}
</p>



<p>
<b>Languages:</b>

{

selectedStudent.languages?.join(", ")

}

</p>



<p>
<b>Nationality:</b> {selectedStudent.nationality}
</p>




<p>
<b>Date Of Birth:</b> {selectedStudent.dob}
</p>





<p>
<b>Status:</b>


<span

className={

selectedStudent.status

?

"active-text"

:

"inactive-text"

}

>

{

selectedStudent.status

?

" Active"

:

" Inactive"

}


</span>


</p>





<p>
<b>Address:</b>

{selectedStudent.address}

</p>



</div>

{/* VIDEO */}

{

selectedStudent.video &&

<div className="popup-video-box">


<h3>
Student Video
</h3>


<video

className="popup-video"

controls

>


<source

src={`http://localhost:5000${selectedStudent.video}`}

type="video/mp4"

/>


Your browser does not support video.


</video>



</div>

}










{/* CLOSE BUTTON */}


<button

className="close-btn"

onClick={()=>setSelectedStudent(null)}

>

Close

</button>




</div>


</div>


);


}


export default StudentPopup;

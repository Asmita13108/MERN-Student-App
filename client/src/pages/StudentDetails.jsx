import {
  useLocation,
  useNavigate
} from "react-router-dom";

import { useState } from "react";


function StudentDetails(){


const location = useLocation();

const navigate = useNavigate();


const [showVideo,setShowVideo] = useState(false);



const student = location.state;



if(!student){

return(

<div className="container">

<h2>
No Student Found
</h2>


<button

onClick={()=>navigate("/")}

>

Back

</button>


</div>

);

}





return(

<div className="container">


<div className="student-details-card">


<h1>
Student Details
</h1>






{/* IMAGE */}

<div className="details-section">


<h3>
Profile Image
</h3>



{

student.image ?

<img

src={`http://localhost:5000${student.image}`}

alt="Student"

width="150"

height="150"

style={{

borderRadius:"50%",

objectFit:"cover"

}}

/>

:

<p>
No Image Available
</p>

}


</div>


















{/* STUDENT INFORMATION */}



<div className="student-info">


<p>
<b>Name:</b> {student.name}
</p>



<p>
<b>Email:</b> {student.email}
</p>



<p>
<b>Age:</b> {student.age}
</p>



<p>
<b>Phone:</b> {student.phone}
</p>



<p>
<b>Gender:</b> {student.gender}
</p>




<p>
<b>Subjects:</b>

{

student.subjects?.join(", ")

}

</p>




<p>
<b>Course:</b>

{student.course}

</p>




<p>
<b>Languages:</b>

{

student.languages?.join(", ")

}

</p>




<p>
<b>Nationality:</b>

{student.nationality}

</p>




<p>
<b>Date Of Birth:</b>

{student.dob}

</p>




<p>

<b>Status:</b>


<span

className={

student.status

?

"active-text"

:

"inactive-text"

}

>

{

student.status

?

" Active"

:

" Inactive"

}


</span>


</p>






<p>

<b>Address:</b>

{student.address}


</p>



</div>
{/* VIDEO BUTTON */}



{

student.video &&


<div


className="details-section video-row"


onClick={()=>setShowVideo(true)}


style={{


cursor:"pointer"


}}


>


<h3>

Student Video ▶

</h3>


</div>


}









{/* VIDEO POPUP */}



{

showVideo &&


<div

className="video-overlay"

>


<div

className="video-box"

>



<button

className="close-btn"

onClick={()=>setShowVideo(false)}

>

Close

</button>





<video

width="500"

controls

autoPlay

>


<source

src={`http://localhost:5000${student.video}`}

type="video/mp4"

/>


Your browser does not support video.


</video>




</div>


</div>


}








<button

className="close-btn"

onClick={()=>navigate("/")}

>

Back

</button>




</div>


</div>


);


}


export default StudentDetails;

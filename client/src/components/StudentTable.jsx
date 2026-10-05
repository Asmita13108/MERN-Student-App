import { useNavigate } from "react-router-dom";


function StudentTable({

students,
search,
setSearch,
editStudent,
deleteStudent,
toggleStatus

}){


const navigate = useNavigate();



return(

<div className="table-card">


<h2>
Student List
</h2>




<input

className="search-box"

placeholder="Search Student"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>





<table>


<thead>

<tr>

<th>
Image
</th>


<th>
Name
</th>


<th>
Email
</th>


<th>
Age
</th>


<th>
Gender
</th>


<th>
Status
</th>


<th>
Action
</th>


</tr>

</thead>






<tbody>


{

students

.filter((s)=>

s.name

.toLowerCase()

.includes(

search.toLowerCase()

)

)


.map((s)=>(


<tr

key={s._id}


onClick={()=>{


navigate(

"/student-details",

{

state:s

}

);


}}


style={{

cursor:"pointer"

}}


>




<td>


<img

src={

s.image

?

"http://localhost:5000"+s.image

:

"/default-profile.png"

}


width="60"

height="60"


alt="student"


style={{

borderRadius:"50%",

objectFit:"cover"

}}


/>


</td>







<td>

{s.name}

</td>







<td>

{s.email}

</td>







<td>

{s.age}

</td>







<td>

{s.gender}

</td>







<td>


<button


onClick={(e)=>{


e.stopPropagation();


toggleStatus(s._id);


}}



style={{


background:(s.status ?? true)

?

"green"

:

"red",


color:"white",


border:"none",


padding:"6px 18px",


borderRadius:"20px",


cursor:"pointer"


}}


>


{

(s.status ?? true)

?

"Active"

:

"Inactive"

}


</button>


</td>









<td>



<button


className="edit-btn"


onClick={(e)=>{


e.stopPropagation();


editStudent(s);


}}


>


Edit

</button>







<button


className="delete-btn"


onClick={(e)=>{


e.stopPropagation();


deleteStudent(s._id);


}}


>


Delete

</button>



</td>







</tr>


))


}



</tbody>


</table>


</div>


);


}


export default StudentTable;

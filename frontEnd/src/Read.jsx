import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import  axios  from 'axios';
function Read() {
    const {id} = useParams();
    const [student, setStudent]=useState([])
    useEffect(() =>{ 
       axios.get(`http://localhost:8081/read/${id}`)
       .then(res=>{
        console.log(res)
        setStudent(res.data[0]);
       })
       .catch(err=>console.log(err))
    },[id]);
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='bg-white rounded p-5'>
            <div className='p-2'>
                <h2>Student Detail</h2>
                <h2>{student.ID}</h2>
                <h2>{student.Name}</h2>
                <h2>{student.Email}</h2>
            </div>
            <Link to='/' className='btn btn-primary me-2'>Back</Link>
            <Link to={`/edit/${student.ID}`} className='btn btn-info'>Edit</Link>
        </div>
    </div>
  )
}

export default Read
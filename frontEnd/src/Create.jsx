import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Create() {
    const [values,setValues]=useState({
        name:'',
        email:''
    })
    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8081/student',values)
        .then(res=>{
            console.log(res)
            navigate('/')
        })
        .catch(err=>console.log(err))
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-100 bg-white rounded p-5'>
            <form onSubmit={handleSubmit}>
                <h2>Add Student</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control'
                    onChange={e=>setValues({...values,name:e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>Email</label>
                    <input type="text" placeholder='Enter Email' className='form-control'
                  onChange={e=>setValues({...values,email:e.target.value})}/>

                </div>
                <button className='btn btn-success'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create
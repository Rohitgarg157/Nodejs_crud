// eslint-disable-next-line no-unused-vars
import  { React,useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
   const [data, setData] = useState([]);
   const [error, setError] = useState(null);

   useEffect(() => {
      axios.get('http://localhost:8081/')
         .then(res => {
            console.log('Response Data:', res.data); // For debugging
            setData(res.data);
         })
         .catch(err => {
            console.log(err);
            setError('Failed to fetch data');
         });
   }, []);

   const handleDelete=(id) =>{
      axios.delete('http://localhost:8081/delete/'+id)
      .then(() => {
        location.reload();
      })
      .catch(err => {
         console.log(err)})
   }
   
   return (
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
         <div className="w bg-white rounded p-4 shadow">
            <h2 className="mb-4">Student List</h2>
            <div className='d-flex justify-content-end'>
               <Link to="/create" className="btn btn-success">Create +</Link>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table className="table table-striped">
               <thead>
                  <tr>
                     <th scope="col">ID</th>
                     <th scope="col">Name</th>
                     <th scope="col">Email</th>
                     <th scope="col">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {Array.isArray(data) && data.length > 0 ? (
                     data.map((student, index) => (
                        <tr key={index}>
                           <td>{student.ID}</td>
                           <td>{student.Name}</td>
                           <td>{student.Email}</td>
                           <td>
                              <Link to={`/read/${student.ID}`} className="btn btn-sm btn-info me-2">Read</Link>
                              <Link to={`/edit/${student.ID}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                              <button onClick={() =>handleDelete(student.ID)} className="btn btn-sm btn-danger">Delete</button>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="4" className="text-center">No data available</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default Home;

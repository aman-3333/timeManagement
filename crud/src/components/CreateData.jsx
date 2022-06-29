import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import GetData from "./GetData";

import axios from 'axios';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { useHistory} from 'react-router';





const CreateData=()=>{

  let history = useHistory();
    const [data,setData]=useState({
        name:"",
        PreferredWorkingHourPerDay:"",
        code:""
    })

    const[allData,setGetData]=useState([]);

    const inputChange=(event)=>{
                    const name=event.target.name;
                    const value=event.target.value;
                    console.log([name],value)


                    setData({...data,[name]:value})
                    console.log(data)
                                 }

    


    

// !   get Data from APi

    const callGetData = async()=>{
        try{
          const res=await fetch('/timeManagemet/SheetList',{
              method:"GET",
          headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
            } ) 
      
           const data=await res.json();
            console.log(data);
            let all=data.data
            setGetData(all);
            console.log(data);
      }
           catch(err){
          console.log(err)
        
        }
        }
    
        const gotoUser=()=>{
          history.push("/user")
        }

      // TODO  Register the data to api


                        const PostData= async(e)=>{
                            e.preventDefault();
                           console.log("line 74",data)
                           const{name,PreferredWorkingHourPerDay,code}=data;
                           if(!name||!PreferredWorkingHourPerDay||!code){
                             alert("please filled all the field")
                           }
                           const res=await fetch("/timeManagemet/WorkingHour",{
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify({name ,PreferredWorkingHourPerDay,code})})
                            const dataRes=await res.json();
                              
                                  if(dataRes){
                                      alert(" Registered SUCCESSFULLY")
                                      setData({name:"",PreferredWorkingHourPerDay:"",code:""});
                                      // callGetData();
                                         }
                        }


                      // TODO:  Delete method del data by Id


                        const deleteRecord = (productId) =>
                        {
                          axios.patch(`/timeManagemet/deleteSheet/${productId}`)
                          .then((result)=>{
                            callGetData();
                          })
                          .catch(()=>{
                            alert('Error in the Code');
                          });
                        };


                        // !  
                            useEffect(()=>{
                                callGetData();
                            },[])
                    
                    





    return(<>
                <div>

                <div>

                  <button onClick={gotoUser}>GO TO USER</button>
                </div>
            <div className="container main">
                <form method="POST" className="form-inline" >

                <h2 calssname="text-center ml-4">Register User</h2>

                     <div className="form-group">
                        <label htmlFor="name" >User Name:</label>
                             <input type="text" className="form-control" id="name" name="name" placeholder="Enter  Name" value={data.name} onChange={inputChange}/>
                     </div>


                    <div className="form-group">
                      <label htmlFor="PreferredWorkingHourPerDay">working_hour:</label>
                         <input type="number" className="form-control" id="PreferredWorkingHourPerDay" name="PreferredWorkingHourPerDay" placeholder="Enter preferred working_hour" 
                         value={data.PreferredWorkingHourPerDay} onChange={inputChange}/>
                     </div>

                     <div className="form-group">
                      <label htmlFor="code">code:</label>
                         <input type="number" className="form-control" id="code" name="code" placeholder="Enter code" value={data.code} onChange={inputChange}/>
                     </div>


                     <button type="submit" onClick={PostData} className="btn btn-primary mt-3">Submit</button>

                 </form>

            </div>
            
  



{/*  All below code is use for Display the Data*/}


<div>
<h2  className="text-center  ml-4 mt-4  mb-5">User List</h2>
<table className="table table-hover  table-striped table-bordered ml-4 ">
  <thead>
    <tr>
      <th>#USER CODE</th>
      <th>Date</th>
      <th>User Name</th>
      <th>Working hour</th>
      <th>Preferred Working hour</th>
      <th>Note</th>
      <th>Update</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
  

    {allData && allData.map((elem,id) =>{ return (
      <tr key={elem._id}>
        <td>{elem.code}</td>
        <td>{moment(data.updatedAt).format('LLL')}</td>
        <td>{elem.userData.name}</td>

       {elem.hours<elem.userData.PreferredWorkingHourPerDay? <td style={{backgroundColor:"#de6f57"}}>{elem.hours}</td>: <td>{elem.hours}</td>}
        <td>{elem.userData.PreferredWorkingHourPerDay}</td>
        <td>{elem.note}</td>
        <td>
              <Link className=" mr-2" to={`/updateProduct/editID/${elem._id}`}>
               <button> Edit</button> 
               </Link>
        </td>


        <td>
               <button className="btn btn-danger" onClick={()=>{  deleteRecord(elem._id)}} >Delete</button>
           </td>

      </tr>
    )})}
  </tbody>
</table>

</div>


{/* display data part end here */}
            </div>



    </>)
}
export default CreateData;
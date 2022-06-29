// UserCreateData
import React, { useState,useEffect } from "react";



const UserCreateData=()=>{

    const [data,setData]=useState({
        note:"",
        hours:"",
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
const postData=async(e)=>{
    // /timeManageme
    e.preventDefault();
    console.log("data",data)
    const{hours,code,note}=data;
    if(!hours||!code||!note){
      alert("please filled all the field")
    }
    const res=await fetch("/timeManagemet",{
     method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({note,hours,code})})
     const dataRes=await res.json();
       
           if(dataRes){
               alert(" data entered SUCCESSFULLY")
               setData({note:"",hours:"",code:""});
               // callGetData();
                  }
}

    return(<>
                     <div className="container main">
                <form method="POST" className="form-inline" >

                <h2 calssname="text-center ml-4">Enter Daily Sheet</h2>

                     <div className="form-group">
                        <label htmlFor="note" >Note:</label>
                             <input type="text" className="form-control" id="note" name="note" placeholder="Enter  Note" value={data.note} onChange={inputChange}/>
                     </div>


                    <div className="form-group">
                      <label htmlFor="PreferredWorkingHourPerDay">working_hour:</label>
                         <input type="number" className="form-control" id="PreferredWorkingHourPerDay" name="hours" placeholder="Enter preferred working_hour" 
                         value={data.hours} onChange={inputChange}/>
                     </div>

                     <div className="form-group">
                      <label htmlFor="code">code:</label>
                         <input type="number" className="form-control" id="code" name="code" placeholder="Enter code" value={data.code} onChange={inputChange}/>
                     </div>


                     <button type="submit" onClick={postData} className="btn btn-primary mt-3">Submit</button>

                 </form>

            </div>
            

    </>)
}
    export default UserCreateData;
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import moment from 'moment';


import axios from 'axios';


const EditProduct=()=>{


    let history = useHistory();
    let {id} = useParams();

    const[data,setData]=useState({
        note:"",
        hours:""
    })

    

    const onInputChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        console.log(name);
        console.log(value);
        
        setData({...data,[name]:value})
        console.log(data)
    }


// Call Update method  from backend 

    const updateProduct = async e => {
        e.preventDefault();
        if(data.hours==="" || data.note===""){
          alert("please fill all the field")
        }
      const res=  await axios.patch(`/timeManagemet/${id}`, data);
      console.log(res.status)

        history.push("/");
      };
     

//   get data by id from backend and we set response in setData

      const loadProduct =async  () => {

       fetch(`/timeManagemet/${id}`,{
                method: "GET",
              })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result.data);
                    console.log("edit data",data.data)

                  
            setData({
                        id: id,
                        code:result.data.code,
                        update: true,
                        note:result.data.note,
                        hours:result.data.hours
     
                    });
                
                  
                    console.log(data)
                })
                .catch((error) => console.log("error", error));
      };






    
    useEffect(()=>{
        loadProduct();
    },[])




    return(<>


    
    <div className="container">
     <div className="row mt-4"> 
      <div className="col-sm-10  mx-auto shadow  p-5">
        <h4 className="text-center mb-4">Edit A Product</h4>
          <h5 className="text-success">Code ID :  {data.code}{}  </h5>
          <div className="form-group mb-3">
          <label >Note:</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Notes"
              name="note"
              value={data.note}
              onChange={e => onInputChange(e)}
            />
          </div>


          <div className="form-group mb-3">
          <label>Hours:</label>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter hours"
              name="hours"
              value={data.hours}
              onChange={e => onInputChange(e)}
            />
          </div>
          
         
          <button className="btn btn-secondary" onClick={updateProduct}>Update Product</button>
       
       </div>
      </div> 
    </div>



    </>)
}

export default EditProduct;
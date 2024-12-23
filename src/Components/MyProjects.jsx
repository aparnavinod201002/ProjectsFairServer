import React, { useContext, useEffect, useState } from 'react'
import AddProjects from '../Components/AddProjects'
import { deleteProjectAPI, getUserProjectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../../ContextAPI/ContextShare'
import EditProject from './EditProject'

function MyProjects() {
  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
  const [userProjects,setUserProjects]=useState([])
  const getUserProjects = async()=>{
    const token = sessionStorage.getItem('token')
    if(token)
    {
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "authorization":`Bearer ${token}`
      }
      try{
        const result= await getUserProjectAPI(reqHeader)
        if(result.status==200){
          setUserProjects(result.data)
         
        }else{
          console.log(result);
          
        }

        }catch(err){
          console.log(err);
          
        }
      }
    }
    console.log(userProjects);
    
    useEffect(()=>{
      getUserProjects()
    },[addProjectResponse,editProjectResponse])

const deleteProject= async(pid)=>{

  const token = sessionStorage.getItem("token")
  if(token){
const reqHeader={
  // reqHeader "Content-Type":"multipart/form-data"
"content-Type":"application/json",
"authorization":`Bearer ${token}`
}
//api call
try{
const result =await deleteProjectAPI(pid,reqHeader)
if(result.status==200){
  getUserProjects()
}else{
  console.log(result.response.data);
  
}
}catch(err){
console.log(err);

}
  }
}

  return (
    <>
      <div className='card shadow mt-5'>
        <div className='d-flex'>
          <h2>My Projects</h2>
        </div>
        <div className='ms-auto'>
          <AddProjects/>
        </div>
        {userProjects?.length>0?userProjects.map((projects,index)=>(
           <div key={index} className='mt-4 border container-flid d-flex'>
         
            <h2>{projects?.title}</h2>
            <div className='ms-auto d-flex align-items-center'>
           <EditProject projects={projects}/>
            <a className='me-3 btn text-dark' href={projects?.github} target='_blank'><i class="fa-brands fa-github"></i></a>
            <a className='me-3 btn text-dark' onClick={()=>deleteProject(projects?._id)}><i class="fa-solid fa-trash"></i></a>
          </div>
       
       
        </div>
         
        )):<p className='text-danger fw-bolder ms-2'>No Projects Added Yet...</p>
      }
      </div>
    </>
  )
}

export default MyProjects

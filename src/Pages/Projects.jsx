import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCart from '../Components/ProjectCart'
import { getAllProjectAPI } from '../services/allAPI'
function Projects() {
  const [allProjects,setAllProjects]=useState([])
const [searchKey,setSearchKey]= useState("")

  const getAllProjects = async()=>{
    const token = sessionStorage.getItem('token')
    if(token)
    {
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "authorization":`Bearer ${token}`
      }
      try{
        const result= await getAllProjectAPI(searchKey,reqHeader)
        if(result.status==200){
          setAllProjects(result.data)
        }else{
          console.log(result);
          
        }

        }catch(err){
          console.log(err);
          
        }
      }
    }
    console.log(allProjects);
    
    useEffect(()=>{
      getAllProjects()
    },[searchKey])
    
  
  return (
    
    <>
      <Header/>
      <div className='projects mt-5'>
        <h1 className='text-center mb-5'>
          All Projects
        </h1>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='d-flex border w-50 rounded mb-3'>
            <input onChange={e=>setSearchKey(e.target.value)} type='text' className='form-control' placeholder='search by technologies'/>
            <i style={{marginLeft:"-50px", marginTop:"13px"}} class="fa-solid fa-magnifying-glass fa-route-90"></i>
          </div>
        </div>
      </div>
      <Row className='container-fluid mt-5'>
       { allProjects?.length>0?allProjects.map(projects=>(
        <Col sm={12} md={6} lg={4}>
        <ProjectCart projects={projects}/>
        </Col>
       ) ):<p style={{color:"red",textAlign:"center"}}>No  Any Projects Found...</p>
      }
      </Row>
    </>
  )
}

export default Projects

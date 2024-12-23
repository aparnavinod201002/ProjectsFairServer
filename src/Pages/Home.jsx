import React, { useEffect, useState } from 'react'
import { Col, Row} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import titleimag from '../assets/Images/home.gif'
import ProjectCart from '../Components/ProjectCart'
import {  toast, ToastContainer } from 'react-toastify';
import { getHomeProjectAPI } from '../services/allAPI'


function Home() {

const[isLoggedIn,setIsLoggedIn]=useState(false)
const [allProjects,setAllProjects]=useState([])
const navigate=useNavigate()
useEffect(()=>{
  getHomeProjects()
  if(sessionStorage.getItem("token")){
    setIsLoggedIn(true)
  }else{
    setIsLoggedIn(false)
  }
},[])

const handleProjectsPage=()=>{
if(sessionStorage.getItem("token")){
  navigate('/Projects')
}
else{
  toast.warning("Please Login To Our Projects...")
}
}

const getHomeProjects=async()=>{
  const result=await getHomeProjectAPI()
  if(result.status==200){
    setAllProjects(result.data)
  }else{
    console.log(result);
    
  }
}

  return (
    <>
      <div className='container-fluid rounded bg-info' style={{width:"100%",height:"90vh"}}>
        <Row className='d-flex align-items-center p-5'>
          <Col sm={12} md={6} className='mt-5'>
          <h1 style={{fontSize:"80px"}} className='fw-bolder text-light'><i className='fa-solid fa-list-check me-2'></i>Project-Fair
            </h1>
            <p className='text-light'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente incidunt alias accusantium assumenda! Minima voluptate nemo architecto aliquid fuga tenetur dolor! Impedit, repellendus illo. Consequatur debitis tempora quo illo numquam.</p>
              {isLoggedIn?<Link to={'/Dashboard'} className='btn btn-warning'>Manage Your Projects</Link>:
              <Link to={'/login'} className='btn btn-warning'>Start To EXplore</Link>}
              </Col>
              <Col sm={12} md={6} className='mt-5'>
              <img src={titleimag} width={"500px"} alt="" />
              </Col>
        </Row>
      </div>
{/* all projects */}
<div className='all-projects mt-5'>
  <h1 className='text-primary fw-bolder text-center' >Explore Your Projects</h1>
  <marquee scrollAmount={25}>
  <Row>
   {allProjects?.length>0?allProjects.map(projects=>(

<Col sm={12} lg={4} md={6}>
    <ProjectCart projects={projects}/>
    </Col>
   
   )):null }
  </Row>

  </marquee>
</div>
<div className='d-flex justify-content-center text-dark mt-5 btn fs-2' onClick={handleProjectsPage}><p>View More Projects</p></div>
   
   <ToastContainer autoclose={2000}
    position = 'top-center' theme='colored'/>
    </>
  )
}

export default Home

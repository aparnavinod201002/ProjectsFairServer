import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Modal,Form } from 'react-bootstrap';
import { server_url } from '../services/server_url';
import { ToastContainer, toast } from 'react-toastify';
import { updateProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../../ContextAPI/ContextShare';


function EditProject({projects}) {
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false);
    
setProjectData({ 
    title:projects?.title,
    languages:projects?.languages,
    overview:projects?.overview,
    github:projects?.github,
    website:projects?.website,
    projectImage:""
})
setPreview("")
  }
  const handleShow = () => setShow(true);
  const[projectData,setProjectData]=useState({
    id:projects?._id,
    title:projects?.title,
    languages:projects?.languages,
    overview:projects?.overview,
    github:projects?.github,
    website:projects?.website,
    projectImage:""
  })
  const [preview,setPreview]=useState("")


  useEffect(()=>{
    if(projectData.projectImage){
        setPreview(URL.createObjectURL(projectData.projectImage))
    }else{
        setPreview("")
    }
  },[projectData.projectImage])

  const handleUpdate=async()=>{
    const {id,title,languages,overview,github,website,projectImage}=projectData
    if(!title||!languages || !overview || !github ||!website)
    {
      toast.info("please fill missing fields")
    }else{
     const reqBody = new FormData()
  
    reqBody.append("title",title)
    reqBody.append("languages",languages)
    reqBody.append("overview",overview)
    reqBody.append("github",github)
    reqBody.append("website",website)
    preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",projects.projectImage)
  
    const token = sessionStorage.getItem("token")
    if(token){
  const reqHeader={
    // reqHeader "Content-Type":"multipart/form-data"
  "content-Type":"multipart/form-data",
  "authorization":`Bearer ${token}`
  }
  try{
    const result = await updateProjectAPI(id,reqBody,reqHeader)
    if(result.status==200){
  handleClose()
  setEditProjectResponse(result.data)
    }else{
      toast.warning(result.data.response)
    }
  }catch(err){
    console.log(err);
    
  }
}
    }
    }
  return (
    <div>
      <button className='btn ' onClick={handleShow}><a className='me-3 btn text-dark'><i class="fa-solid fa-pen-to-square"></i></a></button>
       <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
       >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
       <Modal.Body>
<div className='row'>
  <div className='col-6'>
    <label>
    <input type='file' style={{display:"none"}} onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})}/>
    <img height={"200px"} width={"100%"} src={preview?preview:`${server_url}/uploads/${projects?.projectImage}`}alt=""/>
    </label>
   
  </div>
  <div className='col-6'
>
  <Form>
  <FloatingLabel
        controlId="floatingInput1"
        label="Project Title"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Project Title" value={projectData?.title} onChange={e=>setProjectData({...projectData,title:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput2"
        label="Languages Used"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Languages Used" value={projectData?.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput3"
        label="OverView"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="OverView" value={projectData?.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput4"
        label="GitHub"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="GitHub" value={projectData?.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
      </FloatingLabel>
     
      <FloatingLabel
        controlId="floatingInput5"
        label="Website Link"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Website Link" value={projectData?.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} />
      </FloatingLabel>
     
    
  </Form>
  </div>
</div>
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose = {2000}
      position = 'top-center' theme='colored'/>
    </div>
  )
}

export default EditProject

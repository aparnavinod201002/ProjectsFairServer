import React, { useState } from 'react'
import img from '../assets/Images/image.png'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import { server_url } from '../services/server_url';

function ProjectCart({projects}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${server_url}/uploads/${projects?.projectImage}`} onClick={handleShow}/>
      <Card.Body>
        <Card.Title>{projects?.title}</Card.Title>
        
        
      </Card.Body>
    </Card>
    <Modal size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{projects?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col md={6}>
          <img src={img} width={"100%"} alt="" />
          </Col>
          <Col md={6}>
          <h1 className='fw-bolder'>{projects?.title}</h1>
          <h3 className='fw-bolder text-danger'>{projects?.languages}</h3>
          <p><span className='fw-bolder text-danger'>{projects?.overview}</span>
          </p>
          </Col>
        </Row>
        <div className='mt-2'>
          <a target='_blank' href={projects?.github} className='me-3 btn text-dark'><i class="fa-brands fa-github fa-2x"></i></a>
          <a target='_blank' href={projects?.linkedin}  className='me-3 btn text-dark'><i class="fa-brands fa-linkedin fa-2x"></i></a>
        </div>
        </Modal.Body>
        
      </Modal>
      

    </>
  )
}

export default ProjectCart

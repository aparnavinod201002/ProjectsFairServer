import React, { useContext } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate,  } from 'react-router-dom'
import { TokenAuthContext } from '../../ContextAPI/TokenAuth'

function Header({insideDashboard}) {
  const navigate=useNavigate()
  const {isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)

  const handleLogout=()=>{
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    navigate("/")
  }
  return (
    <>
    <div style={{marginTop:"100px"}}>
       <Navbar className="bg-info fixed-top">
        <Container>
          <Navbar.Brand >
           <Link to={'/'} style={{textDecoration:'none',color:'white'}}>
          <i className='fa-solid fa-list-check me-2'></i>
               Project-Fair
           </Link>
           {insideDashboard&&<Button className='btn btn-warning text-light ms 'onClick={handleLogout}>Logout</Button>}
          </Navbar.Brand>
        </Container>
      </Navbar>
      </div>
    </>
  )
}

export default Header

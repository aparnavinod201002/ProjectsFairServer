import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { loginAPI, registerAPI } from '../services/allAPI';
import { TokenAuthContext } from '../../ContextAPI/TokenAuth';
  

function Auth({register}) {
    const isRegisterForm=register?true:false
const navigate = useNavigate()
const {isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
    const [userData,setUserData]=useState({
        username:"",email:"",password:""
    })
    const handleRegister=async(e)=>{
        e.preventDefault()
       
       const {username,email,password} = userData
       if(!username || !email|| !password){
        toast.info("Please Fill Missing Fields")
       }
       else{
        try{
            const result= await registerAPI(userData)
            if(result.status == 200){
                toast.success(`${result.data.username} has successfully registered`)
                navigate('/login')
                setUserData({username:"",email:"",password:""})
            }else{
                toast.warning(result.response.data)
            }
        }catch(err){
            console.log(err);
            
        }
       
       }
    }

    const handlelogin=async(e)=>{
        e.preventDefault()
        const {email,password} = userData
        if(!email|| !password){
         toast.info("Please Fill Missing Fields")
        }
        else{
try{
//proceed to API call
const result = await loginAPI({email,password})
if(result.status == 200){
    sessionStorage.setItem("username",result.data.existingUser.username)
    sessionStorage.setItem("token",result.data.token)
    setIsAuthorized(true)
    navigate('/')
    setUserData({email:"",password:""})
}
else{

    toast.warning(result.response.data)
}

}catch(err){

console.log(err);

}
        }
    }
console.log(userData)
  return (
    <>
      <div style={{marginTop:"50px"}} className='d-flex justify-content-center align items-center'>
        <div className='container w-75 bg-info'>
            <Link to={'/'} style={{textDecoration:"none",color:"blue",fontWeight:"bolder"}}>
            <i className='fa-solid fa-arrow-left'></i>Back To Home</Link>
            <div className='card shadow p-3 bg-info'>
                <div className='row align-items-center'>
                    <div className='col-lg-6'>
                        <img src="https://i.pinimg.com/736x/ec/fb/9f/ecfb9ffd184bceec03b3c19161eee7fd.jpg" alt="" width={"100%"} />
                    </div>
                    <div className='col-lg-6'>
<div className='d-flex align-items-center flex-column'>
    <h1 className='fw-bolder text-light mt-2'><i className='fa-solid fa-list-check me-2'></i>Project Fair</h1>
<h5 className='fw-bolder text-warning'>
    {
        isRegisterForm?'sign up to your account':'sign in to your account'
    }
    <Form className='mt-4 text-dark'>
        {
            isRegisterForm&&<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                <Form.Control size='lg' type='text' placeholder='Enter Your Username'
                onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username}/>
            </Form.Group>
        }
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput2'>
                <Form.Control size='lg' type='text' placeholder='Enter Your Email'
                 onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
            </Form.Group>
          
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput3'>
                <Form.Control size='lg' type='text' placeholder='Enter Your Password'
                 onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}/>
            </Form.Group>
{
    isRegisterForm?
    <div className='mt-3'>
        <button className='btn btn-warning' onClick={handleRegister}>Register
        </button>
<p className='text-light fw-bolder mt-2'>Already Have an Account? Click here to <Link to={'/login'} style={{textDecoration:"none",color:"green"}}>Login</Link></p>
    </div>:
    <div className='mt-3'>
        <button className='btn btn-warning' onClickCapture={handlelogin}>Login</button>
        <p className='text-light fw-bolder mt-2'>New User ? Click here to<Link to={'/register'} style={{textDecoration:"none",color:"red"}}>Register</Link></p>
    </div>
}
    </Form>
</h5>
</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ToastContainer autoClose = {2000}
      position = 'top-center' theme='colored'/>
    </>
  )
}

export default Auth

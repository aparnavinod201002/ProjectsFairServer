import { commonAPI  } from "./commonAPI";
import { server_url } from "./server_url";


//register

export const registerAPI = async(user)=>{
    return await commonAPI('POST',`${server_url}/register`,user,"")
}

//login

export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${server_url}/login`,user,"")
}
//addprojectapi
    export const addProjectAPI = async(reqBody,reqHeader)=>{
        return await commonAPI('POST',`${server_url}/addprojects`,reqBody,reqHeader)
}

//homeprojects
export const getHomeProjectAPI = async()=>{
    return await commonAPI('GET',`${server_url}/homeprojects`,"","")
}

//allprojects
export const getAllProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI('GET',`${server_url}/allprojects?search=${searchKey}`,"",reqHeader)
}
//userprojects
export const getUserProjectAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${server_url}/userprojects`,"",reqHeader)
}
//update projects api

export const updateProjectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${server_url}/projects/edit/${id}`,reqBody,reqHeader)
}
//delete

export const deleteProjectAPI = async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${server_url}/projects/remove/${id}`,{},reqHeader)
}
import React, { useState,createContext } from 'react'

export const addProjectResponseContext = createContext()
export const editProjectResponseContext =createContext()
function ContextShare({children}) {
  const [addProjectResponse,setAddProjectResponse]=useState("")
  const [editProjectResponse,setEditProjectResponse]=useState("")
  return (
    <div>
      <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
      <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
        {children}
      </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
    </div>
  )
}

export default ContextShare

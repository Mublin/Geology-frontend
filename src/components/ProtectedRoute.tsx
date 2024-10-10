import React, { ReactElement, useContext } from 'react'
import { UserContext } from '../context/useUserHook'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}: any) => {
    const {state} = useContext(UserContext)
    const { userDetails } = state
  return (userDetails ? children : <Navigate to={'/signin'}/>)
}

export default ProtectedRoute
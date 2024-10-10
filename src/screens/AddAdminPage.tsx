import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/useUserHook'
import Loader from '../components/Loader'
import axios from 'axios'
import { toast } from 'react-toastify'
import api from '../utils/apiHelper'

const AddAdminPage = () => {
  const [registrationNumber, setregistrationNumber] = useState<string>('')
  const [adminApp, setAdminApp] = useState<string>('')
  const [user, setUser] = useState<{
    name: string
    email: string
    isAdmin: boolean
    id: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const checkHandler = async () => {
   try {
    setIsLoading(true)
    const {data} : {data :{
      name: string
      email: string
      isAdmin: boolean
      id: number
    }} = await api.get(`/users/regno?regno=${registrationNumber.toLowerCase()}`)
    if (data) {
        setUser({
          name: data.name,
          email: data.email,
          isAdmin: data.isAdmin,
          id: data.id
        })
        setAdminApp(data.isAdmin ? "True" : "False")
        toast.success(data.isAdmin ? "User is an admin" : "User is not an admin")
    }
   } catch (error) {
        console.error(error)
        toast.error("unable to fetch user")
   } finally {
    setIsLoading(false)
   }
  }


  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {
    if (user) {
      try {
        setIsLoading(true)
        const {data} : {data : string} = await api.put(`/users/updateadmin`, {
         admin: adminApp && adminApp === "True" ? true : adminApp === "User is admin" ? true : false,
         id : user.id
        })
        if (data) {
            toast.success(data)
        }
       } catch (error) {
            toast.error("unable to update admin role")
       } finally {
        setIsLoading(false)
       }
    } else {
      toast.error("unable to find user")
    }
   }
  return (
    isLoading ? <Loader /> : <div className='content'>
      <div className="signin">
        {user ? <form onSubmit={submitHandler}>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Registration Number:<input type="text" name='Reg-no' disabled={true} required placeholder='Capital letters e.g EES/00/GEL/00000' value={registrationNumber} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setregistrationNumber(e.target.value)}}  />
          </label>
         <label htmlFor="" style={{marginTop: '.6rem'}}>
            Name:<input type="text" name='namme' disabled={true} required placeholder='Capital letters e.g EES/00/GEL/00000' value={user.name}  />
          </label>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            User Admin Status:<input type="text" name='userStatus' disabled={true}  value={user.isAdmin ? "True" : "False"}  />
          </label>
          <p>{user.isAdmin ? user.name + " is an admin" : user.name + " is not an admin"}</p>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Change Admin Status: <select value={adminApp} onChange={(e: ChangeEvent<HTMLSelectElement>)=>{
              setAdminApp(e.target.value)
            }}>
              <option >Choose to give new role</option>
              <option value={"True"} key={1}>True</option>
              <option value={"False"} key={2}>False</option>
            </select>
          </label>
          <button type='submit'>Submit</button>
        </form> 


        : 
        

        <form onSubmit={checkHandler}>
          <h3>Add User to Admins</h3>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Registration Number:<input type="text" name='Reg-no' required placeholder='Capital letters e.g EES/00/GEL/00000' value={registrationNumber} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setregistrationNumber(e.target.value)}}  />
          </label>
          <button type='submit'>CHECK USER</button>
        </form>}
      </div>
    </div>
  )
}

export default AddAdminPage
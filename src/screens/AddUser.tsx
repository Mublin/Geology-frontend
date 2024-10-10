import React, { ChangeEvent, MouseEvent, useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/useUserHook'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import api from '../utils/apiHelper'

type AddUser = {
  registrationNumber: string
  name: string
}
type ReducerType = {
  users: AddUser[],
  registrationNumber: string,
  name: string
}
const initState: ReducerType = {
  users: [],
  registrationNumber: '',
  name: ''
}
type ActionType ={
 type: ActionEnum,
 payload: string | AddUser
}
enum ActionEnum  {
  adduser,
  addRegistrationNumber,
  addName
}
const reducer = (state : ReducerType, action: ActionType): ReducerType=>{
  switch (action.type) {
    case ActionEnum.addName:
      return {...state, name: action.payload as string};
    case ActionEnum.addRegistrationNumber:
        return {...state, registrationNumber: action.payload as string};
    case ActionEnum.addName:
        return {...state, users: [...state.users, action.payload as AddUser]};
    default:
        return state;
  }
}
const AddUsers = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const submitHandler = async (e: MouseEvent<HTMLFormElement>) => {

      try {
        setIsLoading(true)
        const {data} : {data : string} = await api.post(`/users/addusers`, {
        
        })
        if (data) {
            toast.success(data)
        }
       } catch (error) {
            toast.error("unable to update admin role")
       } finally {
        setIsLoading(false)
       }
   }
  return (
    isLoading ? <Loader /> : <div className='content'>
      <div className="signin">
        <form onSubmit={submitHandler}>
          <h3>Add new user</h3>
          <label htmlFor="" style={{marginTop: '.6rem'}}>
            Registration Number:<input type="text" name='Reg-no' value={state.registrationNumber} required placeholder='Capital letters e.g EES/00/GEL/00000' 
            onChange={(e: ChangeEvent<HTMLInputElement>)=>{ dispatch({
           type: ActionEnum.addRegistrationNumber,
           payload: e.target.value   
            })}}  />
          </label>
         <label htmlFor="" style={{marginTop: '.6rem'}}>
            Name:<input type="text" name='name' required value={state.name} placeholder='Abdullahi Idah' onChange={(e: ChangeEvent<HTMLInputElement>)=>{ dispatch({
           type: ActionEnum.addName,
           payload: e.target.value   
            })}}   />
          </label>
          <button type='submit'>Add User</button>
        </form> 
      </div>
    </div>
  )
}

export default AddUsers
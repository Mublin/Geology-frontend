import React, { ReactElement, createContext, useReducer } from "react"
import { User, UserResponse } from "../types/types"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import Cookies from "js-cookie"

type StateType = {
    userDetails: User | null
}
export const initialState: StateType = {
    userDetails: localStorage.getItem("userDetail") ? JSON.parse(localStorage.getItem('userDetail') as string) : null
}
const enum REDUCER_ACTION_TYPE {
    logIn,
    register,
    logOut
}
type ReducerAction ={
    type: REDUCER_ACTION_TYPE,
    payload?: User | null
}
const reducer = (state: StateType, action: ReducerAction): StateType =>{
    switch (action.type) {
        case REDUCER_ACTION_TYPE.logIn:
            return {...state, userDetails: action.payload as User}
            case REDUCER_ACTION_TYPE.register:
                return {...state, userDetails: action.payload as User}
                case REDUCER_ACTION_TYPE.logOut:
                    return {...state, userDetails: null}
        default:
            return state;
    }
}

const useUserContext = (initState: StateType)=>{
    const [state, dispatch]= useReducer(reducer, initState)
    const navigate = useNavigate()

    const registerHandler = async (registrationNumber: string, password: string, email: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
        try {
            setIsLoading(true)
            const {data}:{data : UserResponse} = await axios.post("https://localhost:7073/api/users/register", {
                registrationNumber,
                email,
                hash: password
            })
            if (data) {
                dispatch({
                    type: REDUCER_ACTION_TYPE.register,
                    payload: {
                        email: data.email,
                        registrationNumber: data.registrationNumber,
                        name: data.name,
                        id: data.id,
                        isAdmin: data.isAdmin,
                        isStudent: data.isStudent,
                        isActivated: data.isActivated,
                        isSuperAdmin: data.isSuperAdmin,
                        isLecturer: data.isLecturer,
                        accessToken: data.accessToken

                    }
                })
                localStorage.setItem('userDetail', JSON.stringify({
                    email: data.email,
                    registrationNumber: data.registrationNumber,
                    name: data.name,
                    id: data.id,
                    isAdmin: data.isAdmin,
                    isStudent: data.isStudent,
                    isActivated: data.isActivated,
                    isSuperAdmin: data.isSuperAdmin,
                    isLecturer: data.isLecturer,
                    accessToken: data.accessToken
                }))

            setIsLoading(false)
                navigate('/home')
                toast.success(`Welcome ${data.name}!, enjoy your day`)
            }else{
            setIsLoading(false)
                throw Error("Invalid username or password")
            }
        } catch (error) {
            setIsLoading(false)
            alert(error)
        }
    }
    const signInHandler = async (registrationNumber: string, password: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    try {
        setIsLoading(true)
        const {data} : {data : UserResponse} = await axios.post("https://localhost:7073/api/users/signin", {
            registrationNumber,
            hash: password
        }, {
            withCredentials: true
        })
        if (data) {
            dispatch({
                type: REDUCER_ACTION_TYPE.logIn,
                payload: {
                    email: data.email,
                    registrationNumber: data.registrationNumber,
                    name: data.name,
                    id: data.id,
                    isAdmin: data.isAdmin,
                    isStudent: data.isStudent,
                    isActivated: data.isActivated,
                    isSuperAdmin: data.isSuperAdmin,
                    isLecturer: data.isLecturer,
                    accessToken: data.accessToken
                }
            })
            localStorage.setItem('userDetail', JSON.stringify({
                email: data.email,
                        registrationNumber: data.registrationNumber,
                        name: data.name,
                        id: data.id,
                        isAdmin: data.isAdmin,
                        isStudent: data.isStudent,
                        isActivated: data.isActivated,
                        isSuperAdmin: data.isSuperAdmin,
                        isLecturer: data.isLecturer,
                        accessToken: data.accessToken
            }))
            setIsLoading(false)
            navigate('/home')
            toast.success(`welcome back ${data.name}!`)
        }else{
            setIsLoading(false)
            throw Error("Invalid username or password")
        }
    } catch (error) {
        setIsLoading(false)
        alert(error)
    }
    }
    const logOutHandler = ()=>{
        dispatch({
            type: REDUCER_ACTION_TYPE.logOut,
        })
        localStorage.removeItem('userDetail')
        Cookies.remove("refreshToken")
    }

    return { state, registerHandler, signInHandler, logOutHandler}
}

type useUserContextType = ReturnType<typeof useUserContext>

const initialContextState : useUserContextType = {
    state: initialState,
    logOutHandler: ()=>{},
    signInHandler:  async (registrationNumber: string, password: string) =>{},
    registerHandler: async (registrationNumber: string, password: string, email: string) =>{}
}

export const UserContext = createContext<useUserContextType>(initialContextState)

type ChildrenType ={
    children?: ReactElement | undefined
}
export const UserProvider = ({children, ...initialState}: ChildrenType & StateType): ReactElement=>{
    return <UserContext.Provider value={useUserContext(initialState)}>{children}</UserContext.Provider>
}
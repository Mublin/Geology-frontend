import axios from 'axios'
import React, { ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { UserContext } from '../context/useUserHook'
import Loader from '../components/Loader'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../utils/apiHelper'
import { getTokens } from '../utils/helper'

const AddLecturePage = () => {
    const navigate = useNavigate()
    const {state} = useContext(UserContext)
    const {userDetails} = state
    const [courseTitle, setCourseTitle] = useState<string>('')
    const [fileType, setFileType] = useState<string>('Lecture Note')
    const [courseCode, setCourseCode] = useState<string>('')
    const [lectureNote, setLectureNote] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [level, setLevel] = useState<number>(0)

    useEffect(()=>{
      setIsLoading(true);
      const getCodes= async ()=>{
        try {
          if (userDetails && !userDetails.dropboxAccessToken) {
            await getTokens("", userDetails);
          }
        }catch(error){
          toast.error("error");
        } finally{
          setIsLoading(false)
        }
      }
      getCodes()
      
    }, [userDetails])
    const submitHandler = async (e: MouseEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if (lectureNote) {
            try {
                if (level <= 0) {
                  throw Error("Enter Valid Number")
                }
                setIsLoading(true)
                const formData = new FormData()
                formData.append('uploadFile', lectureNote);
                formData.append('name', courseTitle);
                formData.append('courseName', lectureNote!.name);
                formData.append('courseCode', courseCode);
                formData.append('docType', fileType);
                formData.append('level', level.toString());
                const {data} :{data: {
                    message: string
                }} = await api.post(`/files/upload?accessToken=${userDetails?.dropboxAccessToken}`, formData)
                if (data) {
                    toast.success(data.message)
                    setCourseTitle('')
                    setCourseCode('')
                    setLectureNote(null)
                    setLevel(0)
                }
            } catch (error: any) {
                toast.error(error.message)
            } finally {
              setIsLoading(false)
            }
        }
    }

  return ( isLoading ? <Loader /> :(
    <div className='content'>
      <div className="register">
        <form onSubmit={submitHandler}>
          <label htmlFor="">
            Course Title: <input type="text" name='courseTitle' value={courseTitle} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setCourseTitle(e.target.value)}}  />
          </label>
          <label htmlFor="">
            Course Code: <input type="text" name='courseCode' value={courseCode} onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setCourseCode(e.target.value)}}  />
          </label>
          <label htmlFor="">
            File Type: <select name="filetype" value={fileType} id="filetype" onChange={(e: ChangeEvent<HTMLSelectElement>)=>{
              setFileType(e.target.value);
            }}>
              <option value="Lecture Note">Lecture Note</option>
              <option value="Past Question">Past Question</option>
              <option value="Power Point">Power Point</option>
              </select>
          </label>
          <label htmlFor="">
            Upload File: <input type="file" name='lecture-note' accept='.pdf, .docx, .doc, .ppt, .jpg, .jpeg, .png' onChange={(e: ChangeEvent<HTMLInputElement>)=>{ setLectureNote(e.target.files?.[0])}}  />
          </label>
          <label htmlFor="">
            Level: <input type="number" name='level' value={level} onChange={(e: ChangeEvent<HTMLInputElement>) => { setLevel(parseInt(e.target.value, 10)) }} />
        </label>

          <button type='submit'>Submit lecture note</button>
        </form>
      </div>
    </div>
  )
  )
}

export default AddLecturePage
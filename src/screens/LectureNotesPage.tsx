import React, { useContext, useEffect, useState } from 'react'
import './LectureNotesPage.css'
import { lectureNote } from '../types/types'
import axios from 'axios'
import { UserContext } from '../context/useUserHook'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import { getError } from '../components/getError'
import api from '../utils/apiHelper'
import { useLocation, useParams } from 'react-router-dom'

import { getDropboxCode, getDropboxToken, getTokens } from '../utils/helper'

const LectureNotesPage = () => {
    const {state} = useContext(UserContext)
    const {userDetails} = state
    const locatiion = useLocation()
    const query = new URLSearchParams(locatiion.search)
    let code = query.get("code") || ""
    const {levelId} = useParams()
    const [lectureNotes, setLectureNotes] = useState<lectureNote[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
      setIsLoading(true);
      try {
        if (userDetails && !userDetails.dropboxAccessToken) {
          getTokens(code, userDetails);
        }
    
        const fetchNotes = async () => {
          if (userDetails && userDetails.dropboxAccessToken) {
            try {
              const { data } = await api.get(`/files/lecturenotes/${levelId}`);
              const { $values } = data
              if (data) {
                setLectureNotes($values);
              }
            } catch (error) {
              toast.error('Unable to fetch lecture notes.');
            } finally {
              setIsLoading(false)
            }
          }
        };

        fetchNotes();
      } catch (error) {
        console.error("error message: " + error)
      } finally{
        setIsLoading(false)
      }
    }, [levelId, code, userDetails]);


    const deleteHandler= async(unique: number)=>{
        setIsLoading(true)
        try {
            const {data}: {data: {message: string}} = await api.delete(`/files/delete/${unique}?accessToken=${userDetails?.dropboxAccessToken}`)
                setLectureNotes(lectureNotes.filter(x=> x.lectureNoteId !== Number(unique)))
                toast.success(data.message)
        } catch (error) {
            toast.error(getError(error))
        } finally {
            setIsLoading(false)
        }
    }
  return ( isLoading ? <Loader /> : <div className='content'>
  <div className="lecture-note">
  <div className="container">
<h2> Lecture Notes</h2>
<ul className="responsive-table">
<li className="table-header">
<div className="col col-1">Course Code</div>
<div className="col col-3">Course Title</div>
<div className="col col-4">Level</div>
<div className="col col-4">Lecture file</div>
<div className="col col-3">Action</div>
</li>
{lectureNotes.map((notes)=>(
  <li className="table-row" key={notes.lectureNoteId}>
  <div className="col col-1" data-label="Course Code">{notes.courseCode}</div>
  <div className="col col-3" data-label="Course Title">{notes.noteName}</div>
  <div className="col col-4" data-label="Level">{notes.levelId}</div>
  <div className="col col-4" data-label="Lecture File">
    <a
      href={`https://localhost:7073/api/files/download/${notes.lectureNoteId}?accessToken=${userDetails!.dropboxAccessToken}`}
      download={notes.courseName}
    >
      Download
    </a>
  </div>
  <div className="col col-4"><button onClick={()=>{deleteHandler(notes.lectureNoteId)}}>Delete</button></div>

</li>
))}
</ul>
</div>
  </div>
</div>
    
  )
}

export default LectureNotesPage
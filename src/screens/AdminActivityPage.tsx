import React, { useContext } from 'react'
import pic from '../assets/IMG_3417.svg'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/useUserHook'

const AdminActivityPage = () => {
    const {state} = useContext(UserContext)
    const {userDetails} = state;
  return (
    <div className='content'>
      <div className="courses">
        <div className="level-selection">
          <h3>Select your level</h3>
        </div>
        <div className="levels">
        <div className='card'>
        <Link to={'/addusers'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3417.JPG?raw=true' alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>ADD USERS</h3>
            </div>
            <div className="card-description">
                <p>Admin Activity</p>
            </div>
        </div>
        </Link>
    </div>
    <div className='card'>
    <Link to={'/deleteuser'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3418.JPG?raw=true' alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>DELETE USERS</h3>
            </div>
            <div className="card-description">
                <p>Admin Activity</p>
            </div>
        </div>
        </Link>
    </div>
    {userDetails!.isSuperAdmin && <div className='card'>
    <Link to={'/addadmin'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3418.JPG?raw=true' alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>ADD OR REMOVE AN ADMIN</h3>
            </div>
            <div className="card-description">
                <p>Super Admin Activity</p>
            </div>
        </div>
        </Link>
    </div>}
        </div>
      </div>
    </div>
  )
}

export default AdminActivityPage;
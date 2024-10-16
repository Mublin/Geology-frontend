import React from 'react'
import pic from '../assets/IMG_3417.svg'
import { Link } from 'react-router-dom'

const AddCoursesPage = () => {
  return (
    <div className='content'>
      <div className="courses">
        <div className="level-selection">
          <h3>Select your level</h3>
        </div>
        <div className="levels">
        <div className='card'>
        <Link to={'/lecturenotes/1'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3417.JPG?raw=true' alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>Level 1</h3>
            </div>
            <div className="card-description">
                <p>SLATE.</p>
            </div>
        </div>
        </Link>
    </div>
    <div className='card'>
    <Link to={'/lecturenotes/2'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3418.JPG?raw=true' alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>Level 2</h3>
            </div>
            <div className="card-description">
                <p>PHYLLITE.</p>
            </div>
        </div>
        </Link>
    </div>
    <div className='card'>
    <Link to={'/lecturenotes/3'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3419.JPG?raw=true' alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>Level 3</h3>
            </div>
            <div className="card-description">
                <p>SCHIST.</p>
            </div>
        </div>
        </Link>
    </div>
    
    
    <div className='card'>
    <Link to={'/lecturenotes/4'} style={{textDecoration: 'none'}}>
        <div className="card-image">
            <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3420.JPG?raw=true' alt="" />
        </div>
        <div className="card-detail">
            <div className="card-title">
                <h3>Level 4</h3>
            </div>
            <div className="card-description">
                <p>GNEISS.</p>
            </div>
        </div>
      </Link>
    </div>
        </div>
      </div>
    </div>
  )
}

export default AddCoursesPage
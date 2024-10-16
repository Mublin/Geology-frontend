import React, { useEffect } from 'react'

const Homepage = () => {

  return (
    <div className='content'>
      <div className="home">
        <div className="home-img feature-title">
          <div className="home-image"></div>
        </div>
        <div className="home-feature">
          <div className="feature-title">
            <h2>FEATURED CONTENT</h2>
          </div>
          <div className="feature-cards">
                <div className='card home-card'>
              <div className="card-image home-image-card">
                  <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3419.JPG?raw=true' alt="" />
              </div>
              <div className="card-detail">
                  <div className="card-title">
                      <h3>GEOLOGY FIELD TRIP LEVEL 3 AND 4</h3>
                  </div>
                  <div className="card-description">
                      <p>Annual field trip for geology students.</p>
                  </div>
              </div>
              
              </div>
              <div className='card home-card'>
              <div className="card-image home-image-card">
                  <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3417.JPG?raw=true' alt="" />
              </div>
              <div className="card-detail">
                  <div className="card-title">
                      <h3>GEOLOGY WEEK 2024</h3>
                  </div>
                  <div className="card-description">
                      <p>Annual weekly event to know and celebrate geolofy.</p>
                  </div>
              </div>
              
              </div>
              <div className='card home-card'>
              <div className="card-image home-image-card">
                  <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3420.JPG?raw=true' alt="" />
              </div>
              <div className="card-detail">
                  <div className="card-title">
                      <h3>GEOLOGY FOOTBALL COMPETITION 2023/2024</h3>
                  </div>
                  <div className="card-description">
                      <p>Annual sport event for geology students.</p>
                  </div>
              </div>
              
              </div>
          </div>
        </div>
        <div className="home-quick-links">
          <div className="links-header feature-title">
            <h2>QUICK LINKS</h2>
          </div>
          <div className="links-quick feature-cards">
          <div className='card home-card h8'>
              <div className="card-image home-image-card">
                  <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3419.JPG?raw=true' alt="" />
              </div>
              <div className="card-detail quick">
                  <div className="card-title">
                      <h3>STUDY MATERIALS GEOLOGY</h3>
                  </div>
                  <div className="card-description">
                      <p>Lecture notes and other study materials such as jornals, papers, quizzes, e.t.c.</p>
                  </div>
              </div>
              
              </div>
              <div className='card home-card h8'>
              <div className="card-image home-image-card">
                  <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3418.JPG?raw=true' alt="" />
              </div>
              <div className="card-detail quick">
                  <div className="card-title">
                      <h3>INFORMATION ABOUT GEOLOGY</h3>
                  </div>
                  <div className="card-description">
                      <p>Know more about what you studying.</p>
                  </div>
              </div>
              
              </div>
              <div className='card home-card h8'>
              <div className="card-image home-image-card">
                  <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3417.JPG?raw=true' alt="" />
              </div>
              <div className="card-detail quick">
                  <div className="card-title">
                      <h3>EXAMINATION AND TEST PAST QUESTIONS</h3>
                  </div>
                  <div className="card-description">
                      <p>Questions to help you ace your test and exams and give you a sample of questions to expect.</p>
                  </div>
              </div>
              
              </div>
              <div className='card home-card h8'>
              <div className="card-image home-image-card">
                  <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3417.JPG?raw=true' alt="" />
              </div>
              <div className="card-detail quick">
                  <div className="card-title">
                      <h3>e-LIBRARY</h3>
                  </div>
                  <div className="card-description">
                      <p>Get link on your lectures.</p>
                  </div>
              </div>
              
              </div>
          </div>
        </div>
        <div className="upcoming-events">
          <div className="events-title feature-title">
            <h2>UPCOMING EVENTS</h2>
          </div>
          <div className="feature-cards">
          <div className='card home-card'>
              <div className="card-image home-image-card">
                  <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3420.JPG?raw=true' alt="" />
              </div>
              <div className="card-detail">
                  <div className="card-title">
                      <h3>LEVEL 3 AND 4 FIELD TRIP</h3>
                  </div>
                  <div className="card-description">
                      <p>Annual field trip for level 3 and 4 students.</p>
                  </div>
              </div>
              
              </div>
              <div className='card home-card'>
              <div className="card-image home-image-card">
                  <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3420.JPG?raw=true' alt="" />
              </div>
              <div className="card-detail">
                  <div className="card-title">
                      <h3>GEOLOGY MOVIE NIGHT</h3>
                  </div>
                  <div className="card-description">
                      <p>Event that usually take place during the geological week.</p>
                  </div>
              </div>
              
              </div>
              <div className='card home-card'>
              <div className="card-image home-image-card">
                  <img src='https://github.com/Mublin/geology-buk/blob/main/frontend1/src/assets/IMG_3419.JPG?raw=true' alt="" />
              </div>
              <div className="card-detail">
                  <div className="card-title">
                      <h3>NMGS INAGURATION</h3>
                  </div>
                  <div className="card-description">
                      <p>Sani Kabir Inuwa Emerges as the President NMGS/NAPE.</p>
                  </div>
              </div>
              
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
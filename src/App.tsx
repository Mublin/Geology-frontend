import React, { lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandPage from './screens/LandPage'
import Homepage from './screens/HomePage'
import RegisterPage from './screens/RegisterPage'
import SigninPage from './screens/SigninPage'
const AboutPage= lazy(()=> import('./screens/AboutPage'))
const ProfileScreen= lazy(()=> import( './screens/ProfileScreen'))
import NavBar from './components/NavBar'
import { Footer } from './components/Footer'
import CoursesPage from './screens/CoursesPage'
const ContactPage= lazy(()=> import( './screens/ContactPage'))
import { UserProvider, initialState } from './context/useUserHook'
import { ToastContainer } from 'react-toastify'
import  'react-toastify/dist/ReactToastify.css'
const AddLecturePage = lazy(()=> import( './screens/AddLecturePage'))
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute';
const PasswordScreen= lazy(()=> import( './screens/PasswordScreen'))
const LectureNotesPage= lazy(()=> import( './screens/LectureNotesPage'))
const AddAdminPage = lazy(()=> import('./screens/AddAdminPage'))
const LevelPage= lazy(()=> import( './screens/LevelPage'))
import Loader from './components/Loader'
import AddCoursesPage from './screens/AddCoursesPage'
const AdminActivityPage = lazy(()=> import('./screens/AdminActivityPage'))
const AddUsers = lazy(()=> import('./screens/AddUser'))
const DeleteUserPage = lazy(()=> import('./screens/DeleteUserPage'))

function App() {
  return (
    <>
    <BrowserRouter>
    <UserProvider userDetails={initialState.userDetails} >
      <div className='page'>
        <ToastContainer position='bottom-center'  />
        <div className='navy'>
        <NavBar/>
        </div>
        <div className="page-content">
      <Routes>
        <Route path='/' element={<LandPage />}/>
        <Route path='/programs/undergraduate/:level' element={<Suspense fallback={<Loader />}><LevelPage /></Suspense>} />
        <Route path='/adminactivity' element={<Suspense fallback={<Loader />}><AdminRoute>  <AdminActivityPage /></AdminRoute></Suspense>} />
        <Route path='/addadmin' element={<Suspense fallback={<Loader />}><AdminRoute><AddAdminPage /></AdminRoute></Suspense>} />
        <Route path='/addusers' element={<Suspense fallback={<Loader />}><AdminRoute><AddUsers /></AdminRoute></Suspense>} />
        <Route path='/deleteuser' element={<Suspense fallback={<Loader />}><AdminRoute><DeleteUserPage /></AdminRoute></Suspense>} />
        <Route path='/home' element={<Homepage />}/>
        <Route path='/new-note' element={<Suspense fallback={<Loader />}><AdminRoute><AddLecturePage /></AdminRoute></Suspense>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/programs/undergraduate' element={<CoursesPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/lecturenotes/:levelId' element={<LectureNotesPage />} />
        <Route path='/lecturenotes' element={<AddCoursesPage />} />
        <Route path='/about' element={<Suspense fallback={<Loader />}><AboutPage /></Suspense>} />
        <Route path='/contact' element={<Suspense fallback={<Loader />}><ContactPage /></Suspense>} />
        <Route path='/profile' element={<Suspense fallback={<Loader />}><ProtectedRoute> <ProfileScreen /> </ProtectedRoute></Suspense>} />
        <Route path='/changepassword' element={<Suspense fallback={<Loader />}><ProtectedRoute> <PasswordScreen /> </ProtectedRoute></Suspense>} />
      </Routes>
        </div>
        <div className="footy">
        <Footer/>
        </div>
      </div>
      </UserProvider>
    </BrowserRouter>
    </>
  )
}

export default App

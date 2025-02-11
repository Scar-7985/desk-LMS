import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-loading-skeleton/dist/skeleton.css'
import NonProtectedRoute from './Auth/NonProtectedRoute';
import ProtectedRoute from './Auth/ProtectedRoute';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Navbar from './Components/Navbar';
import ScrollToTop from './Components/ScrollToTop'
import UserStatus from './Auth/UserStatus'
import Profile from './Pages/Profile';
import InvoiceView from './Pages/InvoiceView'
import Checkout from './Pages/Checkout'
import VideoPlayer from './Pages/VideoPlayer'
import Quiz from './Pages/Quiz'
import QuizDetails from './Pages/QuizDetails'
import QuizType from './Pages/QuizType'
import QuizCategory from './Pages/QuizCategory'
import PDFView from './Pages/PDFView'
import MyCourses from './Pages/MyCourses'
import CourseCategories from './Pages/CourseCategories'
import UpdateProfile from './Pages/UpdateProfile'
import CourseType from './Pages/CourseType'
import Doubts from './Pages/Doubts';
import Notification from './Pages/Notification';
import CourseDetail from './Pages/CourseDetail';
import LegalTerms from './Pages/LegalTerms';
import Support from './Pages/Support';
import MyOrders from './Pages/MyOrders';
import QuizSubCategory from './Pages/QuizSubCategory';

const App = () => {

  const location = useLocation();
  const showHeader = location.pathname !== '/quiz' && location.pathname !== '/login';


  return (
    <div>

      {
        showHeader && <Navbar />
      }

      <div
        style={{
          backgroundColor: '#F9FBFD',
          transition: 'all 0.3s',
          paddingTop: showHeader ? '70px' : '0',
        }}>
        <ScrollToTop />
        <ToastContainer
          position="top-center"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="colored"
        />

        {/* If user is banned by admin  */}
        <UserStatus />
        {/* If user is banned by admin  */}

        <Routes>

          <Route element={<NonProtectedRoute />}>
            <Route path='/login' element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path='/support' element={<Support />} />
            <Route path='/legal-terms' element={<LegalTerms />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/update-profile' element={<UpdateProfile />} />
            <Route path='/invoice-view' element={<InvoiceView />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/video' element={<VideoPlayer />} />
            <Route path='/ask-doubts' element={<Doubts />} />
            <Route path='/notification' element={<Notification />} />
            <Route path='/my-courses' element={<MyCourses />} />
            <Route path='/my-orders' element={<MyOrders />} />
            <Route path='/quiz-category' element={<QuizCategory />} />
            <Route path='/quiz-sub-category' element={<QuizSubCategory />} />
            <Route path='/quiz-type' element={<QuizType />} />
            <Route path='/quiz' element={<Quiz />} />
            {/* <Route path='/quiz-details' element={<QuizDetails />} /> */}
            <Route path='/quiz_details/:quizId' element={<QuizDetails />} />
            <Route path='/pdf-view' element={<PDFView />} />
          </Route>

          <Route path='/' element={<Home />} />
          <Route path='/courses' element={<CourseCategories />} />
          <Route path='/course_type/:courseType' element={<CourseType />} />
          <Route path='/course-detail/:courseId' element={<CourseDetail />} />
          <Route path="*" element={<Home />} />

        </Routes>


      </div>
    </div>
  );
};

export default App;

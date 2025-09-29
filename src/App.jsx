import React from 'react'
import { Routes, Route } from "react-router-dom";
import { HeroSection } from './pages/Hero'
import { Resume } from './pages/Resume'
import Profile from './pages/Profile';
import Interview from './pages/Interview';
import InterviewDashboard from './pages/InterviewDashboard';
import InterviewDetail from './pages/InterviewDetail';

const App = () => {
  return (
    <div>
      {/* <HeroSection/> */}
      {/* <Resume/> */}
      
       <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/upload" element={<Resume/>} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/interview" element={<Interview/>}/>
      <Route path="/dashboard" element={<InterviewDashboard/>}/>
      <Route path="/detail/:id" element={<InterviewDetail/>} />
      

    </Routes>
    </div>
  )
}

export default App

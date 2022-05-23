import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router, 
        Routes, 
        Route,
        Navigate, 
        Link, 
        Outlet,
        useParams,
        NavLink,
        useNavigate,
        useLocation 
      } 
from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/myApps' element ={<Navigate replace to="/learn"/>}/>
      <Route path='/learn' element ={<Learn/>}>
        <Route path='courses' element={<Courses/>}>
          <Route path=':courseId' element={<CourseId/>}/>
        </Route>
        <Route path='bundles' element={<Bundles/>} />
      </Route>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  </Router>
  
);

function Home () {
  return (
    <div>
      <h1>Home Route</h1>
    </div>
  )
}

function Learn() {
  return (
    <div>
      <h1>
        Learn
      </h1>
      <h4>All Courses are listed here</h4>
      <Link to="/learn/courses">Courses</Link> {" "}
       | 
      <Link to="/learn/bundles">Bundle</Link>
      <Outlet/>
    </div>
  )
}

function Courses () {
  const coursesList = ["React","Angular","Vue","NodeJs"];
  const randomCourseName = coursesList[Math.floor(Math.random()*coursesList.length)];
  return (
   <div>
     <h1>Course List</h1>
     <h4>Course Card</h4>
     <NavLink
      style={({isActive}) => {
        return {
          backgroundColor : isActive ? "yellow" : "red"
        }
      }}
      to={`/learn/courses/${randomCourseName}`}>
      {randomCourseName}
     </NavLink>
     <NavLink to={"/learn/courses/tests"}>Tests</NavLink>
     <Outlet/>
   </div>
  )
}

function CourseId() {
  const {courseId} = useParams();
  const navigate =  useNavigate();
  return (
    <div>
       <h1>URL parameter: {courseId}</h1>
      <button onClick={() => {
        navigate("/dashboard", {state:"399"})
      }}
    >
    Price
    </button>
    <Link to="/dashboard" state={"DJANGO"}>Test Link</Link>
    </div>
  )
}


function Bundles () {
  return (
   <div>
     <h1>Bundle List</h1>
     <h4>Bundle Card</h4>
   </div>
  )
}

function Dashboard () {
  const location = useLocation();
  return (
    <div>
      <h1>Info i got here ....{location.state}</h1>
    </div>
  )
}




reportWebVitals();

import { useState, useEffect } from 'react';
import './index.css';

const API_BASE = 'http://127.0.0.1:8000/api';

function App() {
  const [role, setRole] = useState('LEARNER');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [usersRes, coursesRes] = await Promise.all([
        fetch(`${API_BASE}/users`),
        fetch(`${API_BASE}/courses`)
      ]);
      const usersData = await usersRes.json();
      const coursesData = await coursesRes.json();
      setUsers(usersData);
      setCourses(coursesData);
      
      const defaultUser = usersData.find(u => u.role === role);
      if (defaultUser) setCurrentUser(defaultUser);
    } catch (err) {
      console.error("Failed to fetch initial data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update current user when role changes
  useEffect(() => {
    if (users.length > 0) {
      const newUser = users.find(u => u.role === role);
      setCurrentUser(newUser);
    }
  }, [role, users]);

  useEffect(() => {
    if (currentUser && currentUser.role === 'LEARNER') {
      fetch(`${API_BASE}/enrollments/${currentUser.id}`)
        .then(res => res.json())
        .then(data => setEnrollments(data))
        .catch(err => console.error(err));
    } else {
      setEnrollments([]);
    }
  }, [currentUser]);

  const handleEnroll = async (courseId) => {
    try {
      const res = await fetch(`${API_BASE}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ learner_id: currentUser.id, course_id: courseId })
      });
      if (res.ok) {
        const newEnrollment = await res.json();
        setEnrollments([...enrollments, newEnrollment]);
      } else {
        const err = await res.json();
        alert(`Enrollment failed: ${err.detail}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStateChange = async (courseId, newState) => {
    try {
      const res = await fetch(`${API_BASE}/courses/${courseId}/state`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_state: newState })
      });
      if (res.ok) {
        const updatedCourse = await res.json();
        setCourses(courses.map(c => c.id === courseId ? updatedCourse : c));
      } else {
        alert("Failed to update course state.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="app-container"><main className="main-content">Loading LearnLab...</main></div>;

  let displayCourses = courses;
  if (role === 'LEARNER') {
    displayCourses = courses.filter(c => c.state === 'PUBLISHED');
  } else if (role === 'INSTRUCTOR') {
    displayCourses = courses.filter(c => c.instructor_id === currentUser?.id);
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-title">LearnLab LMS</h1>
        <div className="nav-roles">
          {['LEARNER', 'INSTRUCTOR', 'ADMIN'].map(r => (
            <button 
              key={r}
              onClick={() => setRole(r)} 
              className={`role-btn ${role === r ? 'active' : ''}`}
            >
              {r.charAt(0) + r.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </header>

      <main className="main-content">
        <h2 className="page-title fade-in">Welcome, {currentUser?.username || role}</h2>
        
        {role === 'LEARNER' && (
          <div style={{marginBottom: '3rem'}}>
            <h3 style={{marginBottom: '1rem'}}>Your Enrollments ({enrollments.length})</h3>
            <div className="course-grid">
              {enrollments.length === 0 ? <p className="text-muted">No enrollments yet.</p> : 
                enrollments.map((e, idx) => {
                  const course = courses.find(c => c.id === e.course_id);
                  if (!course) return null;
                  return (
                    <div key={idx} className="card fade-in" style={{animationDelay: `${idx * 0.1}s`}}>
                      <div><span className="card-badge badge-published">Enrolled</span></div>
                      <h4 className="card-title">{course.title}</h4>
                      <p className="card-description">Progress: {e.completed_lessons.length} lessons completed</p>
                      <button className="btn-success">Continue Learning</button>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}

        <h3 style={{marginBottom: '1rem'}}>
          {role === 'LEARNER' ? 'Available Courses' : role === 'INSTRUCTOR' ? 'Your Authored Courses' : 'Course Catalog'}
        </h3>
        
        <div className="course-grid">
          {displayCourses.length === 0 ? <p className="text-muted">No courses found.</p> : null}
          {displayCourses.map((course, idx) => {
            const isEnrolled = enrollments.some(e => e.course_id === course.id);
            const badgeClass = course.state === 'PUBLISHED' ? 'badge-published' : course.state === 'DRAFT' ? 'badge-draft' : 'badge-archived';
            
            return (
              <div key={course.id} className="card fade-in" style={{animationDelay: `${idx * 0.1}s`}}>
                <div>
                  <span className={`card-badge ${badgeClass}`}>{course.state}</span>
                </div>
                <h4 className="card-title">{course.title}</h4>
                <p className="card-description">{course.description}</p>
                <div style={{fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem'}}>
                  Difficulty: {course.difficulty} &bull; Category: {course.category}
                </div>
                
                {role === 'LEARNER' && (
                  <button 
                    className={isEnrolled ? "btn-success" : "btn-primary"} 
                    onClick={() => !isEnrolled && handleEnroll(course.id)}
                    disabled={isEnrolled}
                  >
                    {isEnrolled ? 'Enrolled ✓' : 'Enroll Now'}
                  </button>
                )}
                
                {role === 'INSTRUCTOR' && (
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <button className="btn-primary" style={{flex: 1}}>Edit</button>
                    {course.state === 'DRAFT' && <button className="btn-success" style={{flex: 1}} onClick={() => handleStateChange(course.id, 'PUBLISHED')}>Publish</button>}
                  </div>
                )}
                
                {role === 'ADMIN' && (
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    {course.state !== 'PUBLISHED' && <button className="btn-success" style={{flex: 1}} onClick={() => handleStateChange(course.id, 'PUBLISHED')}>Publish</button>}
                    {course.state === 'PUBLISHED' && <button className="btn-primary" style={{flex: 1}} onClick={() => handleStateChange(course.id, 'UNPUBLISHED')}>Unpublish</button>}
                    {course.state !== 'ARCHIVED' && <button className="btn-primary" style={{flex: 1, background: '#ef4444'}} onClick={() => handleStateChange(course.id, 'ARCHIVED')}>Archive</button>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="footer">
        &copy; 2026 LearnLab AI-Native Capstone &bull; Designed with Vanilla CSS
      </footer>
    </div>
  );
}

export default App;

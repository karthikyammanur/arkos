import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AboutPage from './pages/About'
import Dashboard from './pages/Dashboard'
import AIChatbot from './pages/Chatbot'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<AboutPage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/aichatbot" element={<AIChatbot/>}/>
      </Routes>
    </Router>
      
    </>
  )
}

export default App

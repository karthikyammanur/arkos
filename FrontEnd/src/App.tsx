import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </Router>
      
    </>
  )
}

export default App

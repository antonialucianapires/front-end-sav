import './global.css';
import styles from './App.module.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Sidebar } from './components/menu/Sidebar';

function App() {

  return (
    <div>
      <div className={styles.wrapper}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path='/' />
          </Routes>
        </Router>
        <h1>Dashboard</h1>
      </div>
    </div>
  )
}

export default App

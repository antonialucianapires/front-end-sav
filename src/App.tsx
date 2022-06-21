import './global.css';
import styles from './App.module.css';
import { Sidebar } from './components/menu/Sidebar';

function App() {

  return (
    <div>
      <div className={styles.wrapper}>
        <Sidebar />
      <h1>Dashboard</h1>
      </div>
    </div>
  )
}

export default App

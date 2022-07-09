import './global.css';
import styles from './App.module.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Sidebar } from './components/menu/Sidebar';
import { Home } from './pages/Home';
import { Relatorio } from './pages/Relatorio';
import { Periodo } from './pages/Periodo';
import { Avaliacoes } from './pages/Avaliacoes';
import { Usuarios } from './pages/Usuarios';
import { Turmas } from './pages/Turmas';
import { Configuracao } from './pages/Configuracao';
import { PeriodoVisualizacao } from './pages/periodo/PeriodoVisualizacao';

function App() {

  return (
    <div>
      <div className={styles.wrapper}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/relatorios' element={<Relatorio />} />
            <Route path='/periodos' element={<Periodo />} />
            <Route path='/avaliacoes' element={<Avaliacoes />} />
            <Route path='/usuarios' element={<Usuarios />} />
            <Route path='/turmas' element={<Turmas />} />
            <Route path='/avisos' element={<Turmas />} />
            <Route path='/configuracoes' element={<Configuracao />} />
            <Route path='/periodos/:id' element={<PeriodoVisualizacao />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App

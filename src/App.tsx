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
import { PeriodoEdicao } from './pages/periodo/PeriodoEdicao';
import { PeriodoCriacao } from './pages/periodo/PeriodoCriacao';
import { TurmaEdicao } from './pages/turma/TurmaEdicao';
import { TurmaVisualizacao } from './pages/turma/TurmaVisualizacao';
import { Questoes } from './pages/Questoes';
import { QuestaoCriacao } from './pages/questoes/QuestaoCriacao';
import { QuestaoVisualizacao } from './pages/questoes/QuestaoVisualizacao';
import { QuestaoEdicao } from './pages/questoes/QuestaoEdicao';
import { TurmaCriacao } from './pages/turma/TurmaCriacao';
import { AvaliacaoCriacao } from './pages/avaliacao/AvaliacaoCriacao';
import { AvaliacaoQuestao } from './pages/avaliacao/AvaliacaoQuestao';

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
            <Route path='/periodos/:id/resumo' element={<PeriodoVisualizacao />} />
            <Route path='/periodos/:id/edicao' element={<PeriodoEdicao />} />
            <Route path='/periodos/novo' element={<PeriodoCriacao />} />
            <Route path='/turmas/:id/visualizacao' element={<TurmaVisualizacao />} />
            <Route path='/turmas/:id/edicao' element={<TurmaEdicao />} />
            <Route path='/turmas/criacao' element={<TurmaCriacao />} />
            <Route path='/questoes' element={<Questoes />} />
            <Route path='/questoes/criacao' element={<QuestaoCriacao />} />
            <Route path='/questoes/:id/visualizacao' element={<QuestaoVisualizacao />} />
            <Route path='/questoes/:id/edicao' element={<QuestaoEdicao />} />
            <Route path='/avaliacoes/criacao' element={<AvaliacaoCriacao />} />
            <Route path='/avaliacoes/:id/questoes' element={<AvaliacaoQuestao />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App

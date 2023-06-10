import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';

import Input from './components/Input';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<Input />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Input from './components/Input';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Routes>
        <Route path='/touchType' element={<Input />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

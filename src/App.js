import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './components/Main';
import List from './components/List';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/edit/:userID" element={<List />} />
          <Route index element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Main from './components/Main';
import List from './components/List';
import Search from './components/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<List />} />
          <Route path="/edit/:userID" element={<List />} />
          <Route path="/search/:keyWords" element={<List />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

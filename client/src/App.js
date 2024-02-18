import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import './App.css';
import { Cart } from './pages/Cart';
import { Account } from './pages/Account';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/account" element={<Account/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

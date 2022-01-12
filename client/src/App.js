import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Challenges from './pages/Challenges';
import Challenge from './pages/Challenge';
import CreateChallenge from './pages/CreateChallenge';
import EditChallenge from './pages/EditChallenge';
import ConfirmChallenge from './pages/ConfirmChallenge';
import Mypage from './pages/Mypage';
import EditMyinfo from './pages/EditMyinfo';
import KakaoPage from './pages/KakaoPage';
import NaverPage from './pages/NaverPage';
import GooglePage from './pages/GooglePage'

function App() {
  return (
    <div className='App'>
      <Navigation />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/challenges' element={<Challenges />} />
          <Route path='/challenge/:id' element={<Challenge />} />
          <Route path='/createchallenge' element={<CreateChallenge />} />
          <Route path='/editchallenge/:id' element={<EditChallenge />} />
          <Route path='/confirmchallenge' element={<ConfirmChallenge />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/editmyinfo' element={<EditMyinfo />} />
          <Route path='/oauth/callback/kakao' element={<KakaoPage />} />
          <Route path='/oauth/callback/naver' element={<NaverPage />} />
          <Route path='/oauth/callback/google' element={<GooglePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

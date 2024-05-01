import { Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu'; //메뉴
import Home from './components/Home'; //홈 화면
//테스트 파일
import Test01 from './components/Test01';
import Test02 from './components/Test02';
import Test03 from './components/Test03';
import Qna from './components/integrated/Qna';
import Seat from './components/integrated/Seat';
import ConcertRequest from './components/integrated/ConcertRequest';
import SignUp from './components/member/SignUp';
import Login from './components/member/Login';
import Concert from './components/integrated/concert/Concert';
import ConcertDetail from './components/integrated/concert/ConcertDetail';

function App() {
  return (
    <>
      <div className='container-fluid'>
        {/* fluid : 네비바를 화면 끝까지 채워주는 기능 */}
        <div className='row'>
          <div className='col-sm-10 offset-sm-1'></div>
          {/* 네비게이터 */}
          <Menu />


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test01" element={<Test01 />} />
            <Route path="/test02" element={<Test02 />} />
            <Route path="/test03" element={<Test03 />} />

            <Route path="/testqna" element={<Qna />} />
            <Route path="/seat" element={<Seat />} />
            <Route path="/ConcertRequest" element={<ConcertRequest />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/concert" element={<Concert />} />
            <Route path="/concert/:concertNo" element={<ConcertDetail />} />

          </Routes>
        </div>
      </div>

    </>
  );
};

export default App;

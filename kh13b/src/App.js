import { Route, Routes } from 'react-router-dom';
import axios from "../src/components/utils/CustomAxios";
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
import FindId from './components/member/Find/FindId';
import Approve from './components/integrated/ConcertSchedule/Approve';
import RequestDetail from './components/integrated/ConcertSchedule/RequestDetail';


import Concert from './components/integrated/concert/Concert';
import ConcertDetail from './components/integrated/concert/ConcertDetail';

import Notice from './components/integrated/Notice';
import NoticeDetail from './components/integrated/NoticeDetail';

import { isLoginState, loginGradeState, loginIdState } from './components/utils/RecoilData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCallback, useEffect } from 'react';

import ConcertScheduleInfo from './components/integrated/concert/ConcertScheduleInfo';



function App() {

  //recoil state
  const [loginId, setLoginId] = useRecoilState(loginIdState);
  const [loginGrade, setLoginGrade] = useRecoilState(loginGradeState);

  //recoil value
  const isLogin = useRecoilValue(isLoginState);

  //effect
  useEffect(() => {
    refreshLogin();
  }, []);//최초 1회

  //callback
  const refreshLogin = useCallback(async () => {
    //localStorage에 있는 refreshToken의 유무에 따라 로그인 처리를 수행
    const refreshToken = window.localStorage.getItem("refreshToken");
    //console.log(refreshToken);
    if (refreshToken !== null) {//refreshToken 항목이 존재한다면
      //리프레시 토큰으로 Authorization을 변경하고
      axios.defaults.headers.common["Authorization"] = refreshToken;
      //재로그인 요청을 보낸다
      const resp = await axios.post("/member/refresh");
      //결과를 적절한 위치에 설정한다
      setLoginId(resp.data.memberId);
      setLoginGrade(resp.data.memberGrade);
      axios.defaults.headers.common["Authorization"] = resp.data.accessToken;
      window.localStorage.setItem("refreshToken", resp.data.refreshToken);
    }
  }, []);

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

            {/* 로그인 */}
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findId" element={<FindId />} />

            <Route path="/qna" element={<Qna />} />
            <Route path="/seat" element={<Seat />} />
            <Route path="/ConcertRequest" element={<ConcertRequest />} />

            <Route path="/concert" element={<Concert />} />
            <Route path="/concert/:concertNo" element={<ConcertDetail />} />

            <Route path="/approve/:concertRequestNo" element={<RequestDetail />} />
            <Route path="/approve" element={<Approve />} />

            <Route path="/concertScheduleInfo" element={<ConcertScheduleInfo/>} />

            <Route path='/notice' element={<Notice />} />
            <Route path="/notice/:noticeNo" element={<NoticeDetail />} />
          </Routes>
        </div>
      </div>

    </>
  );
};

export default App;

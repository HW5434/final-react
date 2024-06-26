import { Route, Routes } from 'react-router-dom';
import axios from "../src/components/utils/CustomAxios";
import './App.css';
import Menu from './components/Menu'; //메뉴
import Home from './components/Home/Home'; //홈 화면
//테스트 파일
import Test02 from './components/Test02';
import Test03 from './components/Test03';
import Qna from './components/integrated/Qna';
import Seat from './components/integrated/Seat';
import ConcertRequest from './components/integrated/ConcertRequest';
import SignUp from './components/member/SignUp';
import Login from './components/member/Login/Login';
import Mypage from './components/member/Mypage/Mypage';
import FindId from './components/member/Find/FindId';
import FindPw from './components/member/Find/FindPw';
import KakaoAuth from './components/member/Auth/KakaoAuth';
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
import ReservationList from './components/integrated/ReservationList';
import ReservationDetail from './components/integrated/ReservationDetail';
import Reservation from './components/integrated/Reservation';
import RequestList from './components/integrated/ConcertSchedule/RequestList';
import ConcertScheduleAdd from './components/integrated/ConcertSchedule/ConcertScheduleAdd';
import Introduce from './components/introduce';
import Footer from './components/Footer';
import ScheduleList from './components/integrated/ConcertSchedule/ScheduleList';
import ReservationFinish from './components/integrated/ReservationFinish';
import KaKaoPaySuccess from './components/integrated/KaKao/KaKaoPaySuccess';
import AdminMember from './components/integrated/admin/AdminMember';

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
      console.log(resp)
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
            <Route path="/stage" element={<Introduce />} />
            <Route path="/test02" element={<Test02 />} />
            <Route path="/test03" element={<Test03 />} />

            {/* 로그인 */}
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/findId" element={<FindId />} />
            <Route path="/findPw" element={<FindPw />} />
            <Route path="/auth" element={<KakaoAuth />} />

            {/* 테스트 */}
            <Route path="/kakaopay/purchase/success" element={<KaKaoPaySuccess />} />
            
            <Route path="/qna" element={<Qna />} />
            <Route path="/seat" element={<Seat />} />
            <Route path="/ConcertRequest" element={<ConcertRequest />} />

            <Route path="/concert" element={<Concert />} />
            <Route path="/concert/:concertNo" element={<ConcertDetail />} />

            <Route path="/approve/:concertRequestNo" element={<RequestDetail />} />
            <Route path="/approve" element={<Approve />} />

            <Route path="/concertScheduleInfo" element={<ConcertScheduleInfo/>} />

            <Route path="/reservation/:concertNo" element={<Reservation/>} />
            <Route path="/reservationFinish" element={<ReservationFinish/>} />
            <Route path="/approve/:concertRequestNo" element={<RequestDetail/>}/> 
            <Route path="/approve" element={<Approve/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path='/notice' element={<Notice/>}/>
            <Route path="/notice/:noticeNo" element={<NoticeDetail/>}/>
            <Route path="/reservationList" element={<ReservationList/>}/>
            <Route path="/reservationList/:reservationNo" element={<ReservationDetail/>}/>
            <Route path="/requestList" element={<RequestList/>}/>
            <Route path="/requestList/:concertRequestNo" element={<ConcertScheduleAdd/>}/>
            <Route path="/scheduleList" element={<ScheduleList/>}/>
            <Route path="/adminMember" element={<AdminMember/>}/>
          </Routes>
          <Footer />
        </div>
      </div>

    </>
  );
};

export default App;

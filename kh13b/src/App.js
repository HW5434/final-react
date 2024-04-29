import { Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu'; //메뉴
import Home from './components/Home'; //홈 화면
//테스트 파일
import Test01 from './components/Test01'; 
import Test02 from './components/Test02';
import Test03 from './components/Test03';
import Qna from './components/integrated/Qna';


function App() {
  return (
    <>
      <div className='container-fluid'> 
      {/* fluid : 네비바를 화면 끝까지 채워주는 기능 */}
        <div className='row'>
          <div className='col-sm-10 offset-sm-1'></div>
          {/* 네비게이터 */}
          <Menu/>

          
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/test01" element={<Test01/>}/>
            <Route path="/test02" element={<Test02/>}/>
            <Route path="/test03" element={<Test03/>}/>

            <Route path="/testqna" element={<Qna/>}/>
          </Routes>
        </div>
      </div>

    </>
  );
};

export default App;

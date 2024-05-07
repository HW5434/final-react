//화면 상단에 배치할 메뉴(Header로 사용할 예정)

//import
import { useRecoilState } from 'recoil';
import './Menu.css';
import { NavLink } from "react-router-dom";
import { loginGradeState, loginIdState } from './utils/RecoilData';
import { useCallback, useMemo } from 'react';
import axios from "./utils/CustomAxios";


//function
function Menu() {

    //state
    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [loginGrade, setLoginGrade] = useRecoilState(loginGradeState);

    //memo
    const isLogin = useMemo(()=> {
        return loginId.length > 0 && loginGrade.length > 0;
    }, [loginId, loginGrade]);

    //callback
    const logout = useCallback(()=> {
        //recoil 저장소에 대한 정리 + axios의 헤더 제거
        setLoginId('');
        setLoginGrade('');
        localStorage.removeItem('refreshToken');
        
        delete axios.defaults.headers.common['Authorization'];
    }, [loginId, loginGrade]);

    //view
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
                <div className="container-fluid">
                    {/* React에서는 페이지간 이동을 NavLink 태그로 한다 */}
                    <NavLink className="navbar-brand" to="/">
                        {/* 로고 들어가야 할 자리 */}
                        <img src="http://via.placeholder.com/200x100?text=Final Project" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* 메뉴들과 로그인 상태 */}
                    <div className="collapse navbar-collapse " id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            {/* 메뉴 1 */}
                            <li className="nav-item dropdown p-3">
                                <a className="nav-link dropdown-toggle" href="#" role="button" aria-haspopup="true" aria-expanded="false">메뉴 1번</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/test01">테스트 1번</NavLink>
                                    <NavLink className="dropdown-item" to="/test02">테스트 2번</NavLink>
                                    <NavLink className="dropdown-item" to="/test03">테스트 3번</NavLink>
                                </div>
                            </li>
                            {/* 메뉴 2 */}
                            <li className="nav-item dropdown p-3">
                                <a className="nav-link dropdown-toggle" href="#" role="button" aria-haspopup="true" aria-expanded="false">메뉴 2번</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/test01">테스트 1번</NavLink>
                                    <NavLink className="dropdown-item" to="/ConcertRequest">대관문의 신청</NavLink>
                                    <NavLink className="dropdown-item" to="/test03">테스트 3번</NavLink>
                                </div>
                            </li>
                            {/* 메뉴 3 */}
                            <li className="nav-item dropdown p-3">
                                <a className="nav-link dropdown-toggle" href="#" role="button" aria-haspopup="true" aria-expanded="false">메뉴 3번</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/approve">대관신청목록</NavLink>
                                </div>
                            </li>
                            {/* 고객센터 */}
                            <li className="nav-item dropdown p-3">
                                <a className="nav-link dropdown-toggle" href="#" role="button" aria-haspopup="true" aria-expanded="false">고객센터</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/qna">1대1 문의글</NavLink>
                                    <NavLink className="dropdown-item" to="/notice">공지사항 공사중..</NavLink> 
                                </div>
                            </li>
                            {/* 좌석 */}
                            <li className="nav-item dropdown p-3">
                                <a className="nav-link dropdown-toggle"href="#" role="button" aria-haspopup="true" aria-expanded="false">좌석</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/seat">좌석배치도</NavLink>
                                </div>
                            </li>
                            {/* 공연 */}
                            <li className="nav-item dropdown p-3">
                                <a className="nav-link dropdown-toggle" href="#" role="button" aria-haspopup="true" aria-expanded="false">공연</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/concert">공연 정보</NavLink>
                                </div>
                            </li>
                        </ul>

                        {/* 로그인관련 */}
                        <div className="d-flex">
                            {isLogin ? ( /*isLogin : 로그인이 되어 있을 경우*/
                                <>
                                    <NavLink className="dropdown-item me-2" to="#" onClick={e=>logout()}>로그아웃</NavLink>
                                    <NavLink className="dropdown-item" to="/mypage">마이페이지</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink className="dropdown-item me-2" to="/login">로그인</NavLink>
                                    <NavLink className="dropdown-item" to="/signUp">회원가입</NavLink>
                                </>
                            )}
                        </div>
                        
                    </div>
                </div>
            </nav>
        </>
    );

};

//export
export default Menu;
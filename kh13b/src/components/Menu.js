//화면 상단에 배치할 메뉴(Header로 사용할 예정)

//import
import { useRecoilState } from 'recoil';
import './Menu.css';
import { NavLink } from "react-router-dom";
import { loginGradeState, loginIdState } from './utils/RecoilData';
import { useCallback, useMemo } from 'react';
import axios from "./utils/CustomAxios";
import Wrapper from './Home/Wrapper';
import logo from './Home/logo/logo.png';
import { MdOutlineLogout, MdOutlineLogin, MdOutlineBroadcastOnPersonal } from "react-icons/md";
import { LuUserPlus } from "react-icons/lu";


//function
function Menu() {

    //state
    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [loginGrade, setLoginGrade] = useRecoilState(loginGradeState);

    //memo
    const isLogin = useMemo(() => {
        return loginId.length > 0 && loginGrade.length > 0;
    }, [loginId, loginGrade]);

    //관리자 로그인시

    //callback
    const logout = useCallback(() => {
        //recoil 저장소에 대한 정리 + axios의 헤더 제거
        setLoginId('');
        setLoginGrade('');
        localStorage.removeItem('refreshToken');

        delete axios.defaults.headers.common['Authorization'];
    }, [loginId, loginGrade]);

    //view
    return (
        <>
            {/* 로고 */}
            <NavLink className="navbar-brand" to="/">
    <div className='navbar-logo text-center'><img src={logo} style={{ width: 'auto', height: '100px' }} /></div>
            </NavLink>
            <nav className="navbar navbar-expand-lg navi-color" data-bs-theme="light">
                <Wrapper>
                    {/* React에서는 페이지간 이동을 NavLink 태그로 한다 */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-theme="light" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{color: '#EEEEEE'}}></span>
                    </button>
                    {/* 메뉴들과 로그인 상태 */}
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            {/* 메뉴 1 */}
                            <li className="nav-item">
                                {/* <a className="nav-link dropdown-toggle menu-font-color" href="#" role="button" aria-haspopup="true" aria-expanded="false">소개</a> */}
                                <NavLink className="nav-link menu-font-color" to="/stage">소개</NavLink>
                                {/* <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/stage">소개</NavLink>
                                </div> */}
                            </li>
                            {/* 메뉴 2 */}
                            <li className="nav-item">
                                {/* <a className="nav-link dropdown-toggle menu-font-color" href="#" role="button" aria-haspopup="true" aria-expanded="false">대관</a> */}
                                <NavLink className="nav-link menu-font-color" to="/ConcertRequest">대관문의 신청</NavLink>
                                {/* <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/ConcertRequest">대관문의 신청</NavLink>
                                </div> */}
                            </li>
                            {/* 고객센터 */}
                            <li className="nav-item">
                                {/* <a className="nav-link dropdown-toggle menu-font-color" href="#" role="button" aria-haspopup="true" aria-expanded="false">대관</a> */}
                                <NavLink className="nav-link menu-font-color" to="/qna">1 : 1 문의</NavLink>
                                {/* <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/ConcertRequest">대관문의 신청</NavLink>
                                </div> */}
                            </li>
                            <li className="nav-item">
                                {/* <a className="nav-link dropdown-toggle menu-font-color" href="#" role="button" aria-haspopup="true" aria-expanded="false">대관</a> */}
                                <NavLink className="nav-link menu-font-color" to="/notice">공지사항</NavLink>
                                {/* <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/ConcertRequest">대관문의 신청</NavLink>
                                </div> */}
                            </li>
                            {/* 공연 */}
                            <li className="nav-item">
                                {/* <a className="nav-link dropdown-toggle menu-font-color" href="#" role="button" aria-haspopup="true" aria-expanded="false">대관</a> */}
                                <NavLink className="nav-link menu-font-color" to="/concert">공연</NavLink>
                                {/* <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/ConcertRequest">대관문의 신청</NavLink>
                                </div> */}
                            </li>
                            {/* 좌석 */}
                            {isLogin && loginGrade === '관리자' && (
                                <>
                                {/* 관리자 */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle menu-font-color" href="#" role="button" aria-haspopup="true" aria-expanded="false">관리자</a>
                                    <div className="dropdown-menu">
                                        <NavLink className="dropdown-item" to="/approve">대관신청목록</NavLink>
                                        <NavLink className="dropdown-item" to="/reservationList">전체 예매 내역</NavLink>
                                        <NavLink className="dropdown-item" to="/requestList">승인신청 목록</NavLink>
                                        <NavLink className="dropdown-item" to="/seat">좌석관리</NavLink>
                                        <NavLink className="dropdown-item" to="/adminMember">회원관리</NavLink>
                                    </div>
                                </li>
                            </>
                            )}
                        </ul>
                        {/* 로그인관련 */}
                        <div className="d-flex login-font">
                            {isLogin ? ( /*isLogin : 로그인이 되어 있을 경우*/
                                <>
                                    <NavLink className="dropdown-item me-2" to="/" onClick={e => logout()}>
                                        Logout&nbsp;&nbsp;<MdOutlineLogout />
                                    </NavLink>
                                    <span className='me-2'>|</span>
                                    <NavLink className="dropdown-item" to="/mypage">
                                        My&nbsp;&nbsp;<MdOutlineBroadcastOnPersonal/>
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink className="dropdown-item me-2" to="/login">
                                        Login&nbsp;&nbsp;<MdOutlineLogin />
                                    </NavLink>
                                    <span className='me-2'>|</span>
                                    <NavLink className="dropdown-item" to="/signUp">
                                        SignUp&nbsp;&nbsp;<LuUserPlus />
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </Wrapper>
            </nav>
        </>
    );

};

//export
export default Menu;
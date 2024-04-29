//화면 상단에 배치할 메뉴(Header로 사용할 예정)

//import
import './Menu.css';
import { NavLink } from "react-router-dom";


//function
function Menu() {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
                <div className="container-fluid">
                    {/* React에서는 페이지간 이동을 NavLink 태그로 한다 */}
                    <NavLink className="navbar-brand" to="/">
                        <img src="http://via.placeholder.com/200x100?text=Final Project"/>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            {/* 메뉴 1 */}
                            <li className="nav-item dropdown ms-auto">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">메뉴 1번</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/test01">테스트 1번</NavLink>
                                    <NavLink className="dropdown-item" to="/test02">테스트 2번</NavLink>
                                    <NavLink className="dropdown-item" to="/test03">테스트 3번</NavLink>
                                </div>
                            </li>
                            
                            {/* 메뉴 2 */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">메뉴 2번</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/test01">테스트 1번</NavLink>
                                    <NavLink className="dropdown-item" to="/test02">테스트 2번</NavLink>
                                    <NavLink className="dropdown-item" to="/test03">테스트 3번</NavLink>
                                </div>
                            </li>

                            {/* 메뉴 3 */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">메뉴 3번</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/test01">테스트 1번</NavLink>
                                    <NavLink className="dropdown-item" to="/test02">테스트 2번</NavLink>
                                    <NavLink className="dropdown-item" to="/test03">테스트 3번</NavLink>
                                </div>
                            </li>
                        </ul>

                         {/* 이 부분을 로그인 여부에 따라 다르게 표시 */}
                         <div className="d-flex">
                         
                                <span className="me-2">
                                    로그인
                                </span>
                                /
                                <span className="ms-2">
                                   회원가입
                                </span>
                     
                            </div>
                    </div>
                </div>
            </nav>
        </>
    );

};

//export
export default Menu;
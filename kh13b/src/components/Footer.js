import { NavLink } from "react-router-dom";
import Wrapper from "./Home/Wrapper";
import footer from './Home/logo/footer.png';

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <Wrapper>

                <div className="row">
                    <div className="col-3 parent">
                        <NavLink
                         className="navbar-brand" to="/">
                            <div className='text-center'><img src={footer} style={{ width: 'auto', height: '100px' }} /></div>
                        </NavLink>
                    </div>
                    

                    <div className="col">
                        {/* 회원약관, 개인정보처리방침, 사이트맵 */}
                        <div className="row mt-3 text-start">
                            <div className="col">
                                회원약관 | 개인정보처리방침 | 사이트맵
                            </div>
                        </div>

                        {/* 주소, 대표, 사업자등록번호, 통신판매업자신고번호, 개인정보책임자 */}
                        <div className="row text-start">
                            <div className="col">
                            서울 영등포구 선유동2로 57 이레빌딩 19층 C강의장 | 대표이사 황인빈 | 사업자등록번호 000-00-00000 | 통신판매업신고번호 제1234호 | 개인정보관리 책임자 본부장 김현우
                            </div>
                        </div>

                        {/* 티켓예매문의, 공연장 문의, 공연장 광고 문의 */}
                        <div className="row my-2 text-start">
                            <div className="col">
                                티켓예매문의: 1544-9970, 공연장(시설 및 운영) 문의: 1544-9970, 공연장 광고 문의: kh13soyeon@gmail.com
                            </div>
                        </div>

                        {/* 저작권 정보 */}
                        <div className="row mb-3 text-start">
                            <div className="col">
                                Copyrightⓒ MUTIPLE All rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Footer;

import Wrapper from "./Wrapper";

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <Wrapper>
                {/* 회원약관, 개인정보처리방침, 사이트맵 */}
                <div className="row mt-3 text-start">
                    <div className="col">  
                            회원약관 | 개인정보처리방침 | 사이트맵
                    </div>
                </div>

                {/* 주소, 대표, 사업자등록번호, 통신판매업자신고번호, 개인정보책임자 */}
                <div className="row text-start">
                    <div className="col">
                        서울특별시 송파구 올림픽로 240 (잠실동) 롯데컬처웍스㈜ | 대표이사 최병환 | 사업자등록번호 313-87-00979 | 통신판매업신고번호 제1184호 | 개인정보관리 책임자 본부장 김병문
                    </div>
                </div>

                {/* 티켓예매문의, 공연장 문의, 공연장 광고 문의 */}
                <div className="row my-2 text-start">
                    <div className="col">
                        티켓예매문의: 1877-6077, 공연장(시설 및 운영) 문의: 1644-0078, 공연장 광고 문의: KIM_YG@lotte.net
                    </div>
                </div>

                {/* 저작권 정보 */}
                <div className="row mb-3 text-start">
                    <div className="col">
                        Copyrightⓒ LOTTECINEMA All rights Reserved.
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Footer;

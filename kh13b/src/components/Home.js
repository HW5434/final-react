function Home() {

    return (
        <>
            <div className='container-fluid my-5 text-center'>
                <div className='row'>
                    <div className='col-sm-10 offset-sm-1'></div>
                    <img src="http://via.placeholder.com/300x300?text=Final Project" />
                </div>
            </div>

            {/* 첫번째 줄 코드 */}
            <div class="container text-center p-4 " style={{ maxWidth: "800px" }}>
                <div class="row text-start">
                    <div class="col">
                        <label>
                            회원약관&nbsp;|&nbsp;
                            개인정보처리방침&nbsp;|&nbsp;
                            사이트맵
                        </label>
                    </div>
                </div>

                <div class="row text-start">
                    <div class="col">
                        주소
                        &nbsp;|&nbsp;
                        대표
                        &nbsp;|&nbsp;
                        사업자등록번호
                        &nbsp;|&nbsp;
                        통신판매업자신고번호
                        &nbsp;|&nbsp;
                        개인정보책임자
                    </div>
                </div>

                <div class="row text-start">
                    <div class="col">
                    <img src="http://via.placeholder.com/100x50?text=Final Project" />
                    1234-5678
                    <img  className="ms-2"src="http://via.placeholder.com/100x50?text=Final Project" />
                    1234-5678
                    <img className="ms-2" src="http://via.placeholder.com/100x50?text=Final Project"/>
                    k1h3@abcd.net
                    </div>
                </div>

                <div class="row text-start">
                    <div class="col">
                        Copyrightⓒ LOTTE CULTUREWORKS All rights Reserved. [더미]
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
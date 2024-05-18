import { Link } from "react-router-dom";
import Jumbotron from "../Jumbotron";

const ReservationFinish = () => {
    return (
        <>
            <Jumbotron title="티켓 예매 완료" />

            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">
                            <div className="row mt-4 text-center">
                                <div className="col">
                                    <h2>티켓 예매가 정상적으로 완료되었습니다</h2>
                                    <span>예매하신 티켓 정보는 마이페이지에서 확인 할 수 있습니다 감사합니다</span>
                                </div>
                            </div>

                            <div className="row mt-4 text-center">
                                <div className="col-6 ">
                                    <Link to={`/mypage/`}>
                                        <button className="btn btn-success" style={{ backgroundColor: '#681116', borderColor: '#681116' }}>
                                            <h4>예매내역 보기</h4>
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Link to={`/concert/`}>
                                        <button className="btn btn-success" style={{ backgroundColor: '#681116', borderColor: '#681116' }}>
                                            <h4>공연정보 보기</h4>
                                        </button>
                                    </Link>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>




        </>
    );
}
export default ReservationFinish;
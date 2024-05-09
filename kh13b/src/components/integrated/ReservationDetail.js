import { useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from "../utils/CustomAxios";
import { Link, useParams } from "react-router-dom";

const ReservationDetail = () => {
    const { reservationNo } = useParams();
    const [reservations, setReservations] = useState(null);


    useEffect(() => {
        const loadData = async () => {
            try {
                const resp = await axios.get(`/reservation/${reservationNo}`);
                setReservations(resp.data);
                console.log(resp.data); // 예약 상세 정보를 로그로 출력
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        loadData();
    }, [reservationNo]);

    return (
        <>
            <Jumbotron title="예매 상세 내역" />
            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {reservations && ( // reservations가 null이 아닌 경우에만 렌더링
                            <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-70 h-70">
                                <div>
                                    <ul>
                                        <li>
                                            회원 번호 : {reservations.memberNo}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            좌석 번호 : {reservations.reservationNo}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            공연 이름 : {reservations.reservationConcertTitle}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            공연 관람일자 : {reservations.reservationConcertDate}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            구매자 이름 : {reservations.reservationPersonName}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            구매자 연락처 : {reservations.reservationPersonTell}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            구매자 이메일 : {reservations.reservationPersonEmail}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            결제 금액 : {reservations.reservationPrice}
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            구매 상태 : {reservations.reservationStatus}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        <div className="d-flex justify-content-end mt-3">
                            <Link to={`/reservationList/`}>
                                <button className="btn right btn-100">
                                    돌아가기
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
};

export default ReservationDetail;

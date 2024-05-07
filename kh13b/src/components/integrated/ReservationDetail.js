import { useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from "../utils/CustomAxios";
import { useParams } from "react-router-dom";

const ReservationDetail = () => {
    const { reservationNo } = useParams();
    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const resp = await axios.get(`/reservation/${reservationNo}`);
                setReservation(resp.data);
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
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-100">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>예약 번호</th>
                                        {/* 기타 예약 상세 정보의 열 추가 */}
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {reservation && (
                                        <tr>
                                            <td>{reservation.reservationNo}</td>
                                            {/* 기타 예약 상세 정보 표시 */}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReservationDetail;

import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from "../utils/CustomAxios";
import { Link, useParams } from "react-router-dom";

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = useCallback(async () => {
        try {
            const resp = await axios.get("/reservation/");
            setReservations(resp.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }, []);

    return (
        <>
            <Jumbotron title="전체 예매내역 목록" />
            
            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-100">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>예매 번호</th>
                                        <th>예매일</th>
                                        <th>공연 정보</th>
                                        <th>예매 상태</th>
                                        <th>예매 상세 내역</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {reservations.map(reservation => (
                                        <tr key={reservation.reservationNo}>
                                            <td>{reservation.reservationNo}</td>
                                            <td>{reservation.reservationPayDate}</td>
                                            <td>{reservation.reservationConcertTitle}</td>
                                            <td>{reservation.reservationStatus}</td>
                                            <td>
                                                <Link to={`/reservationList/${reservation.reservationNo}`}>
                                                    <button className="btn btn-100">
                                                        더보기
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReservationList;
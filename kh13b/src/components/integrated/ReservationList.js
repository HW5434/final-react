import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from "../utils/CustomAxios";
import { Link } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(10); // 페이지당 항목 수
    const [count, setCount] = useState(0); // 총 페이지 수

    useEffect(() => {
        loadData();
    }, [page]);

    const loadData = useCallback(async () => {
        try {
            const resp = await axios.get("/reservation/");
            setReservations(resp.data);
            setCount(Math.ceil(resp.data.length / size)); // 총 페이지 수 계산
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }, [size]);

    const previousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1)); // 이전 페이지로 이동
    };

    const nextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, count)); // 다음 페이지로 이동
    };

    const pageChange = (pageNumber) => {
        setPage(pageNumber); // 특정 페이지로 이동
    };

    return (
        <>
            <Jumbotron title="전체 예매내역 목록" />
            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-100">
                            <table className="table text-center align-middle justify-content-end">
                                <thead>
                                    <tr>
                                        <th>예매 번호</th>
                                        <th>예매일</th>
                                        <th>공연 정보</th>
                                        <th>예매 상태</th>
                                        <th>예매 상세 내역</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center align-middle justify-content-end">
                                    {reservations.slice((page - 1) * size, page * size).map(reservation => (
                                        <tr key={reservation.reservationNo}>
                                            <td style={{ padding: '20px' }}>{reservation.reservationNo}</td>
                                            <td>{reservation.reservationPayDate}</td>
                                            <td>{reservation.reservationConcertTitle}</td>
                                            <td>{reservation.reservationStatus}</td>
                                            <td>
                                                <Link to={`/reservationList/${reservation.reservationNo}`}>
                                                    <button className="justify-content-end align-middle btn right btn-100">
                                                        더보기
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* 페이지네이션 UI */}
                            <div className="row mt-2">
                                <div className="col">
                                    <nav aria-label="...">
                                        <ul className="pagination justify-content-center">
                                            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={previousPage}>
                                                    <GrFormPrevious />
                                                </button>
                                            </li>
                                            {[...Array(count).keys()].map(pageNumber => (
                                                <li key={pageNumber + 1} className={`page-item ${page === pageNumber + 1 ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => pageChange(pageNumber + 1)}>{pageNumber + 1}</button>
                                                </li>
                                            ))}
                                            <li className={`page-item ${page === count ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={nextPage}>
                                                    <GrFormNext />
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            {/* 페이지네이션 UI 끝 */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReservationList;

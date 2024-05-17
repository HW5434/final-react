import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../../Jumbotron";
import axios from "../../utils/CustomAxios";
import { Link } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const RequestList = () => {
    const [concertRequests, setConcertRequests] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(10); // 페이지당 항목 수
    const [count, setCount] = useState(0); // 총 페이지 수

    useEffect(() => {
        loadData();
    }, [page]);

    const loadData = async () => {
        try {
            const resp = await axios.get("/concertRequest/state");
            setConcertRequests(resp.data);
            setCount(Math.ceil(resp.data.length / size)); // 총 페이지 수 계산
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
    };

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
            <Jumbotron title="승인신청" />
            <div className="container w-100 justify-content-end mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="shadow-lg p-3 my-3 bg-light rounded w-100 h-100">
                            <table className="table text-center align-middle justify-content-end">
                                <thead>
                                    <tr>
                                        <th>신청번호</th>
                                        <th>공연 이름</th>
                                        <th>대관 시작</th>
                                        <th>대관 종료</th>
                                        <th>공연시작날짜</th>
                                        <th>공연종료날짜</th>
                                        <th>승인확인</th>
                                        <th>공연 일정 등록 </th>
                                    </tr>
                                </thead>
                                <tbody className="text-center align-middle justify-content-end">
                                    {concertRequests.slice((page - 1) * size, page * size).map(ConcertRequest => (
                                        <tr key={ConcertRequest.concertRequestNo}>
                                            <td style={{ padding: '20px' }}>{ConcertRequest.concertRequestNo}</td>
                                            <td>{ConcertRequest.concertRequestConcertName}</td>
                                            <td>{formatDate(ConcertRequest.concertRequestHeadDay)}</td>
                                            <td>{formatDate(ConcertRequest.concertRequestFooterDay)}</td>
                                            <td>{formatDate(ConcertRequest.concertRequestStarthDay)}</td>
                                            <td>{formatDate(ConcertRequest.concertRequestStartfDay)}</td>
                                            <td>{ConcertRequest.concertRequestState}</td>
                                            <td>
                                                <Link to={`/requestList/${ConcertRequest.concertRequestNo}`}>
                                                    <button className="justify-content-end align-middle btn right btn-100">
                                                        등록
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

export default RequestList;

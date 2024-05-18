import { useEffect, useState } from "react";
import Jumbotron from "../../Jumbotron";
import axios from "../../utils/CustomAxios";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import ConcertRequest from "../ConcertRequest";

const ScheduleList = () => {
    const [concertSchedules, setConcertSchedules] = useState([]);
    const [castActors, setCastActors] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(10); // 페이지당 항목 수
    const [count, setCount] = useState(0); // 총 페이지 수

    useEffect(() => {
        loadData();
    }, [page]);

    const loadData = async () => {
        try {
            const schedule = await axios.get("/schedule/");
            const actor = await axios.get("/castActor/");
            setConcertSchedules(schedule.data);
            setCastActors(actor.data);
            setCount(Math.ceil(schedule.data.length / size)); // 총 페이지 수 계산
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

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        return `${hours}시 ${minutes}분`;
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
            <Jumbotron title="일정등록목록" />
            <div className="container w-100 justify-content-end mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="shadow-lg p-3 my-3 bg-light rounded w-100 h-100">
                            <table className="table text-center align-middle justify-content-end">
                                <thead>
                                    <tr>
                                        <th>공연 등록번호</th>
                                        <th>시작 날짜/시간</th>
                                        <th>종료 날짜/시간</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center align-middle justify-content-end">
                                    {concertSchedules.slice((page - 1) * size, page * size).map(concertSchedule => (
                                        <tr key={concertSchedule.concertScheduleNo}>
                                            <td style={{ padding: '20px' }}>{concertSchedule.concertScheduleNo}</td>
                                            <td>{formatDate(concertSchedule.concertScheduleStart)} {formatTime(concertSchedule.concertScheduleStart)}</td>
                                            <td>{formatDate(concertSchedule.concertScheduleEnd)} {formatTime(concertSchedule.concertScheduleEnd)}</td>
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

export default ScheduleList;

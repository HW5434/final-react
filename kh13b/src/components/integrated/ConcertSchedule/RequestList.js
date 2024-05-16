import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../../Jumbotron";
import axios from "../../utils/CustomAxios";
import Reservation from "../Reservation";
import ConcertRequest from "../ConcertRequest";
import ConcertScheduleAdd from './ConcertScheduleAdd';
import { useParams, Link, redirect } from "react-router-dom";

const RequestList = () => {
    const [concertRequests, setConcertRequests] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const resp = await axios.get("/concertRequest/state");
            setConcertRequests(resp.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    return (
        <>
            <Jumbotron title="승인된 신청 목록" />

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
                                    {concertRequests.map(ConcertRequest => (
                                        <tr key={ConcertRequest.concertRequestNo}>
                                            <td>{ConcertRequest.concertRequestNo}</td>
                                            <td>{ConcertRequest.concertRequestConcertName}</td>
                                            <td>{ConcertRequest.concertRequestHeadDay}</td>
                                            <td>{ConcertRequest.concertRequestFooterDay}</td>
                                            <td>{ConcertRequest.concertRequestStarthDay}</td>
                                            <td>{ConcertRequest.concertRequestStartfDay}</td>
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

                        </div>
                    </div>
                </div>
            </div>

        </>
    );

}
export default RequestList;

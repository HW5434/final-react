
import axios from '../../utils/CustomAxios';
import { useEffect, useState } from "react";
import Jumbotron from "../../Jumbotron";
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
// import axios from "axios";


const Approve = () => {
    //state
    const [concertRequests, setConcertRequests] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    //useCallback
    const loadData = useCallback(async () => {
        const resp = await axios.get("/concertRequest/")
        setConcertRequests(resp.data);
    }, [concertRequests])


    

    return (
        <>
            <Jumbotron title="대관신청 목록" content="승인여부" />
            {/* 대관 신청 목록 */}
            <div className='row-4'>
                <div className='col'>
                    <table className='table table-hover text-center'>
                        <thead>
                            <tr>
                                <th width="100">신청번호</th>
                                <th>공연이름</th>
                                <th>공연 시작 날짜</th>
                                <th>공연 종료 날짜</th>
                                <th>공연 승인여부</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {concertRequests.map(concertRequest => (
                                <tr key={concertRequest.concertRequestNo}>
                                    <td>{concertRequest.concertRequestNo}</td>
                                    <td>{concertRequest.concertRequestConcertName}</td>
                                    <td>{concertRequest.concertRequestStarthDay}</td>
                                    <td>{concertRequest.concertRequestStartfDay}</td>
                                    <td >
                                        <Link to={`/approve/${concertRequest.concertRequestNo}`}>
                                        {concertRequest.concertRequestState}
                                        </Link>
                                    </td>
                                </tr>
                            ))};
                        </tbody>
                    </table>
            </div>
        </div >


        </>
    );
};
export default Approve;
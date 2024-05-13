
import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../../Jumbotron";
import axios from '../../utils/CustomAxios';
import { useParams, Link, redirect } from "react-router-dom";
import ConcertRequest from './../ConcertRequest';
import { Modal } from 'bootstrap';
import { IoIosSave } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from "react-datepicker";


const RequestDetail = () => {
    const { concertRequestNo } = useParams();
    const [concertRequests, setConcertRequests] = useState({});
    const [confirmApproval, setConfirmApproval] = useState(false);


    useEffect(() => {
        loadData();
    }, [concertRequestNo]);

    const loadData = useCallback(async () => {
        try {
            const resp = await axios.get(`concertRequest/${concertRequestNo}`);
            setConcertRequests(resp.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }, [concertRequestNo]);

    //승인
    const handleApproval = useCallback(async () => {
        setConfirmApproval(true);
    }, []);

    //승인
    const approveState = useCallback(async (confirmation) => {
        if (confirmation) {
            try {
                const choice = window.confirm("승인하시겠습니까?");
                if (choice === false) {

                    handleCancel();
                    return;
                }
                    
                // PATCH 요청을 보내어 데이터를 업데이트합니다.
                await axios.patch(`/concertRequest/${concertRequestNo}`, { concertRequestState: 'y' });
                // 데이터를 다시 불러옵니다.
                loadData();

            } catch (error) {
                console.error("Error updating data:", error);
            }
        }
        setConfirmApproval(false);
    }, [concertRequestNo, loadData]);

    const handleCancel = useCallback(() => {
        // 이전 페이지로 이동합니다.
        window.history.back();
    }, []);


    return (
        <>
            <Jumbotron title="대관신청 상세" />
            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-100">
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>신청 번호</th>
                                        <th>단체명</th>
                                        <th>사업자등록번호</th>
                                        <th>대표자</th>
                                        <th>담당자</th>
                                        <th>주소</th>
                                        <th>직장번호</th>
                                        <th>휴대폰번호</th>
                                        <th>이메일</th>
                                        <th>팩스</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>{concertRequests.concertRequestNo}</td>
                                        <td>{concertRequests.concertRequestCompanyName}</td>
                                        <td>{concertRequests.concertRequestCompanyNumber}</td>
                                        <td>{concertRequests.concertRequestRepresentative}</td>
                                        <td>{concertRequests.concertRequestManager}</td>
                                        <td>{concertRequests.concertRequestAddress}</td>
                                        <td>{concertRequests.concertRequestOfficeNumber}</td>
                                        <td>{concertRequests.concertRequestPhoneNumber}</td>
                                        <td>{concertRequests.concertRequestEmail}</td>
                                        <td>{concertRequests.concertRequestFax}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>공연이름</th>
                                        <th>공연장르</th>
                                        <th>관람연령</th>
                                        <th>러닝타임1막</th>
                                        <th>인터미션</th>
                                        <th>러닝타임2막</th>
                                        <th>총대관시작일</th>
                                        <th>총대관종료일</th>
                                        <th>준비대관시작일</th>
                                        <th>준비대관종료일</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>{concertRequests.concertRequestConcertName}</td>
                                        <td>{concertRequests.concertRequestConcertGenre}</td>
                                        <td>{concertRequests.concertRequestAge}</td>
                                        <td>{concertRequests.concertRequestRuntimeFirst}</td>
                                        <td>{concertRequests.concert_request_intermission}</td>
                                        <td>{concertRequests.concertRequestRuntimeSecond}</td>
                                        <td>{concertRequests.concertRequestHeadDay}</td>
                                        <td>{concertRequests.concertRequestFooterDay}</td>
                                        <td>{concertRequests.concertRequestReadyhDay}</td>
                                        <td>{concertRequests.concertRequestReadyfDay}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th>공연대관시작일</th>
                                        <th>공열대관종료일</th>
                                        <th>철수대관시작일</th>
                                        <th>철수대관종료일</th>
                                        <th>좌석VIP</th>
                                        <th>좌석R</th>
                                        <th>좌석S</th>
                                        <th>좌석A</th>
                                        <th>승인여부</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr>
                                        <td>{concertRequests.concertRequestStarthDay}</td>
                                        <td>{concertRequests.concertRequestStartfDay}</td>
                                        <td>{concertRequests.concertRequestWithdrawhDay}</td>
                                        <td>{concertRequests.concertRequestWithdrawfDay}</td>
                                        <td>{concertRequests.concertRequestSeatvip}</td>
                                        <td>{concertRequests.concertRequestSeatr}</td>
                                        <td>{concertRequests.concertRequestSeats}</td>
                                        <td>{concertRequests.concertRequestSeata}</td>
                                        <td>{concertRequests.concertRequestState}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <div className="text-center mt-3">
                                    <Link to={`/requestList`}>
                                        <button className="btn btn-success" onClick={approveState}>
                                            승인
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div >
                </div>
            </div>
        </>
    );
};
export default RequestDetail;
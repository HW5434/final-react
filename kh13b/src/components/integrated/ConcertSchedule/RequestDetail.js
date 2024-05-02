
import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../../Jumbotron";
import axios from '../../utils/CustomAxios';
import { useParams, Link } from "react-router-dom";
import ConcertRequest from './../ConcertRequest';


const RequestDetail = () => {
    const { concertRequestNo } = useParams();
    const [concertRequests, setConcertRequests] = useState({});
    const [input, setInput] = useState({
        concertRequestState: "y" // 기본값은 'y'로 설정합니다.
    });

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

    const approveState = useCallback(async () => {
        // concertRequestState 값을 'Y'로 변경하여 업데이트합니다.
        const updatedInput = { ...input, concertRequestState: 'y' };

        try {
            // PATCH 요청을 보내어 데이터를 업데이트합니다.
            const resp = await axios.patch(`/concertRequest/${concertRequestNo}`, updatedInput);
            // 데이터를 다시 불러옵니다.
            loadData();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }, [input, concertRequestNo, loadData]);




    return (
        <>
            <Jumbotron title="대관신청 상세" />
            <div className="container mt-4 ms-3">
                <div className="row">
                    <div className="col text-end me-3">
                        <div className="col-md-9">
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
                                <button className="btn btn-success" onClick={approveState}>
                                    승인<Link to={`/approve/${concertRequests.concertRequestNo}`}>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </>
    );
};
export default RequestDetail;
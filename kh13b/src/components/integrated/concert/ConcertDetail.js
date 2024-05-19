import Jumbotron from "../../Jumbotron";
import { useState, useEffect, useCallback } from 'react';
import axios from '../../utils/CustomAxios';
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoTicket } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import ConcertScheduleInfo from "./ConcertScheduleInfo"; // 일정 목록 컴포넌트 import
import { FaGreaterThan } from "react-icons/fa";


const ConcertDetail = () => {
    const { concertNo } = useParams();

    //const history = useHistory();
    //const { isAuthenticated } = useAuth();
    const navigator = useNavigate();
    const [concert, setConcert] = useState({});
    const [actors, setActors] = useState([]);
    const [concertImage, setConcertImage] = useState();
    const [showSchedule, setShowSchedule] = useState(false);

    useEffect(() => {
        loadData();
    }, [concertNo]);

    const loadData = useCallback(async () => {
        const resp = await axios.get(`/concertRequest/${concertNo}/actors`);
        const ImageResp = await axios.get(`/concertRequest/getAttach/${concertNo}`, {
            responseType: 'arraybuffer',
        });
        const base64 = btoa(
            new Uint8Array(ImageResp.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );
        setConcert(resp.data.concertRequestDto);
        setActors(resp.data.listActorDto);
        setConcertImage(base64);
    }, [concertNo]);

    const formatDate = (dateString) => {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dayOfWeek = daysOfWeek[date.getDay()];
        return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
    }

    // 일정 및 출연진 정보 토글 함수
    const toggleSchedule = () => {
        setShowSchedule(prevState => !prevState);
    };

    const handleTicketReservation = () => {
        const token = localStorage.getItem('refreshToken');
        if (!token) {
            if (window.confirm("티켓 예매는 로그인 후 이용가능합니다. 로그인하시겠습니까?")) {
                navigator('/login');
            }
        } else {
            navigator(`/reservation/${concertNo}`);
        }
    };

    return (
        <>
            <Jumbotron title="공연 상세" />

            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-100">

                            <div className="row mt-5">
                                <div className="col-md-3">
                                    <div>
                                        <img src={`data:image/;base64,${concertImage}`} className="card-img" alt="뮤지컬 포스터" style={{ height: "500px", overflow: "hidden" }} />
                                    </div>
                                    <div className="text-center mt-4 mb-4">
                                        <button className="btn btn-success"
                                            style={{ backgroundColor: '#681116', borderColor: '#681116' }}
                                            onClick={handleTicketReservation}>
                                            <IoTicket />&nbsp;&nbsp;티켓예매
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div>
                                        <h3><strong>&nbsp;{concert.concertRequestConcertName}</strong></h3>
                                        <hr style={{ color: '#681116' ,borderWidth: '2px',}} />

                                        <p><strong><strong style={{ color: '#681116CC' }}><FaGreaterThan /></strong>&nbsp;공연 일정: </strong> {formatDate(concert.concertRequestStarthDay)} ~ {formatDate(concert.concertRequestStartfDay)}</p>
                                        <p><strong><strong style={{ color: '#681116CC' }}><FaGreaterThan /></strong>&nbsp;공연 장르: </strong>{concert.concertRequestConcertGenre}</p>
                                        <p><strong><strong style={{ color: '#681116CC' }}><FaGreaterThan /></strong>&nbsp;출연: </strong>
                                            {actors.map((actor, index) => (
                                                <span key={index}>
                                                    {index > 0 && ', '}
                                                    {actor.actorName}
                                                </span>
                                            ))}
                                        </p>
                                        <p><strong style={{ color: '#681116CC' }}><FaGreaterThan /></strong><strong>&nbsp;티켓 가격: </strong> VIP석 {concert.concertRequestSeatvip}원 | R석 {concert.concertRequestSeatr}원 | S석 {concert.concertRequestSeats}원 | A석 {concert.concertRequestSeata}원</p>
                                        <p><strong><strong style={{ color: '#681116CC' }}><FaGreaterThan /></strong>&nbsp;관람 연령: </strong> {concert.concertRequestAge}</p>
                                        <p><strong><strong style={{ color: '#681116CC' }}><FaGreaterThan /></strong>&nbsp;러닝 타임 1막: </strong> {concert.concertRequestRuntimeFirst}분</p>
                                        <p><strong><strong style={{ color: '#681116CC' }}><FaGreaterThan /></strong>&nbsp;인터미션: </strong> {concert.concertRequestIntermission}분</p>
                                        <p><strong><strong style={{ color: '#681116CC' }}><FaGreaterThan /></strong>&nbsp;러닝 타임 2막: </strong> {concert.concertRequestRuntimeSecond}분</p>
                                        <p><strong><strong style={{ color: '#681116CC' }}><FaGreaterThan /></strong>&nbsp;제작:</strong>  {concert.concertRequestCompanyName}</p>
                                        <p><strong><strong style={{ color: '#681116CC' }}><FaGreaterThan /></strong>&nbsp;공연 문의:</strong> {concert.concertRequestOfficeNumber}</p>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ color: '#681116' ,borderWidth: '2px',}} />
                            <div className="row mt-4">
                                <div className="col">
                                    <div>
                                        <button className="btn btn-success" style={{ backgroundColor: '#681116', borderColor: '#681116' }} onClick={toggleSchedule}>
                                            <FaRegCalendarCheck />
                                            &nbsp;&nbsp;공연 일정
                                        </button>
                                        {showSchedule && (
                                            <ConcertScheduleInfo concertNo={concertNo} /> // 일정 목록 컴포넌트 추가
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* <div style={{ marginBottom: "200px" }}></div> */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConcertDetail;

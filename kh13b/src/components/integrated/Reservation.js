import { useState, useEffect, useCallback, useMemo } from 'react';
import { useMatch, useParams } from "react-router-dom";
//import { FaCreditCard } from "react-icons/fa";
import Jumbotron from '../Jumbotron';
import axios from '../utils/CustomAxios';

import { SeatGroup } from "hacademy-cinema-seat";


const Reservation = () => {
    //**예약 등록에대한 state가 제일 중요하겠지..
    // const [reservation, setReservation] = useState([]);
    const [inputReservation, setInputReservation] = useState({
        reservationNo: "",//예매 번호
        memberNo: "",//회원번호
        concertScheduleNo: "",//공연일정번호
        seatNo: "",//좌석 식별자
        reservationConcertTitle: "",//공연 이름
        reservationConcertDate: "",//공연관람일자
        reservationPrice: "",//결제금액
        reservationPayDate: "",//예매/결제 일시
        reservationPersonName: "",//구매자 이름
        reservationPersonTell: "",//구매자 연락처
        reservationPersonEmail: "",//구매자 이메일
        reservationStatus: ""//구매상태
    });

    const { concertNo } = useParams();
    const [concert, setConcert] = useState({});

    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const [seats, setSeats] = useState([]);
    const [showSeatSelection, setShowSeatSelection] = useState(false);

    const [selectedSeats, setSelectedSeats] = useState([]); // 선택한 좌석들을 기록하는 상태 변수
    const [totalPrice, setTotalPrice] = useState(0); // 총 가격을 기록하는 상태 변수

    //공연 정보 불러오기
    useEffect(() => {
        loadConcert();
    }, [concertNo]);

    const loadConcert = async () => {
        try {
            const resp = await axios.get(`/concertRequest/${concertNo}`);
            setConcert(resp.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    //공연번호에 따른 공연 일정 불러오기
    useEffect(() => {
        loadSchedules();
    }, [concertNo]);

    const loadSchedules = async () => {
        try {
            const resp = await axios.get(`/reservation/${concertNo}/byConcertRequestNo`);
            setSchedules(resp.data);
        } catch (error) {
            console.error("Error loading schedules:", error);
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
        return `${hours}:${minutes}`;
    };
    const handleScheduleSelection = async (schedule) => {
        // 이미 선택된 일정을 클릭했을 때 선택 해제
        if (selectedSchedule === schedule) {
            setSelectedSchedule(null);
            setShowSeatSelection(false); // 선택 해제되면 좌석 선택 창 닫기
        } else {
            // 다른 일정을 선택했을 때 선택된 일정 설정
            setSelectedSchedule(schedule);
            setShowSeatSelection(true);
            try {
                const resp = await axios.get(`/reservation/${schedule.concertScheduleNo}/seat`);
                //서버에서 보내준 Y/N 을 true/false로 바꿔주기 바꾸고 setSeats에 concert 넣어주기
                const convert = resp.data.map(seat => {
                    //console.log(seat);
                    return {
                        ...seat,
                        "reservationStatus": seat.reservationStatus === "Y" ? true : false
                    }
                });
                setSeats(convert);
            } catch (error) {
                console.error("Error loading seats:", error);
            }
        }
    };
    useEffect(() => {
        if (selectedSchedule) {
            const formattedDate = formatDate(selectedSchedule.concertScheduleStart);
            const formattedStartTime = formatTime(selectedSchedule.concertScheduleStart);
            const formattedEndTime = formatTime(selectedSchedule.concertScheduleEnd);
            const concertDateTime = `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`;
            setInputReservation(prevState => ({
                ...prevState,
                reservationConcertDate: concertDateTime
            }));
        }
    }, [selectedSchedule]);
    //좌석 목록 불러오기
    // useEffect(() => {
    //     loadSeat();
    // }, []);

    // const loadSeat = useCallback(async () => {
    //     console.log(selectedSeats);
    //     if(selectedSchedule === null) return;
    //     try {
    //         const resp = await axios.get(`/reservation/${selectedSchedule.concertScheduleNo}/seat`);
    //         setSeats(resp.data);
    //     } catch (error) {
    //         console.error("Error loading seats:", error);
    //     }
    // }, [selectedSchedule]);





    //seats에 변화가 생기면 체크된 좌석을 계산 (useMemo)
    const checkedSeats = useMemo(() => {
        //seats에서 체크된 좌석(seat.seatChecked === true)만 반환하되
        //줄이 같으면 칸이 작은것을 먼저 반환하고, 줄이 다르면 줄이 작은것을 먼저 반환하세요
        return seats.filter(seat => seat.seatChecked === true)
            .sort((a, b) => a.seatCol === b.seatCol ? a.seatRow - b.seatRow : a.seatCol - b.seatCol);
    }, [seats]);
    //console.log(checkedSeats);

    // 선택된 좌석의 가격 합산하여 총 가격 계산  -- 다시
    useEffect(() => {
        if (checkedSeats.length > 0) {
            let totalPrice = 0;
            checkedSeats.forEach(checkedSeat => {
                switch (checkedSeat.seatLevel) {
                    case 'VIP':
                        totalPrice += concert.concertRequestSeatvip;
                        break;
                    case 'R':
                        totalPrice += concert.concertRequestSeatr;
                        break;
                    case 'S':
                        totalPrice += concert.concertRequestSeats;
                        break;
                    case 'A':
                        totalPrice += concert.concertRequestSeata;
                        break;
                    default:
                        break;
                }
            });
            setTotalPrice(totalPrice);
        } else {
            setTotalPrice(0); // 선택한 좌석이 없을 때 총 가격을 0으로 설정
        }
    }, [checkedSeats, concert]); // concert 상태 추가
    const getSeatPrice = (seatLevel) => {
        switch (seatLevel) {
            case 'VIP':
                return concert.concertRequestSeatvip;
            case 'R':
                return concert.concertRequestSeatr;
            case 'S':
                return concert.concertRequestSeats;
            case 'A':
                return concert.concertRequestSeata;
            default:
                return 0; // 기본적으로 가격을 0으로 설정
        }
    };

    return (
        <>
            <Jumbotron title="티켓 예매" />

            <div className="row mt-4">
                <div className="col text-center">
                    <h3>뮤지컬*{concert.concertRequestConcertName}*뮤티플</h3>
                </div>
            </div>
            {/* 일정 목록 출력 */}
            <div className="row mt-4">
                <div className="col">
                    <h2>일정 선택</h2>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>날짜</th>
                                <th>시간</th>
                                <th>선택</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedules.map(schedule => (
                                <tr key={schedules.concertScheduleNo} className="text-center">
                                    <td>{formatDate(schedule.concertScheduleStart)}</td>
                                    <td>{formatTime(schedule.concertScheduleStart)} - {formatTime(schedule.concertScheduleEnd)}</td>

                                    <td>
                                        <input type="checkbox" onChange={() => handleScheduleSelection(schedule)}
                                            checked={selectedSchedule === schedule} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* 선택한 일정 표시 */}
            {selectedSchedule && (
                <div className="row mt-4">
                    <div className="col">
                        <h4>선택한 일정</h4>
                        <p>{formatDate(selectedSchedule.concertScheduleStart)} - {formatTime(selectedSchedule.concertScheduleStart)} ~ {formatTime(selectedSchedule.concertScheduleEnd)}</p>
                        <p>{selectedSchedule.concertScheduleNo}</p>
                    </div>
                    <hr />
                </div>
            )}
            {/* 좌석 출력 */}
            {showSeatSelection && (
                <div>
                    <div className="row mt-4">
                        <div className="col">
                            <h2>좌석 선택</h2>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col" >
                            <h4>좌석 등급별 가격</h4>
                            <ul>
                                <li>VIP석 : {concert.concertRequestSeatvip}원</li>
                                <li>R석 : {concert.concertRequestSeatr}원</li>
                                <li>S석 : {concert.concertRequestSeats}원</li>
                                <li>A석 : {concert.concertRequestSeata}원</li>
                            </ul>
                        </div>
                    </div>
                    <div className="container w-100">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">
                                    <div className='row mt-4'>
                                        <div className='col'>
                                            <SeatGroup
                                                map={seats}
                                                setMap={setSeats}
                                                fields={{
                                                    no: 'seatNo',
                                                    row: 'seatCol',
                                                    col: 'seatRow',
                                                    grade: 'seatLevel',
                                                    reserved: 'reservationStatus',//예약 되어있는지 안되어있는지..true일 경우 예매 불가
                                                    disabled: 'seatDisabled',
                                                    checked: 'seatChecked',
                                                }}
                                                rows={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                                cols={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                                showNames

                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 선택한 좌석과 가격 표시 */}
                                <div className="row mt-4">
                                    <div className="col">
                                        <h4>선택한 좌석과 가격</h4>
                                        <ul>
                                            {checkedSeats.map(seat => (
                                                <li key={seat.seatNo}>
                                                    좌석 :{seat.seatNo} |
                                                    좌석 위치 : {seat.seatCol}-{seat.seatRow}|
                                                    등급:{seat.seatLevel}/
                                                    가격: {getSeatPrice(seat.seatLevel)}원
                                                    {seat.seatLevel}석 {seat.seatCol}-{seat.seatRow}번
                                                </li>
                                            ))}
                                            <li>총 가격: {totalPrice}원</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 예매 정보 확인 창/주문자 정보 입력 */}
            <div className="row">
                <div className="row mt-4">
                    <div className="col">
                        <label>공연관람일자</label>
                        <input type="text" name="reservationConcertDate" value={inputReservation.reservationConcertDate} className="form-control" />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <label>좌석</label>
                        <input type="text" name="seatNo" value={inputReservation.seatNo} className="form-control" />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <label>티켓금액</label>
                        <input type="text" name="reservationPrice" value={inputReservation.reservationPrice} className="form-control" />
                    </div>
                </div>

            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>이름*</label>
                    <input type="text" name="reservationPersonName" value={inputReservation.reservationPersonName} className="form-control" />
                </div>
                <div className="col">
                    <label>휴대폰번호*</label>
                    <input type="text" name="reservationPersonTell" value={inputReservation.reservationPersonTell} className="form-control" />
                </div>
                <div className="col">
                    <label>이메일</label>
                    <input type="text" name="reservationPersonEmail" value={inputReservation.reservationPersonEmail} className="form-control" />
                </div>
            </div>
        </>
    );
}
export default Reservation;
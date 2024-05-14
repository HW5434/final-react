import { useState, useEffect, useCallback, useMemo } from 'react';
import { useMatch, useParams } from "react-router-dom";
//import { FaCreditCard } from "react-icons/fa";
import Jumbotron from '../Jumbotron';
import axios from '../utils/CustomAxios';
import { useNavigate } from "react-router-dom";

import { useRecoilState } from 'recoil';
import { partnerOrderId, partnerUserId, tid, vo, pgToken } from "../utils/RecoilData";
//import { useRecoilState} from "../utils/RecoilData";

import { SeatGroup } from "hacademy-cinema-seat";
//react-datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
//import { ko } from "date-fns/esm/locale";

const Reservation = () => {
    //**예약 등록에대한 state가 제일 중요하겠지..
    // const [reservation, setReservation] = useState([]);
    const [inputReservation, setInputReservation] = useState({
        //reservationNo: "",//예매 번호
        //memberNo: "",//회원번호
        concertScheduleNo: "",//공연일정번호 - selectedSchedule.concertScheduleNo
        seatNo: "",//좌석 식별자 --배열로 저장?
        reservationConcertTitle: "",//공연 이름 - concert.concertRequestConcertName
        reservationConcertDate: "",//공연관람일자 - selectedSchedule.concertScheduleStart
        reservationPrice: "",//결제금액
        //reservationPayDate: "",//예매/결제 일시-결제 시 sysdate?
        reservationPersonName: "",//구매자 이름-직접 입력
        reservationPersonTell: "",//구매자 연락처-직접입력
        reservationPersonEmail: "",//구매자 이메일-직접입력
        //reservationStatus: ""//구매상태
    });

    const { concertNo } = useParams();
    const [concert, setConcert] = useState({});

    //날짜 선택하기-데이트피커
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const [seats, setSeats] = useState([]);
    const [showSeatSelection, setShowSeatSelection] = useState(false);
    // 선택한 좌석의 가격을 추적하는 상태 변수
    const [selectedSeatPrice, setSelectedSeatPrice] = useState(0);
    // 선택한 좌석과 가격을 추적하는 상태 변수
    const [selectedSeatsInfo, setSelectedSeatsInfo] = useState([]);

    const [selectedSeats, setSelectedSeats] = useState([]); // 선택한 좌석들을 기록하는 상태 변수--배열로 저장..!
    const [totalPrice, setTotalPrice] = useState(0); // 총 가격을 기록하는 상태 변수
    const [showOrderForm, setShowOrderForm] = useState(false); // 주문자 정보 입력 폼 보여줄지 여부
    const [reservationPrices, setReservationPrices] = useState([]);


    //데이트피커
    //const [startDate, setStartDate] = useState(new Date());

    //카카오 결제
    const [reservationPartnerOrderId, setReservationPartnerOrderId] = useRecoilState(partnerOrderId);
    const [reservationPartnerUserId, setReservationPartnerUserId] = useRecoilState(partnerUserId);
    const [reservationTid, setReservationTid] = useRecoilState(tid);
    const [reservationVo, setReservationVo] = useRecoilState(vo);

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
    }, [concertNo, selectedDate]);

    const loadSchedules = async () => {
        try {
            // 날짜를 ISO 형식으로 변환하지 않고, 직접 원하는 형식으로 포맷하여 URL에 추가
            const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')
                }-${String(selectedDate.getDate()).padStart(2, '0')}`;
            const resp = await axios.get(`/reservation/concertRequestNo/${concertNo}/concertScheduleStart/${formattedDate}`);
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
        return `${hours}시 ${minutes}분`;
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
            setInputReservation(prevState => ({//예약에 필요한 정보 넣어주기
                ...prevState,
                reservationConcertDate: selectedSchedule.concertScheduleStart,
                concertScheduleNo: selectedSchedule.concertScheduleNo,
                reservationConcertTitle: concert.concertRequestConcertName
            }));
        }
    }, [selectedSchedule, concert]);

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

    // 좌석 선택이 변경될 때마다 선택한 좌석과 가격을 업데이트
    useEffect(() => {
        if (checkedSeats.length > 0) {
            const selectedSeatsInfo = checkedSeats.map(seat => ({
                seatNo: seat.seatNo,
                seatLevel: seat.seatLevel,
                seatPrice: getSeatPrice(seat.seatLevel)
            }));
            setSelectedSeatsInfo(selectedSeatsInfo);
        }
    }, [checkedSeats, concert]); // concert 추가

    // 선택한 좌석의 가격을 예약 정보에 저장
    useEffect(() => {
        setInputReservation(prevState => ({
            ...prevState,
            reservationPrice: selectedSeatPrice // 선택한 좌석의 가격을 예약 가격으로 저장
        }));
    }, [selectedSeatPrice]);

    //**예약 등록
    const changeInputReservation = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputReservation({
            ...inputReservation,
            [name]: value
        });
    }, [inputReservation]);

    // 좌석 선택이 변경될 때마다 선택한 좌석과 가격을 업데이트
    useEffect(() => {
        if (checkedSeats.length > 0) {
            const prices = checkedSeats.map(seat => getSeatPrice(seat.seatLevel)); // 선택한 좌석들의 가격 배열
            setReservationPrices(prices); // 예약 가격 배열 업데이트
        } else {
            setReservationPrices([]); // 선택한 좌석이 없을 때 예약 가격 배열 초기화
        }
    }, [checkedSeats, concert]);

    // 선택한 좌석의 가격을 예약 정보에 저장
    useEffect(() => {
        setInputReservation(prevState => ({
            ...prevState,
            reservationPrice: reservationPrices // 선택한 좌석들의 가격 배열을 예약 정보에 저장
        }));
    }, [reservationPrices]);

    // 좌석 선택이 변경될 때마다 주문자 정보 입력 폼 보여주기
    useEffect(() => {
        if (checkedSeats.length > 0) {
            setShowOrderForm(true);
        } else {
            setShowOrderForm(false);
        }
    }, [checkedSeats]);

    //굳이 필요 없는 코드
    // useEffect(() => {
    //     // selectedSchedule이 존재하고 선택된 좌석이 있다면 concertScheduleNo와 seatNo를 추출하여 items state에 설정
    //     if (selectedSchedule && checkedSeats.length > 0) {
    //         const newPurchaseList = checkedSeats.map(seat => ({
    //             concertScheduleNo: selectedSchedule.concertScheduleNo,
    //             seatNo: seat.seatNo
    //         }));
    //         // 추출한 데이터를 구매 state에 설정
    //         setPurchaseList(newPurchaseList);
    //     }
    // }, [selectedSchedule, checkedSeats]);


    //카카오페이 결제--------------------------------------------------------------
    //let dataList;
    // const kakaopay = useCallback(() => {
    //     purchase(); //구매 비동기 함수... 
    // }, []);

    // const purchase = useCallback(async () => {
    //     //purchaseList 자리에 들어갈 데이터를 계산하는 코드
    //     const seatNumbers = checkedSeats.map(seat => seat.seatNo);
    //     console.log(seatNumbers);
    //     console.log(inputReservation);
    //     const data = {
    //         // concertScheduleNo : selectedSchedule.concertScheduleNo,//읽을 수 없다
    //         concertScheduleNo: inputReservation.concertScheduleNo,
    //         // seatNo : [ selectedSeatsInfo.seatNo ]
    //         // seatNo : checkedSeats.map(seat => seat.seatNo)
    //         //seatNo : [checkedSeats.seatNo]
    //         seatNo: seatNumbers


    //     };


    //     const resp = await axios.post("/kakaopay/purchase", data);
    //     //useState에 필요한 데이터 저장
    //     setReservationPartnerOrderId(resp.data.partnerOrderId);
    //     setReservationPartnerUserId(resp.data.partnerUserId);
    //     setReservationTid(resp.data.tid);
    //     setReservationVo(resp.data.vo);
    //     //새 창을 열고 결제 프로세스 시작
    //     window.open(resp.data.nextRedirectPcUrl, "_blank", "width=400px, height=800px");
    // });

    // const purchaseApprove = useCallback(async (pgToken) => {
    //     //console.log("결제 성공");
    //     const postData = {
    //         reservationPartnerOrderId,
    //         reservationPartnerUserId,
    //         reservationTid,
    //         pgToken,
    //         //data
    //     };
    //     try {
    //         const resp = await axios.post("/purchase/success", postData);
    //         // Assuming these are state-setting functions
    //         setReservationPartnerOrderId("");
    //         setReservationPartnerUserId("");
    //         setReservationTid("");
    //         setReservationVo("");
    //         //navigate('/purchase/success-complete');
    //     } catch (error) {
    //         console.error("Error processing purchase:", error);
    //     }

    // });

    // useEffect(() => {
    //     const handleMessage = (e) => {
    //         if (e.data.type && e.data.type === 'successComplete') {
    //             purchaseApprove(e.data.pgToken);
    //         }
    //     };
    //     window.addEventListener('message', handleMessage);
    //     return () => {
    //         window.removeEventListener('message', handleMessage);
    //     }
    // }, [purchaseApprove]);







    //==============================================================================
    //navigator
    const navigator = useNavigate();
    //--saveInputReservation에서 카카오 페이까지 다 처리할 수 있게끔 구현,,!
    const saveInputReservation = useCallback(async () => {
        try {
            const seatNumbers = checkedSeats.map(seat => seat.seatNo); // 선택한 좌석들의 번호 배열
    
            // 카카오페이 처리
            const purchaseResponse = await kakaopay(); // 카카오페이 처리
    
            // 예약 등록
            const resp = await axios.post("/reservation/", {
                ...inputReservation,
                seatNo: seatNumbers, // 선택한 좌석들의 번호 배열 추가
            });
    
            clearInputReservation();
            // 예약 등록 후 필요한 작업 수행 (예: 페이지 이동, 알림 등)
            navigator("/ReservationFinish/");
        } catch (error) {
            console.error("Error creating reservation:", error);
        }
    }, [inputReservation]);
    
    const kakaopay = useCallback(async () => {
        try {
            const seatNumbers = checkedSeats.map(seat => seat.seatNo);
            const data = {
                concertScheduleNo: inputReservation.concertScheduleNo,
                seatNo: seatNumbers
            };
    
            const resp = await axios.post("/kakaopay/purchase", data);
    
            // useState에 필요한 데이터 저장
            setReservationPartnerOrderId(resp.data.partnerOrderId);
            setReservationPartnerUserId(resp.data.partnerUserId);
            setReservationTid(resp.data.tid);
            setReservationVo(resp.data.vo);
    
            // 새 창을 열고 결제 프로세스 시작
            window.open(resp.data.nextRedirectPcUrl, "_blank", "width=400px, height=800px");
            return resp; // 결제 결과 반환
        } catch (error) {
            console.error("Error processing kakaopay:", error);
            throw error; // 예외를 상위로 다시 던져 처리
        }
    }, [checkedSeats, inputReservation]);
    
    // purchaseApprove 및 useEffect는 이전과 동일하게 유지됩니다.

    const cancelInputReservation = useCallback(() => {
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if (choice === false) return;
        clearInputReservation();
    }, [inputReservation]);

    const clearInputReservation = useCallback(() => {
        setInputReservation({
            reservationNo: "",//예매 번호
            memberNo: "",//회원번호
            concertScheduleNo: "",//공연일정번호 - selectedSchedule.concertScheduleNo
            seatNo: "",//좌석 식별자 --배열로 저장?
            reservationConcertTitle: "",//공연 이름 - concert.concertRequestConcertName
            reservationConcertDate: "",//공연관람일자 - selectedSchedule.concertScheduleStart
            reservationPrice: "",//결제금액
            reservationPayDate: "",//예매/결제 일시-결제 시 sysdate?
            reservationPersonName: "",//구매자 이름-직접 입력
            reservationPersonTell: "",//구매자 연락처-직접입력
            reservationPersonEmail: "",//구매자 이메일-직접입력
            //reservationStatus: ""//구매상태
        });
    }, [inputReservation]);

    return (
        <>
            <Jumbotron title="티켓 예매" />

            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">
                            <div className="row mt-2">
                                <div className="col text-center">
                                    <h4><span>뮤지컬*{concert.concertRequestConcertName}*MUTIPLE</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* 일정 목록 출력 */}
            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">

                            <div className="row mt-4">
                                {/* <div className="col">
                                    <h2>일정 선택</h2>
                                </div> */}
                            </div>
                            {/* 일정 선택 datepicker */}
                            <div className="row">
                                <div className="col-6">
                                    <h4><span>날짜 선택</span></h4>
                                    <hr />
                                    <DatePicker
                                        //locale={ko}                   // 한글로 변경
                                        selected={selectedDate}
                                        onChange={date => setSelectedDate(date)}
                                        showPopperArrow={false}
                                        minDate={new Date()}//오늘 날짜 전은 선택 못하게
                                        //open
                                        dateFormat="yyyy-MM-dd"
                                        customInput={            // 날짜 뜨는 인풋 커스텀
                                            <Form.Control as="textarea" rows={1} style={{ width: "250px" }} />
                                        }
                                    />
                                </div>
                                <div className="col-6">
                                    <h4><span>시간 선택</span></h4>
                                    <hr />
                                    {schedules.length === 0 && <p>선택하신 날짜에 일정이 존재하지 않습니다</p>}
                                    {schedules.length > 0 && (
                                        <table className="table table-hover table-borderless">
                                            <tbody>
                                                {schedules.map(schedule => (
                                                    <tr key={schedule.concertScheduleNo} className="text-center">
                                                        <td>{formatTime(schedule.concertScheduleStart)}</td>
                                                        <td>
                                                            <input type="checkbox" onChange={() => handleScheduleSelection(schedule)} checked={selectedSchedule === schedule} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* 선택한 일정 표시 */}
            {selectedSchedule && (
                <div className="container w-100">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">

                                <div className="row mt-4">
                                    <div className="col">
                                        <h4><span>선택한 일정</span></h4>
                                        <hr />
                                        <p>{formatDate(selectedSchedule.concertScheduleStart)}  {formatTime(selectedSchedule.concertScheduleStart)} ~ {formatTime(selectedSchedule.concertScheduleEnd)}</p>
                                        {/* <p>{selectedSchedule.concertScheduleNo}</p> */}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 좌석 출력 */}
            {showSeatSelection && (
                <>

                    <div className="container w-100">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">

                                    <div className="row mt-4">
                                        <div className="col" >
                                            <h4><span>좌석 등급별 가격</span></h4>
                                            <hr />
                                            <table className="table text-center">
                                                <tbody>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bold' }}>VIP석</td>
                                                        <td>{concert.concertRequestSeatvip}원</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bold' }}>R석</td>
                                                        <td>{concert.concertRequestSeatr}원</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bold' }}>S석</td>
                                                        <td>{concert.concertRequestSeats}원</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ fontWeight: 'bold' }}>A석</td>
                                                        <td>{concert.concertRequestSeata}원</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="container w-100">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">

                                    <div className="row mt-4">
                                        <div className="col">
                                            <h4><span>좌석선택</span></h4>
                                            <hr />
                                        </div>
                                    </div>

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
                            </div>
                        </div>
                    </div>

                    {/* 선택한 좌석과 가격 표시 */}
                    <div className="container w-100">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">

                                    {/* <div className="row mt-4">
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
                                    </div> */}
                                    <div className="row mt-4">
                                        <div className="col">
                                            <h4><span>선택한 좌석과 가격</span></h4>
                                            <hr />
                                            <table className="table text-center">
                                                <thead>
                                                    <tr>
                                                        <th>좌석</th>
                                                        <th>좌석 위치</th>
                                                        <th>좌석 등급</th>
                                                        <th>좌석 가격</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {checkedSeats.map(seat => (
                                                        <tr key={seat.seatNo}>
                                                            <td>{seat.seatNo}</td>
                                                            <td>{seat.seatCol} - {seat.seatRow}</td>
                                                            <td>{seat.seatLevel} 석</td>
                                                            <td>{getSeatPrice(seat.seatLevel)} 원</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <table className="table text-center">
                                                <tbody>
                                                    <tr>
                                                        <th>총 가격</th>
                                                        <td>{totalPrice} 원</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* 예매 정보 확인 창/주문자 정보 입력 */}
            {showOrderForm && (

                <div className="container w-100" >
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">
                                <div className="row mt-4">
                                    <div className="col">
                                        <h4><span>주문자 정보 입력</span></h4>
                                        <hr />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-4">
                                        <label>이름*</label>
                                        <input type="text" name="reservationPersonName"
                                            value={inputReservation.reservationPersonName}
                                            className="form-control"
                                            onChange={e => changeInputReservation(e)} />
                                    </div>
                                    <div className="col-4">
                                        <label>휴대폰번호*</label>
                                        <input type="text" name="reservationPersonTell"
                                            value={inputReservation.reservationPersonTell}
                                            className="form-control"
                                            onChange={e => changeInputReservation(e)} />
                                    </div>
                                    <div className="col-4">
                                        <label>이메일</label>
                                        <input type="text" name="reservationPersonEmail"
                                            value={inputReservation.reservationPersonEmail}
                                            className="form-control"
                                            onChange={e => changeInputReservation(e)} />
                                    </div>
                                </div>
                                <br />
                                <div className="row mt-4">
                                    <div className="col-2  offset-8 text-end">
                                        <button className="btn btn-success w-100" style={{ backgroundColor: '#681116', borderColor: '#681116' }}
                                            // onClick={e => kakaopay(e)}
                                            onClick={e => saveInputReservation(e)}
                                        >
                                            예매
                                        </button>
                                    </div>
                                    <div className="col-2 text-end">
                                        <button className="btn btn-success w-100" style={{ backgroundColor: '#681116CC', borderColor: '#681116CC' }}
                                            onClick={e => cancelInputReservation(e)}>
                                            취소
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
export default Reservation;
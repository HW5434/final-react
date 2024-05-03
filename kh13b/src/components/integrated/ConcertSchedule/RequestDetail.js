
import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../../Jumbotron";
import axios from '../../utils/CustomAxios';
import { useParams, Link } from "react-router-dom";
import ConcertRequest from './../ConcertRequest';
import { Modal } from 'bootstrap';
import { IoIosSave } from "react-icons/io";
import { GiCancel } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";


const RequestDetail = () => {
    const { concertRequestNo } = useParams();
    const [concertRequests, setConcertRequests] = useState([]); // 초기값을 null로 설정

    const [selectedActors, setSelectedActors] = useState([]);

    const [actors, setActors] = useState([]);

    //actor 목록 출력 구문
    const loadData2 = useCallback(async () => {
        try {
            const resp = await axios.get("/actor/");
            setActors(resp.data);
        } catch (error) {
            console.error("Error loading actor data:", error);
        }
    }, []);


    const [adds, setAdds] = useState({
        concertRequestNo: "",
        concertRequestConcertName: "",
        concertScheduleStart: "",
        concertScheduleEnd: "",
        actorName: ""
    });
    const [input, setInput] = useState({
        concertRequestState: "n" // 기본값은 'y'로 설정합니다.
    });

    useEffect(() => {
        loadData();
        loadData2();
    }, [concertRequestNo]);


    const loadData = useCallback(async () => {
        try {
            const resp = await axios.get(`concertRequest/${concertRequestNo}`);
            const resp2 = await axios.get(`/concertRequest/${concertRequestNo}/actors`);
            setConcertRequests(resp2.data.concertRequestDto);
            setConcertRequests(resp2.data.listActorDto);
            setConcertRequests(resp.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }, [concertRequestNo]);

    // const loadData = useCallback(async () => {
    //     try {
    //         const resp = await axios.get(`/concert_request/${concertRequestNo}`); // 수정된 부분
    //         const { concertRequestDto, listActorDto } = resp.data; // 요청에서 받은 데이터를 한 번에 설정
    //         setConcertRequests(concertRequestDto);
    //         setActors(listActorDto); // 배우 목록 설정
    //     } catch (error) {
    //         console.error("Error loading data:", error);
    //     }
    // }, [concertRequestNo]);

    const approveState = useCallback(async () => {
        // concertRequestState 값을 'Y'로 변경하여 업데이트합니다.
        const updatedInput = { ...input, concertRequestState: 'y' };

        try {
            // PATCH 요청을 보내어 데이터를 업데이트합니다.
            const resp = await axios.patch(`/concertRequest/${concertRequestNo}`, updatedInput);
            // 데이터를 다시 불러옵니다.
            loadData();
            openModal();
        } catch (error) {
            console.error("Error updating data:", error);
        }

    }, [input, concertRequestNo, loadData, adds]);

    //등록
    const saveAdd = useCallback(() => {
        axios({
            url: "/schedule/",
            method: "post",
            data: adds
        })
            .then(resp => {
                //등록이 완료되면? 목록 갱신
                loadData(); //정보 불러오기

                setAdds({ //새로 넣기
                    concertRequestNo: "",
                    concertRequestConcertName: "",
                    concertScheduleStart: "",
                    concertScheduleEnd: "",
                    actorName: ""
                });

                closeModal();
            });
    }, [adds, concertRequestNo]);

    //등록 취소 
    const cancelAdd = useCallback(() => {
        //필요하다면 확인창 추가

        setAdds({
            concertRequestNo: "",
            concertRequestConcertName: "",
            concertScheduleStart: "",
            concertScheduleEnd: "",
            actorName: ""
        });
        clearAdd();
        closeModal();
    }, [adds]);

    //수정
    const changeAdd = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAdds({
            ...adds,
            [name]: value
        });
    }, [adds]);






    //입력값 초기화
    const clearAdd = useCallback(() => {
        setAdds({
                    concertRequestNo: "",
                    concertRequestConcertName: "",
                    concertScheduleStart: "",
                    concertScheduleEnd: "",
                    actorName: ""
        });
    }, [adds]);
    // const toggleActorSelection = useCallback((actorNo) => {
    //     setInput(prevState => ({
    //         ...prevState,
    //         selectedActors: prevState.selectedActors.includes(actorNo)
    //             ? prevState.selectedActors.filter(id => id !== actorNo)
    //             : [...prevState.selectedActors, actorNo]
    //     }));
    // }, []);
    const toggleActorSelection = (actorNo) => {
        // 이미 선택된 배우인지 확인
        const isSelected = selectedActors.includes(actorNo);
        // 새로운 선택 상태를 반전시킴
        const updatedSelectedActors = isSelected
            ? selectedActors.filter(id => id !== actorNo) // 선택 해제
            : [...selectedActors, actorNo]; // 선택

        // 선택된 배우 리스트 업데이트
        setSelectedActors(updatedSelectedActors);
    };




    //모달 
    const bsModal = useRef();//리모컨
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
        clearAdd();
    }, [bsModal]);




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
                                    <button className="btn btn-success" onClick={approveState} >
                                        승인<Link to={`/approve/${concertRequests.concertRequestNo}`}>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
            {/* Modal */}
            <div ref={bsModal} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">공연정보 등록</h1>
                            <button type="button" className="btn-close" aria-label="Close" onClick={e => cancelAdd()}></button>
                        </div>


                        {/* 
                        concertRequestConcertName:"",
                        concertRequestConcertGenre:"",
                        concertRequestHeadDay:"",
                        concertRequestFooterDay:"",
                        concertScheduleStart:"",
                        concertScheduleEnd:"",
                        actorName:"" 
                        */}
                        <div className="modal-body">
                            {/* 등록 화면 */}
                            <div className='row mt-4'>
                                <div className='col'>
                                    <input type="hidden" name="concertRequestNo"
                                        value={concertRequests.concertRequestNo}
                                        onChange={e => changeAdd(e)}
                                        className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col'>
                                    <label>공연시작시간</label>
                                    <input type="text" name="concertScheduleStart"
                                        value={adds.concertScheduleStart}
                                        onChange={e => changeAdd(e)}
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='row mt-4'>
                                <div className='col'>
                                    <label>공연종료시간</label>
                                    <input type="text" name="concertScheduleEnd"
                                        value={adds.concertScheduleEnd}
                                        onChange={e => changeAdd(e)}
                                        className='form-control' />
                                </div>
                            </div>

                            <div className='row mt-4'>
                                <div className='col'>
                                    {/* <label>배우선택</label>
                                    {actors.map(actor => (
                                        <div key={actor.id}>
                                            {actor.actorNo}
                                            {actor.actorName}
                                            {actor.concertRequestNo}
                                        </div>
                                    ))}  */}
                                    <label>배우선택</label>
                                    {actors.map(actor => (
                                        <div key={actor.actorNo}>
                                            <input
                                                type="checkbox"
                                                id={`actor-${actor.actorNo}`}
                                                value={actor.actorNo}
                                                onChange={() => toggleActorSelection(actor.actorNo)}
                                            />
                                            <label htmlFor={`actor-${actor.actorNo}`}>
                                                {actor.actorName}
                                            </label>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* 등록 및 등록 취소 버튼  */}
                            <div className="modal-footer">
                                <button className='btn btn-success me-2'
                                    onClick={e => saveAdd()}>
                                    <IoIosSave />
                                    &nbsp;
                                    등록
                                </button>
                                <button className='btn btn-danger'
                                    onClick={e => cancelAdd()}>
                                    <GiCancel />
                                    &nbsp;
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RequestDetail;
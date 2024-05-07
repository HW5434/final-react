
import axios from '../utils/CustomAxios';
import { useRef, useCallback, useState, useEffect } from 'react';
import { Modal } from "bootstrap";
import img_rent_step from './image/img_rent_step.jpg';
import "./CSS.css";
import { NavLink } from "react-router-dom";


function ConcertRequest() {
    const [concertRequests, setConcertRequests] = useState([]);
    const [applicant, setApplicant] = useState({
        //memberNo: "",
        concertRequestNo: "",
        concertRequestCompanyName: "",
        concertRequestCompanyNumber: "",
        concertRequestRepresentative: "",
        concertRequestManager: "",
        concertRequestAddress: "",
        concertRequestOfficeNumber: "",
        concertRequestPhoneNumber: "",
        concertRequestEmail: "",
        concertRequestFax: ""
    });
    const [concert, setConcert] = useState({
        concertRequestConcertName: "",
        concertRequestConcertGenre: "",
        concertRequestAge: "",
        concertRequestRuntimeFirst: "",
        concertRequestIntermission: "",
        concertRequestRuntimeSecond: "",
        concertRequestSeatvip: "",
        concertRequestSeatr: "",
        concertRequestSeats: "",
        concertRequestSeata: "",
    });
    const [actors, setActors] = useState([
       { actorName: ''},
    ]);
    const [rent, setRent] = useState({
        concertRequestHeadDay: "",
        concertRequestFooterDay: "",
        concertRequestReadyhDay: "",
        concertRequestReadyfDay: "",
        concertRequestStarthDay: "",
        concertRequestStartfDay: "",
        concertRequestWithdrawhDay: "",
        concertRequestWithdrawfDay: "",
        concertRequestState: "n"
    });
  

    //시작하자마자 서버와 통신해서 데이터를 넣는다
    useEffect(() => {
        loadData();
    }, []);//최초1회만

    //callback


    const bsModal = useRef();
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
        closeModal();
    }, [bsModal]);
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

   
    const [inputs, setInputs] = useState([]);


    // 새로운 input 입력 창 추가
    const handleAddInput = () => {
        const newInput = { id: inputs.length + 1, value: '' };
        setInputs([...inputs, newInput]);
    };

    // 입력 값 변경 시 상태 업데이트
    const handleChange = (id, value) => {
        const updatedInputs = inputs.map(input =>
            input.id === id ? { ...input, value } : input
        );
        setInputs(updatedInputs);
    };

    const changeInput = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputs({
            ...inputs,//원래input을 유지시키되
            [name]: value//name에 해당하는 값만 value로 바꿔라!
        });
    }, [inputs]);

    const loadData = useCallback(() => {
        axios({
            url: "/concertRequest/",
            method: "get"
        })
            .then(resp => {
                setConcertRequests(resp.data);
            });
    }, [concertRequests]);

    const saveInput = useCallback(async () => {
        const resp = await axios.post("/concertRequest/", inputs);
       
    }, [inputs]);

    // 날짜 제한 부분
    const [headDate, setHeadDate] = useState(new Date());//1
    const [footerDate, setFooterDate] = useState(headDate);
    const [readyhDate, setReadyhDate] = useState(headDate);//2
    const [readyfDate, setReadyfDate] = useState(headDate);
    const [starthDate, setStarthDate] = useState(headDate);//3
    const [startfDate, setStartfDate] = useState(headDate);
    const [withdrawhDate, setWithdrawhDate] = useState(headDate);//4
    const [withdrawfDate, setWithdrawfDate] = useState(headDate);

    const handleHeadDateChange = (e) => {
        const date = new Date(e.target.value);
        setHeadDate(date);
        setFooterDate(date);
        setReadyhDate(date);
        setStarthDate(date);
        setWithdrawhDate(date);
    };

    const handleFooterDateChange = (e) => {
        const date = new Date(e.target.value);
        if (date >= headDate) {
            setFooterDate(date);
        }
    };

    const handleReadyhDateChange = (e) => {
        const date = new Date(e.target.value);
        if (date >= headDate || date <= setFooterDate) {
            setReadyhDate(date);
            setReadyfDate(date);
        }
    };

    const handleReadyfDateChange = (e) => {
        const date = new Date(e.target.value);
        if (date >= readyhDate || date <= setFooterDate) {
            setReadyfDate(date);
        }
    };

    const handleStarthDateChange = (e) => {
        const date = new Date(e.target.value);
        if (date >= readyhDate || date <= readyfDate) {
            setStarthDate(date);
            setStartfDate(date);
        }
    };

    const handleStartfDateChange = (e) => {
        const date = new Date(e.target.value);
        if (date >= starthDate || date <= readyfDate) {
            setStartfDate(date);
        }
    };

    const handleWithdrawhDateChange = (e) => {
        const date = new Date(e.target.value);
        if (date >= starthDate || date <= startfDate) {
            setWithdrawhDate(date);
            setWithdrawfDate(date);
        }
    };

    const handleWithdrawfDateChange = (e) => {
        const date = new Date(e.target.value);
        if (date >= withdrawhDate || date <= startfDate) {
            setWithdrawfDate(date);
        }
    };

    return (
        <>

            <div className="container mt-4 ms-3">
                <h1>공연 대관 문의</h1>
                <div className="row">
                    <div className="col text-end me-3">
                        <NavLink className="" to="/Home">
                            <i class="bi bi-house-fill" /></NavLink>
                        <i class="bi bi-slash" />
                        메뉴 2번
                        <i class="bi bi-slash" />
                        대관안내
                    </div>
                </div>
                <div className="row">
                    <div className="col centered-image mt-5 me-4 ps-0">
                        <img src={img_rent_step} className=""></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center mt-5">
                        <span>문 의:고객센터-1:1문의 또는 별도 문의(대관 공고 연락처)</span>
                        <div className="col mt-2 mb-5">
                            <span>*대관 접수 전 반드시 공지사항 내 [
                                <NavLink className="" to="">대관 공고</NavLink>
                                ]를 확인 하시기 바랍니다.</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col centered-image mt-5">
                        <button type="button" className="success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">대관접수버튼</button>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">대관하기</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            {/* 등록 화면 */}

                            <div className="container">
                                <span className="red-icon"><h2>신청인</h2></span>
                                <hr />
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>단체명
                                        </label>
                                        <div className='col'>
                                            <input type="text" name="concertRequestCompanyName"
                                                value={inputs.concertRequestCompanyName}
                                                onChange={e => changeInput(e)}
                                                className='form-control' required />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <label>사업자등록번호</label>
                                        <input type="text" name="concertRequestCompanyNumber"
                                            value={applicant.concertRequestCompanyNumber}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>대표자</label>
                                        <input type="text" name="concertRequestRepresentative"
                                            value={applicant.concertRequestRepresentative}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>담당자
                                        </label>
                                        <input type="text" name="concertRequestManager"
                                            value={applicant.concertRequestManager}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>주소
                                        </label>
                                        <input type="text" name="concertRequestAddress"
                                            value={applicant.concertRequestAddress}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>사무실번호
                                        </label>
                                        <input type="tel" name="concertRequestOfficeNumber"
                                            value={applicant.concertRequestOfficeNumber}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>이메일
                                        </label>
                                        <input type="text" name="concertRequestEmail"
                                            value={applicant.concertRequestEmail}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>핸드폰번호
                                        </label>
                                        <input type="tel" name="concertRequestPhoneNumber"
                                            value={applicant.concertRequestPhoneNumber}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>

                                    <div className='col'>
                                        <label>팩스번호</label>
                                        <input type="text" name="concertRequestFax"
                                            value={applicant.concertRequestFax}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <br />
                            </div>

                            <div className="container">
                                <span className="red-icon"><h2>공연 구분</h2></span>
                                <hr />
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>공연명
                                        </label>
                                        <input type="text" name="concertRequestConcertName"
                                            value={concert.concertRequestConcertName}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon" />공연장르
                                        </label>
                                        <input type="text" name="concertRequestConcertGenre"
                                            value={concert.concertRequestConcertGenre}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon" />관람연령
                                        </label>
                                        <input type="text" name="concertRequestAge"
                                            value={concert.concertRequestAge}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label><i class="bi bi-asterisk red-icon" />1막 공연시간</label>
                                        <input type="text" name="concertRequestRuntimeFirst"
                                            value={concert.concertRequestRuntimeFirst}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                    <div className='col'>
                                        <label><i class="bi bi-asterisk red-icon" />인터미션</label>
                                        <input type="text" name="concertRequestIntermission"
                                            value={concert.concertRequestIntermission}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                    <div className='col'>
                                        <label><i class="bi bi-asterisk red-icon" />2막 공연시간</label>
                                        <input type="text" name="concertRequestRuntimeSecond"
                                            value={concert.concertRequestRuntimeSecond}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>VIP석</label>
                                        <input type="number" name="concertRequestSeatvip"
                                            value={concert.concertRequestSeatvip}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                    <div className='col'>
                                        <label>R석</label>
                                        <input type="number" name="concertRequestSeatr"
                                            value={concert.concertRequestSeatr}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                    <div className='col'>
                                        <label>S석</label>
                                        <input type="number" name="concertRequestSeats"
                                            value={concert.concertRequestSeats}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                    <div className='col'>
                                        <label>A석</label>
                                        <input type="number" name="concertRequestSeata"
                                            value={concert.concertRequestSeata}
                                            onChange={e => changeInput(e)}
                                            className='form-control' required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>공연 배우 입력</label>
                                    </div>
                                    <div className="col text-end">
                                        {/* 새로운 입력 창 추가 버튼 */}
                                        <label htmlFor="addInputButton" style={{ cursor: 'pointer' }}>+</label>
                                        <button id="addInputButton" onClick={handleAddInput} style={{ display: 'none' }}></button>
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-3'>

                                        {/* 입력 창들 렌더링 */}

                                        <div className="row mb-2">
                                            <input type="text" value={actors.actorName} name='actorName'
                                                onChange={e => changeInput(e)} required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>


                            <div className="container">
                                <span><h2>대관 일정</h2></span>
                                <hr />
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <h3>총대관일</h3>
                                    </div>
                                    <div className='col'>
                                        <input type="date" name="concertRequestHeadDay"
                                            value={headDate.toISOString().split('T')[0]}
                                            onChange={handleHeadDateChange}
                                            min={new Date().toISOString().split('T')[0]} // 현재 날짜부터 선택 가능
                                            className='form-control' required />
                                    </div>

                                    <div className='col'>

                                        <input type="date" name="concertRequestFooterDay"
                                            value={footerDate.toISOString().split('T')[0]}
                                            onChange={handleFooterDateChange}
                                            min={headDate.toISOString().split('T')[0]} // 첫 번째 입력 창 이후의 날짜만 선택 가능
                                            className='form-control' required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label><h3>준비대관</h3></label>
                                    </div>
                                    <div className='col'>

                                        <input type="date" name="concertRequestReadyhDay"
                                            value={readyhDate.toISOString().split('T')[0]}
                                            onChange={handleReadyhDateChange}
                                            min={headDate.toISOString().split('T')[0]}
                                            max={footerDate.toISOString().split('T')[0]}
                                            className='form-control' required />
                                    </div>

                                    <div className='col'>
                                        <input type="date" name="concertRequestReadyfDay"
                                            value={readyfDate.toISOString().split('T')[0]}
                                            onChange={handleReadyfDateChange}
                                            min={readyhDate.toISOString().split('T')[0]}
                                            max={footerDate.toISOString().split('T')[0]}
                                            className='form-control' required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label><h3>공연대관</h3></label>
                                    </div>
                                    <div className='col'>
                                        <input type="date" name="concertRequestStarthDay"
                                            value={starthDate.toISOString().split('T')[0]}
                                            onChange={handleStarthDateChange}
                                            min={readyfDate.toISOString().split('T')[0]}
                                            max={footerDate.toISOString().split('T')[0]}
                                            className='form-control' required />
                                    </div>
                                    <div className='col'>
                                        <input type="date" name="concertRequestStartfDay"
                                            value={startfDate.toISOString().split('T')[0]}
                                            onChange={handleStartfDateChange}
                                            min={starthDate.toISOString().split('T')[0]}
                                            max={footerDate.toISOString().split('T')[0]}
                                            className='form-control' required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label><h3>철수대관</h3></label>
                                    </div>
                                    <div className='col'>
                                        <input type="date" name="concertRequestWithdrawhDay"
                                            value={withdrawhDate.toISOString().split('T')[0]}
                                            onChange={handleWithdrawhDateChange}
                                            min={startfDate.toISOString().split('T')[0]}
                                            max={footerDate.toISOString().split('T')[0]}
                                            className='form-control' required />
                                    </div>
                                    <div className='col'>
                                        <input type="date" name="concertRequestWithdrawfDay"
                                            value={withdrawfDate.toISOString().split('T')[0]}
                                            onChange={handleWithdrawfDateChange}
                                            min={withdrawhDate.toISOString().split('T')[0]}
                                            max={footerDate.toISOString().split('T')[0]}
                                            className='form-control' required />
                                    </div>
                                </div>
                                {/* <div className='row mt-4'>
                                    <div className='col mb-4'>
                                        <label>포스터 첨부</label>
                                        <input type="file" name="concertRequestNo"
                                            value={input.concertRequestNo}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>

                                </div> */}
                            </div>
                            <div class="modal-footer">

                                <button type="button" class="btn btn-primary" onClick={e => saveInput()}>접수신청</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>




        </>
    );



}

export default ConcertRequest;

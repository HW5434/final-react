
import axios from '../utils/CustomAxios';
import { useRef, useCallback, useState, useEffect, } from 'react';
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

    const changeApplicant = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;

        setApplicant({
            ...applicant,//원래것을 유지시키되
            [name]: value//name에 해당하는 값만 value로 바꿔라!
        });
    }, [applicant]);

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

    const changeConcert = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;

        setConcert({
            ...concert,//원래것을 유지시키되
            [name]: value//name에 해당하는 값만 value로 바꿔라!
        });
    }, [concert]);

    const [actors, setActors] = useState([{
        actorNo: 1, actorName: ''
    }]);


    const changeActors = useCallback((e, target) => {
        const copy = [...actors];//actors 복사
        const copy2 = copy.map(actor => {//copy 뒤져가면서
            if (actor.actorNo === target.actorNo) {//actorNo가 같으면
                return { ...actor, "actorName": e.target.value }//actorName 교체해라
            }
            return { ...actor };//아니면 현상유지
        });
        setActors(copy2);//원래 데이터 덮어쓰기
    });

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

    const changeRent = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;

        setRent({
            ...rent,//원래것을 유지시키되
            [name]: value//name에 해당하는 값만 value로 바꿔라!
        });
    }, [rent]);

    //시작하자마자 서버와 통신해서 데이터를 넣는다
    useEffect(() => {
        loadData();
    }, []);//최초1회만


    const [attach, setAttach] = useState(null);

    const handleFileChange = (e) => {
        setAttach(e.target.files);
    };


    const bsModal = useRef();
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
        closeModal();
    }, [bsModal]);

    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);

        setApplicant({
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
        setConcert({
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
        setConcert({
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

        setActors([{
            actorNo: 1, actorName: ''
        }]);

        setRent({
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

        setAttach({});
    }, [bsModal]);


    // 새로운 input 입력 창 추가
    const handleAddInput = () => {
        const newActors = { actorNo: actors.length + 1, actorName: '' };
        setActors([...actors, newActors]);
    };
    const handleRemoveInput = () => {
        if (actors.length > 1) { // 최소한 하나의 입력 창은 유지되어야 합니다.
            setActors(actors.slice(0, -1)); // 가장 최근에 추가된 입력 창을 삭제합니다.
        }
    };

    const loadData = useCallback(() => {
        axios({
            url: "/concertRequest/",
            method: "get"
        })
            .then(resp => {
                setConcertRequests(resp.data);
            });
    }, [concertRequests]);

    const saveInput = useCallback(() => {
        const formData = new FormData();
        formData.append('applicant', JSON.stringify(applicant));// 객체를 문자열로 변환하여 formData에 추가
        formData.append('rent', JSON.stringify(rent));
        formData.append('concert', JSON.stringify(concert));
        formData.append('actors', JSON.stringify(actors));

        //attach에 파일이 있는 경우 FormData에 파일 추가
        if (attach && attach.length > 0) {
            for (let i = 0; i < attach.length; i++) {
                formData.append(`attach`, attach[i]);
            }
        }
        axios({
            url: "/concertRequest/",
            method: "post",
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

            .then(resp => {
                //등록이 완료되면? 목록 갱신
                loadData();
                setApplicant({
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
                setConcert({
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
                setConcert({
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

                setActors([{
                    actorNo: 1, actorName: ''
                }]);

                setRent({
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

                setAttach({});

                closeModal();

            });
    }, [applicant, rent, concert, actors, attach]);



    return (
        <>
            <div className="container mt-4 ms-3">
                <h1>공연 대관 문의</h1>
                <div className="row">
                    <div className="col text-end me-3">
                        <NavLink className="" to="/Home">
                            <i class="bi bi-house-fill" /></NavLink>
                        <i class="bi bi-slash" />
                        대관
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
                                <NavLink className="" to="/notice">대관 공고</NavLink>
                                ]를 확인 하시기 바랍니다.</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col centered-image mt-5 mb-5">
                        <button type="button" className="success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">대관접수버튼</button>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">대관하기</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h2>개인정보 수집 및 이용</h2>
                            <hr />
                            <div className="container text-center">
                                <div className='row'>
                                    <div className='col-4'>
                                        <h5 className='mt-0 pt-0 mb-0 pb-0'>
                                            목적
                                        </h5>
                                    </div>
                                    <div className='col-4'>
                                        <h5 className='mt-0 pt-0 mb-0 pb-0'>
                                            항목
                                        </h5>
                                    </div>
                                    <div className='col-4'>
                                        <h5 className='mt-0 pt-0 mb-0 pb-0'>
                                            보유기간
                                        </h5>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-4'>
                                        <h5>
                                            - 대관 신청에 따른 단체 확인용<br />
                                            - 대관 관련 상호 의사소통 경로 확보<br />
                                            - 대관료 청구 및 지급 등 기타 대관 관련 업무 진행
                                        </h5>
                                    </div>
                                    <div className='col-4'>
                                        <h5>
                                            단체명, 담당자, 사무실<br />
                                            전화번호, 이메일, 핸드폰 번호
                                        </h5>
                                    </div>
                                    <div className='col-4 mb-5'>
                                        <h5>
                                            등록일로부터 1년
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            

                            {/* 등록 화면 */}

                            <div className="container mt-5">
                                <span className="red-icon"><h2>신청인</h2></span>
                                <hr />
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>단체명
                                        </label>
                                        <div className='col'>
                                            <input type="text" name="concertRequestCompanyName"
                                                value={applicant.concertRequestCompanyName}
                                                onChange={e => changeApplicant(e)}
                                                required />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <label>사업자등록번호</label>
                                        <input type="text" name="concertRequestCompanyNumber"
                                            value={applicant.concertRequestCompanyNumber}
                                            onChange={e => changeApplicant(e)}
                                        />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>대표자</label>
                                        <input type="text" name="concertRequestRepresentative"
                                            value={applicant.concertRequestRepresentative}
                                            onChange={e => changeApplicant(e)}
                                        />
                                    </div>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>담당자
                                        </label>
                                        <input type="text" name="concertRequestManager"
                                            value={applicant.concertRequestManager}
                                            onChange={e => changeApplicant(e)}
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>주소
                                        </label>
                                        <input type="text" name="concertRequestAddress"
                                            value={applicant.concertRequestAddress}
                                            onChange={e => changeApplicant(e)}
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>사무실번호
                                        </label>
                                        <input type="tel" name="concertRequestOfficeNumber"
                                            value={applicant.concertRequestOfficeNumber}
                                            onChange={e => changeApplicant(e)}
                                            required />
                                    </div>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>이메일
                                        </label>
                                        <input type="text" name="concertRequestEmail"
                                            value={applicant.concertRequestEmail}
                                            onChange={e => changeApplicant(e)}
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>핸드폰번호
                                        </label>
                                        <input type="tel" name="concertRequestPhoneNumber"
                                            value={applicant.concertRequestPhoneNumber}
                                            onChange={e => changeApplicant(e)}
                                            required />
                                    </div>

                                    <div className='col'>
                                        <label>팩스번호</label>
                                        <input type="applicant" name="concertRequestFax"
                                            value={applicant.concertRequestFax}
                                            onChange={e => changeApplicant(e)}
                                        />
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
                                            onChange={e => changeConcert(e)}
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon" />공연장르
                                        </label>
                                        <input type="text" name="concertRequestConcertGenre"
                                            value={concert.concertRequestConcertGenre}
                                            onChange={e => changeConcert(e)}
                                            required />
                                    </div>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon" />관람연령
                                        </label>
                                        <input type="text" name="concertRequestAge"
                                            value={concert.concertRequestAge}
                                            onChange={e => changeConcert(e)}
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label><i class="bi bi-asterisk red-icon" />1막 공연시간</label>
                                        <input type="text" name="concertRequestRuntimeFirst"
                                            value={concert.concertRequestRuntimeFirst}
                                            onChange={e => changeConcert(e)}
                                            required />
                                    </div>
                                    <div className='col'>
                                        <label><i class="bi bi-asterisk red-icon" />인터미션</label>
                                        <input type="text" name="concertRequestIntermission"
                                            value={concert.concertRequestIntermission}
                                            onChange={e => changeConcert(e)}
                                            required />
                                    </div>
                                    <div className='col'>
                                        <label><i class="bi bi-asterisk red-icon" />2막 공연시간</label>
                                        <input type="text" name="concertRequestRuntimeSecond"
                                            value={concert.concertRequestRuntimeSecond}
                                            onChange={e => changeConcert(e)}
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>VIP석</label>
                                        <input type="number" name="concertRequestSeatvip"
                                            value={concert.concertRequestSeatvip}
                                            onChange={e => changeConcert(e)}
                                            required />
                                    </div>
                                    <div className='col'>
                                        <label>R석</label>
                                        <input type="number" name="concertRequestSeatr"
                                            value={concert.concertRequestSeatr}
                                            onChange={e => changeConcert(e)}
                                            required />
                                    </div>
                                    <div className='col'>
                                        <label>S석</label>
                                        <input type="number" name="concertRequestSeats"
                                            value={concert.concertRequestSeats}
                                            onChange={e => changeConcert(e)}
                                            required />
                                    </div>
                                    <div className='col'>
                                        <label>A석</label>
                                        <input type="number" name="concertRequestSeata"
                                            value={concert.concertRequestSeata}
                                            onChange={e => changeConcert(e)}
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <span>공연배우입력</span>
                                    </div>
                                    {/* 새로운 입력 창 추가 버튼 */}
                                    <div className='col text-end'>
                                        <label htmlFor="addInputButton" style={{ cursor: 'pointer' }}>
                                            <i class="bi bi-plus-square"></i>
                                        </label>
                                        <button id="addInputButton" onClick={handleAddInput} style={{ display: 'none' }}></button>
                                    </div>
                                    <div className='col-1'>
                                        {/* 입력 창 삭제 버튼 */}
                                        <label htmlFor="minusInputButton" style={{ cursor: 'pointer' }}>
                                            <i class="bi bi-dash-square"></i>
                                        </label>
                                        <button id="minusInputButton" onClick={handleRemoveInput} style={{ display: 'none' }}></button>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-5'>
                                        {/* 입력 창들 렌더링 */}
                                        {actors.map(actor => (
                                            <div className="row mb-2" key={actor.id}>
                                                <div className='col'>
                                                    <input type="text" value={actor.actorName} name='actorName'
                                                        onChange={e => changeActors(e, actor)} required />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <br />
                            </div>


                            <div className="container">
                                <span className="red-icon"><h2>대관 일정</h2></span>
                                <hr />
                                <div className='row mt-4'>
                                    <div className='col-4'>
                                        <h3>총대관일</h3>
                                    </div>
                                    <div className='col-4'>
                                        <input type="date" name="concertRequestHeadDay"
                                            value={rent.concertRequestHeadDay}
                                            onChange={e => changeRent(e)}
                                            min={new Date().toISOString().split('T')[0]}
                                            required />
                                    </div>

                                    <div className='col-4'>
                                        <input type="date" name="concertRequestFooterDay"
                                            value={rent.concertRequestFooterDay}
                                            onChange={e => changeRent(e)}
                                            min={rent.concertRequestHeadDay} // 첫 번째 입력 창 이후의 날짜만 선택 가능
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-4'>
                                        <label><h3>준비대관</h3></label>
                                    </div>
                                    <div className='col-4'>

                                        <input type="date" name="concertRequestReadyhDay"
                                            value={rent.concertRequestReadyhDay}
                                            onChange={e => changeRent(e)}
                                            min={rent.concertRequestHeadDay}
                                            max={rent.concertRequestFooterDay}
                                            required />
                                    </div>

                                    <div className='col-4'>
                                        <input type="date" name="concertRequestReadyfDay"
                                            value={rent.concertRequestReadyfDay}
                                            onChange={e => changeRent(e)}
                                            min={rent.concertRequestHeadDay}
                                            max={rent.concertRequestFooterDay}
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-4'>
                                        <label><h3>공연대관</h3></label>
                                    </div>
                                    <div className='col-4'>
                                        <input type="date" name="concertRequestStarthDay"
                                            value={rent.concertRequestStarthDay}
                                            onChange={e => changeRent(e)}
                                            min={rent.concertRequestReadyfDay}
                                            max={rent.concertRequestFooterDay}
                                            required />
                                    </div>
                                    <div className='col-4'>
                                        <input type="date" name="concertRequestStartfDay"
                                            value={rent.concertRequestStartfDay}
                                            onChange={e => changeRent(e)}
                                            min={rent.concertRequestReadyfDay}
                                            max={rent.concertRequestFooterDay}
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col-4'>
                                        <label><h3>철수대관</h3></label>
                                    </div>
                                    <div className='col-4'>
                                        <input type="date" name="concertRequestWithdrawhDay"
                                            value={rent.concertRequestWithdrawhDay}
                                            onChange={e => changeRent(e)}
                                            min={rent.concertRequestStartfDay}
                                            max={rent.concertRequestFooterDay}
                                            required />
                                    </div>
                                    <div className='col-4'>
                                        <input type="date" name="concertRequestWithdrawfDay"
                                            value={rent.concertRequestWithdrawfDay}
                                            onChange={e => changeRent(e)}
                                            min={rent.concertRequestStartfDay}
                                            max={rent.concertRequestFooterDay}
                                            required />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col mb-4'>
                                        <label>포스터 첨부</label>
                                        <input type="file" name="attach"
                                            onChange={e => handleFileChange(e)} />
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">

                                <button type="button" class="btn btn-primary" onClick={saveInput}>접수신청</button>

                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>닫기</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );




}
export default ConcertRequest;

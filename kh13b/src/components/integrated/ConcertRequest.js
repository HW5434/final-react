import { useState } from "react"

import { useRef, useCallback } from 'react';
import { Modal } from "bootstrap";
import img_rent_step from './image/img_rent_step.jpg';
import "./CSS.css";
import { NavLink } from "react-router-dom";
function ConcertRequest() {
    const [concertRequests, setConcertRequests] = useState([]);
    const [input, setInput] = useState({
        concertRequestNo: "",
        concertRequestCompanyName: "",
        concertRequestCompanyNumber: "",
        concertRequestRepresentative: "",
        concertRequestManager: "",
        concertRequestAddress: "",
        concertRequestOfficeNumber: "",
        concertRequestPhoneNumber: "",
        concertRequestEmail: "",
        concertRequestFax: "",
        concertRequestConcertName: "",
        concertRequestConcertGenre: "",
        concertRequestAge: "",
        concertRequestRuntimeFirst: "",
        concertRequestIntermission: "",
        concertRequestRuntimeSecond: "",
        concertRequestHeadDay: "",
        concertRequestFooterDay: "",
        concertRequestReadyhDay: "",
        concertRequestReadyfDay: "",
        concertRequestStarthDay: "",
        concertRequestStartfDay: "",
        concertRequestWithdrawhDay: "",
        concertRequestWithdrawfDay: "",
        concertRequestSeatvip: "",
        concertRequestSeatr: "",
        concertRequestSeats: "",
        concertRequestSeata: "",
        concertRequestState: "n"
    });

    //시작하자마자 서버와 통신해서 데이터를 넣는다
    //   useEffect(()=>{
    //     loadData();
    // }, []);//최초1회만

    //callback
    const changeInput = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInput({
            ...input,//원래input을 유지시키되
            [name]: value//name에 해당하는 값만 value로 바꿔라!
        });
    }, [input]);




    const bsModal = useRef();
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

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
                                        </div>
                                        <input type="text" name="concertRequestCompanyName"
                                            value={input.concertRequestCompanyName}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <label>사업자등록번호</label>
                                        <input type="text" name="concertRequestCompanyNumber"
                                            value={input.concertRequestCompanyNumber}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>대표자</label>
                                        <input type="text" name="concertRequestRepresentative"
                                            value={input.concertRequestRepresentative}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>담당자
                                        </label>
                                        <input type="text" name="concertRequestManager"
                                            value={input.concertRequestManager}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>주소
                                        </label>
                                        <input type="text" name="concertRequestAddress"
                                            value={input.concertRequestAddress}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>사무실번호
                                        </label>
                                        <input type="number" name="concertRequestOfficeNumber"
                                            value={input.concertRequestOfficeNumber}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                        <div className='col'>
                                            <label>
                                                <i class="bi bi-asterisk red-icon"></i>이메일
                                            </label>
                                            <input type="text" name="concertRequestEmail"
                                                value={input.concertRequestEmail}
                                                onChange={e => changeInput(e)}
                                                className='form-control' />
                                        </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"></i>핸드폰번호
                                        </label>
                                        <input type="number" name="concertRequestPhoneNumber"
                                            value={input.concertRequestPhoneNumber}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>

                                    <div className='col'>
                                        <label>팩스번호</label>
                                        <input type="text" name="concertRequestFax"
                                            value={input.concertRequestFax}
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
                                            value={input.concertRequestConcertName}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"/>공연장르
                                        </label>
                                        <input type="text" name="concertRequestConcertGenre"
                                            value={input.concertRequestConcertGenre}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <label>
                                            <i class="bi bi-asterisk red-icon"/>관람연령
                                        </label>
                                        <input type="text" name="concertRequestAge"
                                            value={input.concertRequestAge}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label><i class="bi bi-asterisk red-icon"/>1막 공연시간</label>
                                        <input type="text" name="concertRequestRuntimeFirst"
                                            value={input.concertRequestRuntimeFirst}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <label><i class="bi bi-asterisk red-icon"/>인터미션</label>
                                        <input type="text" name="concertRequestIntermission"
                                            value={input.concertRequestIntermission}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <label><i class="bi bi-asterisk red-icon"/>2막 공연시간</label>
                                        <input type="text" name="concertRequestRuntimeSecond"
                                            value={input.concertRequestRuntimeSecond}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>VIP석</label>
                                        <input type="number" name="concertRequestSeatvip"
                                            value={input.concertRequestSeatvip}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <label>R석</label>
                                        <input type="number" name="concertRequestSeatr"
                                            value={input.concertRequestSeatr}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <label>S석</label>
                                        <input type="number" name="concertRequestSeats"
                                            value={input.concertRequestSeats}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <label>A석</label>
                                        <input type="number" name="concertRequestSeata"
                                            value={input.concertRequestSeata}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
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
                                            value={input.concertRequestHeadDay}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                   
                                    <div className='col'>
                                      
                                        <input type="date" name="concertRequestFooterDay"
                                            value={input.concertRequestFooterDay}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label><h3>준비대관</h3></label>
                                    </div>
                                    <div className='col'>
                                       
                                        <input type="date" name="concertRequestReadyhDay"
                                            value={input.concertRequestReadyhDay}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    
                                    <div className='col'>
                                        <input type="date" name="concertRequestReadyfDay"
                                            value={input.concertRequestReadyfDay}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                    <label><h3>공연대관</h3></label>
                                    </div>
                                    <div className='col'>
                                        <input type="date" name="concertRequestStarthDay"
                                            value={input.concertRequestStarthDay}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <input type="date" name="concertRequestStartfDay"
                                            value={input.concertRequestStartfDay}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label><h3>철수대관</h3></label>
                                    </div>
                                    <div className='col'>
                                        <input type="date" name="concertRequestWithdrawhDay"
                                            value={input.concertRequestWithdrawhDay}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                    <div className='col'>
                                        <input type="date" name="concertRequestWithdrawfDay"
                                            value={input.concertRequestWithdrawfDay}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-4'>
                                    <div className='col'>
                                        <label>포스터 첨부</label>
                                        <input type="file" name="concertRequestNo"
                                            value={input.concertRequestNo}
                                            onChange={e => changeInput(e)}
                                            className='form-control' />
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">접수신청</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>

            </div >



        </>
    );



}

export default ConcertRequest;
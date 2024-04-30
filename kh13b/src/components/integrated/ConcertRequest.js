import { useState } from "react"
import Jumbotron from '../Jumbotron';
import { useRef, useCallback } from 'react';
import { Modal } from "bootstrap";
import img_rent_step from './image/img_rent_step.jpg';
import "./image.css";
import
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
            <Jumbotron title="공연 대관 문의"/>
            <div className="row">
                <div className="col">
                <i class="bi bi-house-fill"/><i class="bi bi-slash"></i>
                메뉴2<i class="bi bi-slash"></i>대관안내
                </div>
            </div>
            <div className="row">
                <div className="offset-2 col-8 centered-image mt-5">
                    <img src={img_rent_step} className="center"></img>
                </div>
            </div>
            <div className="row">
                <div className="col text-center mt-5">
                    <span>문 의:고객센터-1:1문의 또는 별도 문의(대관 공고 연락처)</span>
                    <div className="col mt-2 mb-5">
                        <span>*대관 접수 전 반드시 공지사항 내 [대관 공고]를 확인 하시기 바랍니다.</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col centered-image mt-5">
                    <button className="success">대관접수버튼</button>
                </div>
            </div>

        </>
    );



}

export default ConcertRequest;

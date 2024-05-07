import React, { useCallback, useEffect, useRef, useState } from 'react';
import Jumbotron from '../Jumbotron';
import axios from '../utils/CustomAxios';
import { Modal } from 'bootstrap';
import './Qna.css';


function Qna() {
    // State
    const [qnas, setQnas] = useState([]);
    const [input, setInput] = useState({
        qnaNo: "",
        qnaTitle: "",
        qnaContent: "",
        qnaAnswer: "N",
        qnaTarget: null
    });

    const [expandedQna, setExpandedQna] = useState(null);
    
    // 최초 로드
    useEffect(() => {
        loadData();
    }, []);

    // 데이터 로드
    const loadData = useCallback(async () => {
        const resp = await axios.get("/qna/");
        setQnas(resp.data);
    }, [qnas]);

    // 삭제
    const deleteQna = useCallback(async (target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;
        const resp = await axios.delete("/qna/" + target.qnaNo);
        loadData();
    }, [qnas]);

    // 등록
    const saveInput = useCallback(async () => {
        const resp = await axios.post("/qna/", input);
        loadData();
    }, [input]);

    // 입력 취소
    const cancelInput = useCallback(() => {
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if (choice === false) return;
        clearInput();
        closeModal();
    }, [input]);

    // 입력 값 변경
    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    // 입력 값 초기화
    const clearInput = useCallback(() => {
        setInput({
            qnaNo: "",
            qnaTitle: "",
            qnaContent: "",
            qnaAnswer: ""
        });
    }, [input]);

    const bsModal = useRef();

    // Modal 열기
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }, []);

    // Modal 닫기
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
        clearInput();
    }, []);

    // 토글버튼 클릭시 일부만 선택
    const toggleExpand = useCallback((qnaNo) => {
        setExpandedQna(expandedQna === qnaNo ? null : qnaNo);
    }, [expandedQna]);

    // 화면 출력
    return (
        <>
            <Jumbotron title="질문글 테스트" />

            {/* 검색창 */}
            <div className='row'>
                <div className='col mt-3 mb-3'>
                    <span>검색창</span>
                </div>
            </div>



            {/* 목록 */}
            <div className='row-4 mt-3 mb-3'>
                <div className='col'>
                    {qnas.map((qna) => (
                        <div className="accordion accordion-flush" id={`accordion${qna.qnaNo}`} key={qna.qnaNo}>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" onClick={() => toggleExpand(qna.qnaNo)}>
                                        <span>Q</span>
                                        &nbsp;&nbsp;&nbsp;
                                        <span>{qna.qnaTitle}</span>
                                    </button>
                                </h2>

                                {/* 클릭 했을때 보이는 질문글의 내용들 */}
                                <div className={expandedQna === qna.qnaNo ? "accordion-collapse collapse show" : "accordion-collapse collapse"} id={`collapse${qna.qnaNo}`} aria-labelledby={`heading${qna.qnaNo}`}
                                    data-bs-parent={`#accordion${qna.qnaNo}`}>
                                    <div className="accordion-body">
                                        {/* 답변 영역 */}
                                        <div className='row'>
                                            <div className='col mt-3'>
                                                <h1 className='text'>질문글 내용</h1>
                                                <button className='btn btn-primary' onClick={e => deleteQna(qna)}>
                                                    삭제버튼
                                                </button>
                                            </div>
                                        </div>

                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        <span className='btn btn-positive'>
                                                            <label>답변등록 [관리자기능]</label>
                                                        </span>
                                                    </button>
                                                </h2>

                                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="row text-start">

                                                            <div className="row">
                                                                <div className="col">
                                                                    <h2>Target</h2>
                                                                    <input type="text" name="qnaTitle" value={input.qnaTitle} onChange={changeInput} className="form-control" />
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col">
                                                                    <h2>글 제목</h2>
                                                                    <input type="text" name="qnaTitle" value={input.qnaTitle} onChange={changeInput} className="form-control" />
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col">
                                                                    <h2>글 내용</h2>
                                                                    <textarea type="text" name="qnaContent" value={input.qnaContent} onChange={changeInput} className="form-control" />
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="modal-footer">
                                                                        <button className='btn btn-success me-2' onClick={saveInput}>
                                                                            등록
                                                                        </button>
                                                                        <button className='btn btn-danger' onClick={cancelInput}>
                                                                            취소
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}


                </div>
            </div>

            {/* 페이지 네이션 */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center mt-5">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* 일반회원 등록버튼 */}
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-primary" onClick={openModal}>
                        신규 등록
                    </button>

                    <button className="btn btn-primary ms-2" onClick={openModal}>
                        답변등록
                    </button>
                </div>
            </div>


            <div ref={bsModal} className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">질문글 쓰기</h1>
                            <button type="button" className="btn-close" aria-label="Close" onClick={cancelInput}></button>
                        </div>
                        <div className="modal-body">


                            <div className="row">
                                <div className="col">
                                    <label>글 제목</label>
                                    <input type="text" name="qnaTitle" value={input.qnaTitle} onChange={changeInput} className="form-control" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label>글 내용</label>
                                    <textarea type="text" name="qnaContent" value={input.qnaContent} onChange={changeInput} className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className='btn btn-success me-2' onClick={saveInput}>
                                등록
                            </button>
                            <button className='btn btn-danger' onClick={cancelInput}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Qna;

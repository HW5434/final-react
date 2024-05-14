import React, { useCallback, useEffect, useRef, useState } from 'react';
import Jumbotron from '../Jumbotron';
import axios from '../utils/CustomAxios';
import { Modal } from 'bootstrap';
import './Qna.css';
import Wrapper from '../Home/Wrapper';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';



function Qna() {
    //페이징 시스템 구현하기
    const [page, setPage] = useState(1);//현재 페이지 번호
    const [size] = useState(10);//목록 개수
    const [count, setCount] = useState(0);

    const [qnas, setQnas] = useState([]);
    const [input, setInput] = useState({
        qnaNo: "",
        qnaTitle: "",
        qnaContent: "",
        qnaAnswer: "N",
        qnaTarget: null
    });

    const [admin, setAdmin] = useState({
        qnaNo: "",
        qnaTitle: "",
        qnaContent: "",
        qnaTarget : 0
    });

    const [expandedQna, setExpandedQna] = useState(null);

    // 최초 로드
    useEffect(() => {
        loadData();
    }, [page, size]);

    // 데이터 로드
    const loadData = useCallback(async () => {
        const resp = await axios.get(`/qna/page/${page}/size/${size}`);
        setQnas(resp.data.list);
        setCount(resp.data.pageVO.totalPage);//페이지 숫자 표시
    }, [page, size]);

    // 삭제
    const deleteQna = useCallback(async (target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;
        const resp = await axios.delete("/qna/" + target.qnaNo);
        loadData();
    }, [qnas]);

    //관리자 일때
    const changeAdmin = useCallback((e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });
    }, [admin]);

    //관리자글 등록
    const saveAdmin = useCallback(async () => {
        // 서버로 admin 상태 전송
        const resp = await axios.post("/qna/admin", admin);
        loadData();
    }, [admin]);

    // 입력 값 변경
    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);
    // 등록
    const saveInput = useCallback(async () => {
        const resp = await axios.post("/qna/", input);
        loadData();
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

    // 입력 취소
    const cancelInput = useCallback(() => {
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if (choice === false) return;
        clearInput();
        closeModal();
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



    //페이지네이션
    const previousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1)); // 이전 페이지로 이동하는 함수
    };

    const nextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, count)); // 다음 페이지로 이동하는 함수
    };

    const pageChange = (pageNumber) => {
        setPage(pageNumber); // 페이지 번호를 직접 선택하여 이동하는 함수
    };

    // 화면 출력
    return (
        <>
            <Jumbotron title="질문글 테스트" />

            <Wrapper>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        {/* 검색창 */}
                        <div className='row'>
                            <div className='col mt-3 mb-3'>
                                <span>검색창</span>
                            </div>
                        </div>

                        {/* 목록 */}
                        글 작성자

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
                                            <div className={expandedQna === qna.qnaNo ? "accordion-collapse collapse show" : "accordion-collapse collapse"} id={`collapse${qna.qnaNo}`} aria-labelledby={`heading${qna.qnaNo}`} data-bs-parent={`#accordion${qna.qnaNo}`}>
                                                {/* 답변 영역 */}
                                                <div className="accordion-body text-start">
                                                    {/* 답변 영역 */}
                                                    <div className='row'>
                                                        <div className='col m-3'>
                                                            <h1 className='text'>질문글 내용</h1>
                                                        </div>
                                                    </div>

                                                    <div className="accordion m-3" id="accordionExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    <span className='btn btn-positive'>
                                                                        <label>
                                                                            답변등록 [클릭시]
                                                                            </label>
                                                                    </span>
                                                                </button>
                                                            </h2>

                                                            {/* 관리자 등록 글 */}
                                                            < div className="row m-3" >
                                                                <div className="col">
                                                                    <h2>글 제목</h2>
                                                                    <input type="text" name="qnaTitle" value={admin.qnaTitle} onChange={changeAdmin} className="form-control" />
                                                                </div>
                                                            </div>

                                                            <div className="row m-3">
                                                                <div className="col">
                                                                    <h2>글 내용</h2>
                                                                    <textarea type="text" style={{ minHeight: '500px', maxHeight: '500px' }} name="qnaContent" value={admin.qnaContent} onChange={changeAdmin} className="form-control" />
                                                                </div>
                                                            </div>

                                                            < div className="row m-3" >
                                                                <div className="col">
                                                                    <h2>글 제목</h2>
                                                                    <input type="text" name="qnaTarget" value={qna.qnaNo} onChange={changeAdmin} className="form-control" />
                                                                </div>
                                                            </div>

                                                            
                                                            <div className="row m-3">
                                                                <div className="col">
                                                                    <div className="modal-footer">
                                                                        <button className='btn btn-success me-2' onClick={saveAdmin}>
                                                                            등록
                                                                        </button>

                                                                        <button className='btn btn-danger' onClick={e => deleteQna(qna)}>
                                                                            삭제버튼
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <div className="row text-start">

                                                            <div className="row">
                                                                <div className="col">
                                                                    <h2>답글 차수</h2>
                                                                    <h2>글번호 : {qna.qnaNo}</h2>
                                                                    <input type="text" name="qnaTarget" value={input.qnaTarget || qna.qnaNo} onChange={changeInput} className="form-control" />
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
                                                                        <button className='btn btn-danger me-2' onClick={cancelInput}>
                                                                            취소
                                                                        </button>
                                                                        <button className='btn btn-primary' onClick={e => deleteQna(qna)}>
                                                                            삭제버튼
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            



                                                        </div>
                                                    </div>
                                                </div> */}
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div >

                    </div>
                </div >
            </Wrapper>

            {/* 페이지네이션 UI */}
            <div className="row mt-2">
                <div className="col">
                    <nav aria-label="...">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={previousPage}>
                                    <GrFormPrevious />
                                </button>
                            </li>
                            {[...Array(count).keys()].map(pageNumber => (
                                <li key={pageNumber + 1} className={`page-item ${page === pageNumber + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => pageChange(pageNumber + 1)}>{pageNumber + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${page === count ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={nextPage}>
                                    <GrFormNext />
                                </button>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
            {/* 페이지네이션 UI 끝 */}



            {/* 모달 
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

            여기까지 모달코드
            */}

        </>
    );
}

export default Qna;

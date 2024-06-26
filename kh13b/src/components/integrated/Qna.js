import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Wrapper from '../Home/Wrapper'; //그룹
import { Modal } from 'bootstrap'; //부트스트랩
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'; //페이지네이션
import { useRecoilState, useRecoilValue } from 'recoil'; //리코일
import { loginGradeState, loginIdState } from '../utils/RecoilData'; //로그인 State
import { TbUserQuestion } from "react-icons/tb"; //질문글 마크
import { TbUserCheck } from "react-icons/tb"; //답변글 마크
import Jumbotron from '../Jumbotron'; //소개글
import axios from '../utils/CustomAxios'; //axios

//CSS
import './Qna.css'; //전용 css파일
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function Qna() {
    //State
    const [loginGrade] = useRecoilState(loginGradeState);
    const [page, setPage] = useState(1);//현재 페이지 번호
    const [size] = useState(10);//목록 개수
    const [count, setCount] = useState(0);
    const userId = useRecoilValue(loginIdState)//로그인 정보 불러오기 위한 함수
    const [qnas, setQnas] = useState([]);

    const [isOpen, setIsOpen] = useState(true); // 초기에는 열려있는 상태

    const toggleCollapse = () => {
        setIsOpen(!isOpen); // 상태를 반전하여 숨기기/보이기 토글
    }


    const [input, setInput] = useState({
        qnaNo: "",
        qnaTitle: "",
        qnaContent: "",
        qnaTarget: null
    }); //일반회원 등록 
    const [admin, setAdmin] = useState({
        qnaTitle: "",
        qnaContent: "",
        qnaTarget: 0
    }); //관리자 등록
    const [qnaTargetNo, setQnaTargetNo] = useState(null); //QnaNo 번호 추출

    //Effect
    useEffect(() => {
        loadData();
    }, [page, size]); // 최초 로드

    const loadData = useCallback(async () => {
        const resp = await axios.get(`/qna/page/${page}/size/${size}`);
        setQnas(resp.data.list);
        setCount(resp.data.pageVO.totalPage);//페이지 숫자 표시
    }, [page, size]); // 데이터 로드
    const deleteQna = useCallback(async (target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;
        const resp = await axios.delete("/qna/" + target.qnaNo);
        loadData();
    }, [qnas]); // 삭제
    const changeAdmin = useCallback((e) => {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        });
    }, [admin]); //관리자 일때

    const saveAdmin = useCallback(async () => {
        // 서버로 admin 상태 전송
        const resp = await axios.post("/qna/admin", {
            ...admin,
            qnaTarget: qnaTargetNo
        });
        loadData();
        clearAdmin();
    }, [admin, qnaTargetNo]); //관리자글 등록
    // 입력 값 변경
    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);
    const saveInput = useCallback(async () => {
        const resp = await axios.post("/qna/", input);
        loadData();
        closeModal();
    }, [input]); // 등록
    // 입력 값 초기화
    const clearInput = useCallback(() => {
        setInput({
            qnaNo: "",
            qnaTitle: "",
            qnaContent: "",
            qnaAnswer: ""
        });
    }, [input]);
    const clearAdmin = useCallback(() => {
        setAdmin({
        qnaTitle: "",
        qnaContent: ""
        });
    }, [admin]);
    const cancelInput = useCallback(() => {
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if (choice === false) return;
        clearInput();
        closeModal();
    }, [input]); // 입력 취소 [Modal]

    const bsModal = useRef();
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }, []); // Modal 열기
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
        clearInput();
    }, []); // Modal 닫기
    const selectToggle = useCallback((qnaNo) => {
        setQnaTargetNo(qnaTargetNo === qnaNo ? null : qnaNo);
    }, [qnaTargetNo]); // 토글버튼 클릭시 일부만 선택

    //페이지네이션
    const previousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };// 이전 페이지로 이동하는 함수
    const nextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, count));
    };// 다음 페이지로 이동하는 함수
    const pageChange = (pageNumber) => {
        setPage(pageNumber);
    };// 페이지 번호를 직접 선택하여 이동하는 함수

    const formats = [
        'font',
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'align',
        'color',
        'background',
        'size',
        'h1',
    ];
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                ],
            },
        };
    }, []);

    // 화면 출력
    return (
        <>
            <div className='qna-wrapper'>
                <Wrapper>
                    <div className="row justify-content-center">
                        <div className="col-md-11 text-start">
                            <Jumbotron title="Q & A 게시판" />
                            <div className='row-4 mt-3 mb-3'>
                                <div className='col'>
                                    {qnas.map((qna) => (

                                        <div className="accordion accordion-flush" id={`accordion${qna.qnaNo}`} key={qna.qnaNo}>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <></>
                                                    {/* 목록 리스트 */}
                                                    <button className="accordion-button collapsed" type="button" onClick={() => selectToggle(qna.qnaNo)}>
                                                        {/* 답변글 일반글 유무에 따라 디자인 변경 */}
                                                        {qna.qnaAnswer === 'Y' ? (
                                                            <>
                                                                <TbUserQuestion className='Question-Q' />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <TbUserCheck className='Question-N' />
                                                            </>
                                                        )}
                                                        &nbsp;&nbsp;&nbsp;
                                                        <span>{qna.qnaTitle}</span>
                                                    </button>
                                                </h2>

                                                {/* 클릭 했을때 보이는 질문글의 내용들 */}
                                                <div className={qnaTargetNo === qna.qnaNo ? "accordion-collapse collapse show" : "accordion-collapse collapse"}
                                                    id={`collapse${qna.qnaNo}`}
                                                    aria-labelledby={`heading${qna.qnaNo}`}
                                                    data-bs-parent={`#accordion${qna.qnaNo}`}>
                                                    {/* 답변 관리자 영역 */}

                                                    {loginGrade === '관리자' && qna.qnaTarget === null ? (
                                                        <>
                                                            <div className="accordion-body text-start">
                                                                {/* 답변 영역 */}
                                                                <div className="row justify-content-center text-start">
                                                                    <div className="col-md-11">
                                                                        <div className="row mt-1">
                                                                            <div className="col">

                                                                                <div className="col">
                                                                                    <div className="mt-5">
                                                                                        {/* 공지글 제목 */}
                                                                                        <h2><strong>
                                                                                            {qna.qnaTitle}
                                                                                        </strong>
                                                                                            <hr />
                                                                                        </h2>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col">
                                                                                    <div className="my-5">
                                                                                        {/* 공지글 내용 */}
                                                                                        <h3>
                                                                                            <div
                                                                                                style={{ whiteSpace: 'pre-wrap' }}
                                                                                                dangerouslySetInnerHTML={{ __html: qna.qnaContent }}
                                                                                            />
                                                                                        </h3>
                                                                                        <hr className='mt-5' />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <div className="accordion m-3" id="accordionExample">
                                                                    <div className="accordion-item">
                                                                        <h2 className="accordion-header">
                                                                            <button className="accordion-button" type="button" onClick={toggleCollapse}>
                                                                                <span className='btn btn-positive'>
                                                                                    <label>
                                                                                        답변등록 {isOpen ? '' : ''}
                                                                                    </label>
                                                                                </span>
                                                                            </button>
                                                                        </h2>

                                                                        <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
                                                                            < div className="row m-3" >
                                                                                <div className="col">
                                                                                    <h4>답변글 제목</h4>
                                                                                    <input type="text" name="qnaTitle" value={admin.qnaTitle} onChange={changeAdmin} className="form-control" />
                                                                                </div>
                                                                            </div>

                                                                            <div className="row m-3">
                                                                                <div className="col mt-3">
                                                                                    <h4>답변글 내용</h4>
                                                                                    <textarea type="text" style={{ minHeight: '500px', maxHeight: '500px', whiteSpace: 'pre-wrap' }} name="qnaContent" value={admin.qnaContent} onChange={changeAdmin} className="form-control" />
                                                                                </div>
                                                                            </div>

                                                                            <div className="row m-3">
                                                                                <div className="col">
                                                                                    <div className="modal-footer">
                                                                                        <button className='btn btn-success me-2' onClick={saveAdmin}>
                                                                                            등록
                                                                                        </button>

                                                                                        <button className='btn btn-danger' onClick={e => deleteQna(qna)}>
                                                                                            게시글 삭제
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* 답변 이 없을때 글 내용 */}

                                                            <Wrapper>

                                                                <div className="col p-3">

                                                                    <div className="row justify-content-center text-start">
                                                                        <div className="col-md-11">
                                                                            <div className="col">
                                                                                <div className="mt-4">
                                                                                    {/* 공지글 제목 */}
                                                                                    <h3><strong>
                                                                                        {qna.qnaTitle}

                                                                                    </strong>
                                                                                    </h3>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col">
                                                                                <hr />
                                                                                <div className="my-5">
                                                                                    {/* 공지글 내용 */}
                                                                                    <h4>
                                                                                    <div
                                                                                                style={{ whiteSpace: 'pre-wrap' }}
                                                                                                dangerouslySetInnerHTML={{ __html: qna.qnaContent }}
                                                                                            />
                                                                                    </h4>
                                                                                </div>
                                                                                <hr />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </Wrapper>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div >
                            <Wrapper>
                                <div className="row">
                                    <div className="col w-25 d-flex justify-content-start align-items-center">
                                    </div>

                                    {/* 페이지네이션 UI */}
                                    <div className="col-auto w-50 d-flex justify-content-center align-items-center">
                                        <div className="row mt-3">
                                            <div className="col my-2">
                                                <nav aria-label="...">
                                                    <ul className="pagination">
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
                                    </div>
                                    {/* 페이지네이션 UI 끝 */}

                                    <div className="col w-25 d-flex justify-content-end align-items-center">
                                        {/* 추가 버튼 */}
                                        {loginGrade !== '' ? (
                                                    <>
                                                    <button className="btn btn-primary ms-3" onClick={openModal}>
                                                        문의글 등록
                                                    </button>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}

                                    </div>
                                </div>
                            </Wrapper>
                        </div>
                    </div >

                </Wrapper>



                {/* 모달  */}
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
                                        <ReactQuill
                                            theme="snow"
                                            modules={modules}
                                            formats={formats}
                                            value={input.qnaContent}
                                            onChange={(content) => setInput({ ...input, qnaContent: content })}
                                            className="quill-editor"
                                        />
                                        {/* <textarea style={{whiteSpace : "pre-wrap"}} type="text" name="qnaContent" value={input.qnaContent} onChange={changeInput} className="form-control" /> */}
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

                {/* 여기까지 모달코드 */}

            </div>
        </>
    );
}

export default Qna;

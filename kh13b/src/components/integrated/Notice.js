import { useCallback, useEffect, useRef, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from '../utils/CustomAxios';
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
import { MdDelete } from "react-icons/md";
import Wrapper from "../Home/Wrapper";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { loginGradeState, loginIdState } from "../utils/RecoilData";
import { useRecoilState, useRecoilValue } from "recoil";

import './Notice.css';

const Notice = () => {

    //state
    const [loginGrade] = useRecoilState(loginGradeState);
    const [notices, setNotices] = useState([]); //공지사항
    const [page, setPage] = useState(1);//현재 페이지 번호
    const [size, setSize] = useState(10);//목록 개수
    const [count, setCount] = useState(0); //페이징 시스템 구현하기
    const [input, setInput] = useState({
        noticeNo: "",
        noticeTitle: "",
        noticeContent: "",
        noticeWdate: 0,
        noticeView: 0
    }); //등록




    useEffect(() => {
        loadData();
    }, [page, size]);

    const loadData = useCallback(async () => {
        const resp = await axios.get(`/notice/page/${page}/size/${size}`);
        setNotices(resp.data.list);
        setCount(resp.data.pageVO.totalPage);//페이지 숫자 표시
    }, [page, size]);

    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    const saveInput = useCallback(async () => {
        const resp = await axios.post("/notice/", input);
        loadData();
        closeModal();
    }, [input]);

    //Modal에 관한 코드
    const bsModal = useRef();

    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }, []);
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, []);
    // 입력 취소
    const cancelInput = useCallback(() => {
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if (choice === false) return;
        clearInput();
        closeModal();
    }, [input]);

    // 입력 값 초기화
    const clearInput = useCallback(() => {
        setInput({
            noticeNo: "",
            noticeTitle: "",
            noticeContent: "",
            noticeWdate: 0,
            noticeView: 0
        });
    }, [input]);
    const deleteNotice = useCallback(async (target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;
        const resp = await axios.delete("/notice/" + target.noticeNo);
        loadData();
    }, []); //삭제

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



    return (
        <>
            <div className="notice-wrapper">
            <Wrapper>
                <div className="row justify-content-center">
                    <div className="col-md-11 text-start">
                        <Jumbotron title="공지사항" content="공지글에 대한 페이지입니다." />
                        <div className="row mt-5">
                            <div className="col">
                                <table className="table table-notice text-center">
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th width="60%">제목</th>
                                            <th>작성날짜</th>
                                            <th>조회수</th>
                                            {loginGrade === '관리자' ? (
                                                <th>삭제버튼</th>
                                            ) : (
                                                <></>
                                            )}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {notices.map((notice) => (
                                            <tr key={notice.noticeNo}>
                                                <td>{notice.noticeNo}</td>
                                                <td className="text-start">
                                                    <Link to={`/notice/${notice.noticeNo}`}>
                                                        {notice.noticeTitle}
                                                    </Link>
                                                </td>
                                                <td>{notice.noticeWdate}</td>
                                                <td>{notice.noticeView}</td>
                                                {/* 관리자 */}
                                                {loginGrade === '관리자' ? (
                                                    <td>
                                                        <MdDelete className="text-danger" onClick={e => deleteNotice(notice)} />
                                                    </td>
                                                ) : (
                                                    <></>
                                                )}

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

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
                                    <button className="btn btn-primary ms-3" onClick={openModal}>
                                        공지글 등록
                                    </button>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                </div>
            </Wrapper>

            {/* 모달영역 */}
            {/* 나머지 모달 코드 */}
            <div ref={bsModal} className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">공지글 쓰기</h1>
                            <button type="button" className="btn-close" aria-label="Close" onClick={cancelInput}></button>
                        </div>
                        <div className="modal-body">
                            {/* 등록 화면 */}
                            <div className="row">
                                <div className="col">
                                    <label>글 제목</label>
                                    <input type="text" name="noticeTitle" value={input.noticeTitle} onChange={e => changeInput(e)} className="form-control" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label>글 내용</label>
                                    <textarea type="text" name="noticeContent" value={input.noticeContent} onChange={e => changeInput(e)} className="form-control" />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className='btn btn-success me-2' onClick={e => saveInput(e)}>
                                    등록
                                </button>
                                <button className='btn btn-danger' onClick={closeModal}>
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>

    );
}

export default Notice;
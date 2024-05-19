import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from '../utils/CustomAxios';
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
import { MdDelete } from "react-icons/md";
import Wrapper from "../Home/Wrapper";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { loginGradeState } from "../utils/RecoilData"; // Removed unused import
import { useRecoilState } from "recoil";

import './Notice.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const Notice = () => {
    const [loginGrade] = useRecoilState(loginGradeState);
    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [count, setCount] = useState(0);
    const [input, setInput] = useState({
        noticeNo: "",
        noticeTitle: "",
        noticeContent: "", // Removed default value for noticeContent
        noticeWdate: 0,
        noticeView: 0
    });

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

    useEffect(() => {
        loadData();
    }, [page, size]);

    const loadData = useCallback(async () => {
        const resp = await axios.get(`/notice/page/${page}/size/${size}`);
        setNotices(resp.data.list);
        setCount(resp.data.pageVO.totalPage);
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

    const bsModal = useRef();

    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }, []);

    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, []);

    const cancelInput = useCallback(() => {
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if (choice === false) return;
        clearInput();
        closeModal();
    }, [input]);

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
    }, []);

    const previousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const nextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, count));
    };

    const pageChange = (pageNumber) => {
        setPage(pageNumber);
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
                                                <th width="10%">번호</th>
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
                                                    {loginGrade === '관리자' && (
                                                        <td>
                                                            <MdDelete style={{ fontSize: '1.3em', color: 'red' }}
                                                                             className="text-danger" onClick={e => deleteNotice(notice)} />
                                                        </td>
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

                                    <div className="col w-25 d-flex justify-content-end align-items-center">
                                        <button className="btn btn-primary ms-3" onClick={openModal}>
                                            공지글 등록
                                        </button>
                                    </div>
                                </div>
                            </Wrapper>
                        </div>
                    </div>
                </Wrapper>

                <div ref={bsModal} className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">공지글 쓰기</h1>
                                <button type="button" className="btn-close" aria-label="Close" onClick={cancelInput}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <label>글 제목</label>
                                        <input type="text" name="noticeTitle" value={input.noticeTitle} onChange={changeInput} className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label>글 내용</label>
                                            <ReactQuill
                                                theme="snow"
                                                modules={modules}
                                                formats={formats}
                                                value={input.noticeContent}
                                                onChange={(content) => setInput({ ...input, noticeContent: content })}
                                                className="quill-editor"
                                            />
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button className='btn btn-success me-2' onClick={saveInput}>
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

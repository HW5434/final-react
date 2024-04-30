import { useCallback, useEffect, useRef, useState } from 'react';
import Jumbotron from '../Jumbotron';
import axios from '../utils/CustomAxios';
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Modal } from 'bootstrap';
import { IoIosArrowDown } from "react-icons/io";

function Qna() {

    //State
    const [qnas, setQnas] = useState([]);
    const [input, setInput] = useState({
        qnaNo: "",
        qnaTitle: "",
        qnaContent: ""
    });
    //최소 1회
    useEffect(() => {
        loadData();
    }, []);

    // CallBack 함수
    const loadData = useCallback(async () => {
        const resp = await axios.get("/qna/");
        setQnas(resp.data);
    }, [qnas]);
    //삭제
    const deleteQna = useCallback(async (target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        const resp = await axios.delete("/qna/" + target.qnaNo);
        loadData();
    }, [qnas]);
    //등록
    const saveInput = useCallback(async () => {
        const resp = await axios.post("/qna/", input);
        loadData();
    }, [input])

    const cancelInput = useCallback(() => {
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if (choice === false) return;
        clearInput();
        closeModal();
    }, [input])

    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    const clearInput = useCallback(() => {
        setInput({
            qnaNo: "",
            qnaTitle: "",
            qnaContent: ""
        });
    }, [input]);

    const bsModal = useRef();

    //Modal
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

    //openToggle
    const openToggle = useCallback(() => {
        loadData();
    }, [qnas]);

    //화면 출력
    return (
        <>
            <Jumbotron title="질문글 테스트" content="글에 대한 내용을" />

            {/* 목록 */}
            <div className='row-4'>
                <div className='col'>
                    <table className='table table-hover text-center'>

                        <thead>
                            <tr>
                                <th width="10%">번호</th>
                                <th>글제목</th>
                                <th width="15%">삭제버튼</th>
                                <th width="15%">토글버튼</th>
                            </tr>
                        </thead>

                        <tbody>
                            {qnas.map((qna) => (
                                <tr key={qna.qnaNo}>
                                    <td>{qna.qnaNo}</td>
                                    <td className='text-start'>{qna.qnaTitle}</td>
                                    <td>
                                        <RiDeleteBack2Fill className='bnt text-danger' onClick={e => deleteQna(qna)} />
                                    </td>
                                    <td>
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <IoIosArrowDown className='text-center' />
                                        </button>
                                    </td>
                                    <div id="collapseOne" class="row accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div class="col accordion-body">
                                            {qna.qnaContent}
                                        </div>
                                    </div>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
            </div>



            {/* 추가 버튼 */}
            <div className="row mt-4">
                <div className="col text-end">
                    <button className="btn btn-primary"
                        onClick={e => openModal()}>
                        신규 등록
                    </button>
                </div>
            </div>

            {/* Modal */}
            <div ref={bsModal} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">질문글 쓰기</h1>
                            <button type="button" className="btn-close" aria-label="Close"
                                onClick={e => cancelInput()}></button>
                        </div>
                        <div className="modal-body">
                            {/* 등록 화면 */}
                            <div className="row">
                                <div className="col">
                                    <label>글 제목</label>
                                    <input type="text" name="qnaTitle"
                                        value={input.qnaTitle}
                                        onChange={e => changeInput(e)}
                                        className="form-control" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label></label>
                                    <textarea type="text" name="qnaContent"
                                        value={input.qnaContent}
                                        onChange={e => changeInput(e)}
                                        className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className='btn btn-success me-2' onClick={e => saveInput()}>
                                등록
                            </button>
                            <button className='btn btn-danger' onClick={e => cancelInput()}>
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
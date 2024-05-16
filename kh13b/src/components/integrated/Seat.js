import { useCallback, useEffect, useState, useRef } from 'react';
import Jumbotron from '../Jumbotron';
import axios from '../utils/CustomAxios';

import { MdDelete, MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { TbPencilCancel } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";

import { Modal } from "bootstrap";

import { SeatGroup } from "hacademy-cinema-seat";

const Seat = () => {
    const [seats, setSeats] = useState([]);
    const [input, setInput] = useState({
        seatNo: "",
        seatCol: "",
        seatRow: "",
        seatLevel: "",
    })
    const [backup, setBackup] = useState(null);//수정 시 복원을 위한 백업

    useEffect(() => {
        loadData();
    }, []);

    const loadData = useCallback(async () => {
        const resp = await axios.get("/seat/");
        setSeats(resp.data)
    }, [seats]);

    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    const saveInput = useCallback(async () => {
        //입력값에 대한 검사 코드가 필요하다면 이자리에 추가하고 차단!
        //if(검사 겨로가 이상한 데이터가 입력되어 있다면s) return;

        //input에 들어있는 내용을 서버로 전송하여 등록한 뒤 목록 갱신 + 모달 닫기
        //const resp = await axios.post(주소, 데이터, (옵션(생략가능)));
        const resp = await axios.post("/seat/", input);
        loadData();
        clearInput();
        closeModal();
    }, [input]);

    const deleteSeat = useCallback(async (target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        //target에 있는 내용을 서버에 지워달라고 요청하고 목록을 다시 불러온다
        const resp = await axios.delete("/seat/" + target.seatNo);
        loadData();

    }, [seats]);

    const cancelInput = useCallback(() => {
        const choice = window.confirm("작성을 취소하시겠습니까?");
        if (choice === false) return;
        clearInput();
        closeModal();
    }, [input]);

    const clearInput = useCallback(() => {
        setInput({
            seatNo: "",
            seatCol: "",
            seatRow: "",
            seatLevel: ""
        });
    }, [input]);

    const editSeat = useCallback((target) => {
        //1. seats 복제한다
        const copy = [...seats]; //전개연산자(깊은 복사 100프로 카피)

        //(+추가) 이미 수정중인 항목이 있을 수 있으므로 해당 항목은 취소 처리가 가능하도록 구현
        const recover = copy.map(seat => {
            if (seat.edit === true) {//수정 중인 항목이 발견된다면
                return { ...backup, edit: false };//백업으로 갱신+ 수정모드 취소
            }
            else {
                return { ...seat };//그대로
            }
        });

        //(+추가) 나중을 위해 target을 백업해둔다(target은 수정버튼 누른 항목)
        setBackup({ ...target });

        //2. recover를 고친다
        //- copy 중에서 target과 동일한 정보를 가진 항목을 찾아서 edit : true로 만든다
        //- 배열을 변환 시켜야 하므로 map 함수를 사용한다
        const copy2 = recover.map(seat => {
            //target : 수정버튼을 누른  좌석정보, seat : 현재 회차의 좌석정보
            if (target.seatNo === seat.seatNo) {//target이랑 seat가 동일하다면//원하는 정보일 경우

                return {
                    ...seat,//나머지 정보는 유지하되
                    edit: true,
                };
            }
            else {//아니라면/원하는 정보가 아닐 경우
                return { ...seat };//데이터를 그대로 복제하여 반환
            }
        })
        //3. copy를 seats에 덮어쓰기 한다
        setSeats(copy2);
    }, [seats]);

    //수정창 취소
    const cancelEditSeat = useCallback((target) => {
        //1. seats 복제한다
        const copy = [...seats]; //전개연산자(깊은 복사 100프로 카피)
        //2. copy를 고친다
        //- copy 중에서 target과 동일한 정보를 가진 항목을 찾아서 edit : true로 만든다
        //- 배열을 변환 시켜야 하므로 map 함수를 사용한다
        const copy2 = copy.map(seat => {
            //target : 수정버튼을 누른 좌석 정보, seat : 현재 회차의 좌석정보
            if (target.seatNo === seat.seatNo) {//target이랑 seat가 동일하다면//원하는 정보일 경우

                return {
                    ...backup,//백업 정보를 전달(다른 창 열면 취소되어야하니까)
                    edit: false,//edit 관련된 처리를 추가하여 반환
                };
            }
            else {//아니라면/원하는 정보가 아닐 경우
                return { ...seat };//데이터를 그대로 복제하여 반환
            }
        })
        //3. copy를 seats 덮어쓰기 한다
        setSeats(copy2);
    }, [seats]);

    const changeSeat = useCallback((e, target) => {
        const copy = [...seats];//복사! 원본 건들면 안되니까
        const copy2 = copy.map(seat => {
            if (target.seatNo === seat.seatNo) {//이벤트 발생한 좌석이라면
                return {
                    ...seat,//나머지 정보는 유지하되,
                    [e.target.name]: e.target.value//단, 입력항목만 교체
                };
            }
            else {//다른 학생이라면
                return { ...seat };//현상유지
            }
        });
        setSeats(copy2);

    }, [seats]);

    //수정된 결과를 저장 + 목록갱신 + 수정모드 해제
    const saveEditSeat = useCallback(async (target) => {
        //서버에 target을 전달하여 수정 처리
        const resp = await axios.patch("/seat/", target);
        //목록 갱신
        loadData();
    }, [seats]);

    //ref + modal
    const bsModal = useRef();//리모컨
    const openModal = useCallback(() => {
        const modal = new Modal(bsModal.current);
        modal.show();
    }, [bsModal]);
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);//기존에 잇는 모달 찾아서(가져와서 instance) 닫아라!
        modal.hide();
    }, [bsModal]);

    return (
        <>
            <Jumbotron title="좌석" />


            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">

                            <div className='row mt-4'>
                                <div className='col'>
                                    <SeatGroup map={seats} setMap={setSeats}
                                        fields={{
                                            no: 'seatNo',
                                            row: 'seatCol',
                                            col: 'seatRow',
                                            grade: 'seatLevel',
                                            reserved: 'seatReserved',
                                            disabled: 'seatDisabled',
                                            checked: 'seatChecked',
                                        }}
                                        rows={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                        cols={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                        showNames
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>




            {/* 목록 출력(데이터출력(표)) */}

            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">

                            {/* 신규등록 버튼(모달띄우기) */}
                            <div className="row mt-4 text-end">
                                <div className="col">
                                    <button className="btn btn-primary" onClick={e => openModal()}>
                                        <FaPlus />
                                        &nbsp;좌석등록
                                    </button>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <table className="table">
                                        <thead className="text-center">
                                            <tr className="text-center">
                                                <th>좌석식별자</th>
                                                <th>좌석 열번호</th>
                                                <th>좌석 행번호</th>
                                                <th>좌석 등급</th>
                                                <th>관리</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {seats.map(seat => (
                                                <tr key={seat.seatNo} className="text-center">
                                                    {seat.edit === true ? (
                                                        <>
                                                            <td>{seat.seatNo}</td>
                                                            <td>
                                                                <input type="text" className="form-control"
                                                                    value={seat.seatCol} name="seatCol"
                                                                    onChange={e => changeSeat(e, seat)} />
                                                            </td>
                                                            <td>
                                                                <input type="text" className="form-control"
                                                                    value={seat.seatRow} name="seatRow"
                                                                    onChange={e => changeSeat(e, seat)} />
                                                            </td>
                                                            <td>
                                                                <input type="text" className="form-control"
                                                                    value={seat.seatLevel} name="seatLevel"
                                                                    onChange={e => changeSeat(e, seat)} />
                                                            </td>
                                                            <td>
                                                                <FaCheck className="text-success me-2"
                                                                    onClick={e => saveEditSeat(seat)} />
                                                                <TbPencilCancel className="text-danger"
                                                                    onClick={e => cancelEditSeat(seat)} />
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td>{seat.seatNo}</td>
                                                            <td>{seat.seatCol}</td>
                                                            <td>{seat.seatRow}</td>
                                                            <td>{seat.seatLevel}</td>
                                                            <td>
                                                                <FaEdit className="text-warning me-2"
                                                                    onClick={e => editSeat(seat)} />
                                                                <MdDelete className="text-danger"
                                                                    onClick={e => deleteSeat(seat)} />
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Modal  */}
            <div ref={bsModal} className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">좌석 등록</h1>
                            <button type="button" className="btn-close" onClick={e => cancelInput()} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* 등록 화면 */}
                            <div className="row mt-4">
                                <div className="col">
                                    {/* <label>좌석 식별자</label> */}
                                    <input type="hidden" name="seatNo"
                                        value={input.seatNo}
                                        onChange={e => changeInput(e)}
                                        className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>좌석 열번호</label>
                                    <input type="text" name="seatCol"
                                        value={input.seatCol}
                                        onChange={e => changeInput(e)}
                                        className="form-control" />
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col">
                                    <label>좌석 행번호</label>
                                    <input type="text" name="seatRow"
                                        value={input.seatRow}
                                        onChange={e => changeInput(e)}
                                        className="form-control" />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label>좌석 등급</label>
                                    <select name="seatLevel" value={input.seatLevel} onChange={e => changeInput(e)} className="form-control">
                                        <option value="VIP">VIP</option>
                                        <option value="R">R</option>
                                        <option value="S">S</option>
                                        <option value="A">A</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success me-2"
                                onClick={e => saveInput(e)}>
                                <FaSave />
                                &nbsp;등록
                            </button>
                            <button className="btn btn-danger"
                                onClick={e => cancelInput(e)}>
                                <MdCancel />
                                &nbsp;취소
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Seat;
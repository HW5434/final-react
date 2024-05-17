import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../../Jumbotron";
import axios from "../../utils/CustomAxios";

import { MdDelete, MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { TbPencilCancel } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const AdminMember = () => {
    const [members, setMembers] = useState([]);
    const [input, setInput] = useState({
        memberNo: "",
        memberName: "",
        memberId: "",
        memberContact: "",
        memberGrade: "",
        memberEmail: "",
        memberBirth: ""
    });
    const [backup, setBackup] = useState(null);
    const [page, setPage] = useState(1);
    const [size] = useState(10); // 페이지당 항목 수
    const [count, setCount] = useState(0); // 총 페이지 수

    useEffect(() => {
        loadData();
    }, [page]);

    const loadData = useCallback(async () => {
        try {
            const resp = await axios.get("/member/");
            setMembers(resp.data);
            setCount(Math.ceil(resp.data.length / size)); // 총 페이지 수 계산
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }, [size]);

    const changeInput = useCallback((e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }, [input]);

    const saveInput = useCallback(async () => {
        const resp = await axios.post("/member/", input);
        loadData();
        clearInput();
    }, [input]);

    const deleteMember = useCallback(async (target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;
    
        try {
            const resp = await axios.delete("/member/" + target.memberId);
            if (resp && resp.status === 200) {
                loadData();
            } else {
                // 서버에서 오류 응답이 오는 경우 또는 응답이 성공적이지 않은 경우 처리
                console.error("Failed to delete member.");
            }
        } catch (error) {
            // 네트워크 오류 등으로 인한 요청 실패
            console.error("Failed to delete member:", error);
        }
    }, [members]);
    

    const clearInput = useCallback(() => {
        setInput({
            memberNo: "",
            memberName: "",
            memberId: "",
            memberContact: "",
            memberGrade: "",
            memberEmail: "",
            memberBirth: ""
        });
    }, []);

    const editMember = useCallback((target) => {
        const copy = [...members];

        const recover = copy.map(member => {
            if (member.edit === true) {
                return { ...backup, edit: false };
            }
            return { ...member };
        });

        setBackup({ ...target });

        const copy2 = recover.map(member => {
            if (target.memberNo === member.memberNo) {
                return {
                    ...member,
                    edit: true,
                };
            }
            return { ...member };
        });

        setMembers(copy2);
    }, [members, backup]);

    const cancelEditMember = useCallback((target) => {
        const copy = [...members];
        const copy2 = copy.map(member => {
            if (target.memberNo === member.memberNo) {
                return {
                    ...backup,
                    edit: false,
                };
            }
            return { ...member };
        });
        setMembers(copy2);
    }, [members, backup]);

    const changeMember = useCallback((e, target) => {
        const copy = [...members];
        const copy2 = copy.map(member => {
            if (target.memberNo === member.memberNo) {
                return {
                    ...member,
                    [e.target.name]: e.target.value
                };
            }
            return { ...member };
        });
        setMembers(copy2);
    }, [members]);

    const saveEditMember = useCallback(async (target) => {
        const resp = await axios.patch("/member/", target);
        loadData();
    }, [members]);

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
            <Jumbotron title="회원관리" />
            <div className="container w-100 justify-content-end mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="shadow-lg p-3 my-3 bg-light rounded w-100 h-100">
                            <table className='table text-center align-middle justify-content-end'>
                                <thead>
                                    <tr>
                                        <th width="100">회원 번호</th>
                                        <th>회원 이름</th>
                                        <th>회원 아이디</th>
                                        <th>회원 전화번호</th>
                                        <th>회원 등급</th>
                                        <th>회원 이메일</th>
                                        <th>회원 생년월일</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center align-middle justify-content-end">
                                    {members.slice((page - 1) * size, page * size).map(member => (
                                        <tr key={member.memberNo}>
                                            {member.edit === true ? (
                                                <>
                                                    <td>{member.memberNo}</td>
                                                    <td>
                                                        <input type="text" className="form-control"
                                                            value={member.memberName} name="memberName"
                                                            onChange={e => changeMember(e, member)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control"
                                                            value={member.memberId} name="memberId"
                                                            onChange={e => changeMember(e, member)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control"
                                                            value={member.memberContact} name="memberContact"
                                                            onChange={e => changeMember(e, member)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control"
                                                            value={member.memberGrade} name="memberGrade"
                                                            onChange={e => changeMember(e, member)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control"
                                                            value={member.memberEmail} name="memberEmail"
                                                            onChange={e => changeMember(e, member)} />
                                                    </td>
                                                    <td>
                                                        <input type="text" className="form-control"
                                                            value={member.memberBirth} name="memberBirth"
                                                            onChange={e => changeMember(e, member)} />
                                                    </td>
                                                    <td>
                                                        <FaCheck className="text-success me-2"
                                                            onClick={e => saveEditMember(member)} />
                                                        <TbPencilCancel className="text-danger"
                                                            onClick={e => cancelEditMember(member)} />
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td style={{ padding: '20px' }}>{member.memberNo}</td>
                                                    <td>{member.memberName}</td>
                                                    <td>{member.memberId}</td>
                                                    <td>{member.memberContact}</td>
                                                    <td>{member.memberGrade}</td>
                                                    <td>{member.memberEmail}</td>
                                                    <td>{member.memberBirth}</td>
                                                    <td>
                                                        <FaEdit className="text-warning me-2"
                                                            onClick={e => editMember(member)} />
                                                        <MdDelete className="text-danger"
                                                            onClick={e => deleteMember(member)} />
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AdminMember;

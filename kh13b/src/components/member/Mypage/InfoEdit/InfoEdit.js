import { useCallback, useEffect, useState } from "react";
import axios from "../../../utils/CustomAxios";
import './InfoEdit.css';

const InfoEdit = ({ memberId }) => {
    const [infoEdits, setInfoEdits] = useState([]);
    const [input, setInput] = useState({
        memberName: "",
        memberPw: "",
        memberContact: "",
        memberBirth: "",
        memberPost: "",
        memberAddress1: "",
        memberAddress2: "",
    });
    const [backup, setBackup] = useState(null);
    const [memberNo, setMemberNo] = useState([]); // memberNo 상태 추가

    const loadData = useCallback(async () => {
        const resp = await axios.get(`/member/getMember2/${memberId}`);
        setInput(resp.data);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]); // loadData 함수를 호출할 때마다 실행되도록 useEffect의 종속성에 추가

    const editMemberHandle = useCallback((target) => {
        // 기존걸 복사
        const copy = [...infoEdits];
        // 복원할 백업 설정
        setBackup(target);

        const recover = copy.map(member => {
            if (member.edit === true) {
                return { ...backup, edit: false };
            } else {
                return { ...member };
            }
        });

        const copy2 = recover.map(member => {
            if (target.memberNo === member.memberNo) {
                return {
                    ...member,
                    edit: true,
                };
            } else {
                return { ...member };
            }
        });

        setInfoEdits(copy2);
    }, [infoEdits, backup]);

    const cancelEditMember = useCallback(() => {
        const copy = [...infoEdits];
        const copy2 = copy.map(member => {
            if (backup && member.memberNo === backup.memberNo) { // 백업된 회원 정보를 찾아 취소
                return {
                    ...backup,
                    edit: false,
                };
            } else {
                return { ...member };
            }
        });

        setInfoEdits(copy2);
    }, [infoEdits, backup]);

    const changeMember = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveEditMember = useCallback(async () => {
        const resp = await axios.patch(`/member/`, input);
        loadData(); // 수정 후 데이터 다시 불러오기
    }, []);

    // view
    return (
        <div>
            <div>
                <div>
                    <label>이름</label>
                    <input type="text" className="input-control" value={input.memberName} name="memberName" onChange={e => changeMember(e)} />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input type="password" className="input-control" value={input.memberPw} name="memberPw" onChange={e => changeMember(e)} />
                </div>
                <div>
                    <label>연락처</label>
                    <input type="tel" className="input-control" value={input.memberContact} name="memberContact" onChange={e => changeMember(e)} />
                </div>
                <div>
                    <label>생년월일</label>
                    <input type="date" className="input-control" value={input.memberBirth} name="memberBirth" onChange={e => changeMember(e)} />
                </div>
                <div>
                    <label>우편번호</label>
                    <input type="text" className="input-control" value={input.memberPost} name="memberPost" onChange={e => changeMember(e)} />
                </div>
                <div>
                    <label>주소</label>
                    <input type="text" className="input-control" value={input.memberAddress1} name="memberAddress1" onChange={e => changeMember(e)} />
                </div>
                <div>
                    <label>상세주소</label>
                    <input type="text" className="input-control" value={input.memberAddress2} name="memberAddress2" onChange={e => changeMember(e)} />
                </div>
                
                <div className="infoEdit-button">
                    <button type="button" onClick={cancelEditMember}>취소</button>
                    <button type="button" onClick={() => saveEditMember()}>저장</button>
                </div>
            </div>
        </div>
    );
}

export default InfoEdit;



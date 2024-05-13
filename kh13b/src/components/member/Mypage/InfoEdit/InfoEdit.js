import { useCallback, useEffect, useState } from "react";
import axios from "../../../utils/CustomAxios";

const InfoEdit = () => {
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
        const resp = await axios.get(`/member/${memberNo}`);
        setInfoEdits(resp.data);
    }, [memberNo]);

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

    const changeMember = useCallback((e, target) => {
        const copy = [...infoEdits];
        const copy2 = copy.map(member => {
            if (target.memberNo === member.memberNo) {
                return {
                    ...member,
                    [e.target.name]: e.target.value
                };
            } else {
                return member;
            }
        });

        setInfoEdits(copy2);
    }, [infoEdits]);

    const saveEditMember = useCallback(async (member) => {
        const resp = await axios.patch(`/member/${member.memberNo}`, member);
        loadData(); // 수정 후 데이터 다시 불러오기
    }, [loadData]);

    // view
    return (
        <div>
            {infoEdits.map(member => (
                <div key={member.memberNo}>
                    <div>
                        <label>이름</label>
                        <input type="text" className="form-control" value={member.memberName} name="memberName" onChange={e => changeMember(e, member)} />
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <input type="password" className="form-control" value={member.memberPw} name="memberPw" onChange={e => changeMember(e, member)} />
                    </div>
                    <div>
                        <label>연락처</label>
                        <input type="tel" className="form-control" value={member.memberContact} name="memberContact" onChange={e => changeMember(e, member)} />
                    </div>
                    <div>
                        <label>생년월일</label>
                        <input type="date" className="form-control" value={member.memberBirth} name="memberBirth" onChange={e => changeMember(e, member)} />
                    </div>
                    <div>
                        <label>우편번호</label>
                        <input type="text" className="form-control" value={member.memberPost} name="memberPost" onChange={e => changeMember(e, member)} />
                    </div>
                    <div>
                        <label>주소</label>
                        <input type="text" className="form-control" value={member.memberAddress1} name="memberAddress1" onChange={e => changeMember(e, member)} />
                    </div>
                    <div>
                        <label>상세주소</label>
                        <input type="text" className="form-control" value={member.memberAddress2} name="memberAddress2" onChange={e => changeMember(e, member)} />
                    </div>
                    
                    <div>
                        <button onClick={cancelEditMember}>취소</button>
                        <button onClick={() => saveEditMember(member)}>저장</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default InfoEdit;



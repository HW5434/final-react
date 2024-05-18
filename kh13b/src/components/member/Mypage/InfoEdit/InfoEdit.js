import { useCallback, useEffect, useState } from "react";
import axios from "../../../utils/CustomAxios";
import './InfoEdit.css';
import Jumbotron from "../../../Jumbotron";

const InfoEdit = ({ memberId, layoutChange, setMember }) => {
    const [infoEdits, setInfoEdits] = useState([]);
    const [input, setInput] = useState({
        memberNo:"",
        memberName: "",
        memberContact: "",
        memberBirth: "",
        memberPost: "",
        memberAddress1: "",
        memberAddress2: "",
    });
    const [backup, setBackup] = useState(null);

    const loadData = useCallback(async () => {
        const resp = await axios.get(`/member/getMember2/${memberId}`);
        setInput(resp.data);
    }, []);

    useEffect(() => {
        loadData();
    }, []); 


    const cancelEditMember = useCallback(() => {
        layoutChange('my');
    }, []);

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
        setMember(resp.data);
    }, [input]);


    // 현재 날짜를 ISO 형식으로 가져오기
    const currentDate = new Date().toLocaleDateString('en-CA');

    // view
    return (
        <div>
            <Jumbotron title="내 정보 수정" />
            <div>
                <div className="mb-3">
                    <div className="col">
                        <label>이름</label>
                        <input type="text" className="input-control" value={input.memberName} name="memberName" onChange={e => changeMember(e)} />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="col">
                        <label>연락처</label>
                        <input type="tel" className="input-control" value={input.memberContact} name="memberContact" onChange={e => changeMember(e)} />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="col">
                        <label>생년월일</label>
                        <input type="date" className="input-control" value={input.memberBirth} name="memberBirth" onChange={e => changeMember(e)} max={currentDate} />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="col">
                        <label>우편번호</label>
                        <input type="text" className="input-control" value={input.memberPost || ""} name="memberPost" onChange={e => changeMember(e)} />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="col">
                        <label>주소</label>
                        <input type="text" className="input-control" value={input.memberAddress1 || ""} name="memberAddress1" onChange={e => changeMember(e)} />
                    </div>
                </div>
                <div className="mb-3">
                    <div className="col">
                        <label>상세주소</label>
                        <input type="text" className="input-control" value={input.memberAddress2 || ""} name="memberAddress2" onChange={e => changeMember(e)} />
                    </div>
                </div>
            </div>
                <div className="editButton-group">
                    <button className="cancel-button" type="button" onClick={e=> cancelEditMember(input)}>취소</button>
                    <button className="save-button" type="button" onClick={e=> saveEditMember(input)}>저장</button>
                </div>
        </div>
    );
}

export default InfoEdit;



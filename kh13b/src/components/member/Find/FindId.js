import { useState } from "react";
import axios from "../../utils/CustomAxios";
import Jumbotron from "../../Jumbotron";
import { useNavigate } from "react-router-dom";
import './Find.css';


const FindId = () => {

    const [input, setInput] = useState({ memberName:"", memberEmail:"" });

    const [findId, setFindId] = useState('');

    const navigator = useNavigate();

    const getFindId = async () => {
        await axios.post('/member/findId', input)
            .then((res) => {
                alert(`고객님의 정보와 일치하는 아이디입니다 : [${res.data.memberId}]`)
                setFindId(res.data.id);
                navigator('/login');
            }).catch((e) => {
                alert('입력하신 정보로 등록된 계정을 찾을 수 없습니다. 이름 또는 이메일을 다시 확인해주세요.');
            });
    };

    const handleFindIdInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div>
            <Jumbotron title="아이디 찾기" />
            <div onSubmit={getFindId} className="inquiry_write">
                <div className="mb-3">
                    <div className="col">
                        <label>이름</label>
                        <input className="input-control" type="text" name="memberName" value={input.memberName} onChange={(e) => handleFindIdInputChange(e)} 
                                placeholder="이름을 입력해주세요"/>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="col">
                        <label>이메일</label>
                        <input className="input-control" type="text" name="memberEmail" value={input.memberEmail} onChange={(e) => handleFindIdInputChange(e)} 
                                placeholder="가입한 이메일 주소를 입력해주세요."/>
                    </div>
                </div>
                <button className="findButton" type="button" onClick={getFindId}>아이디 찾기</button>
            </div>
        </div>
    );

};

export default FindId;
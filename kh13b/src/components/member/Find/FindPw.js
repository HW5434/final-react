import { useState } from "react";
import axios from "../../utils/CustomAxios";
import Jumbotron from "../../Jumbotron";
import { useNavigate } from 'react-router-dom';
import './Find.css';

const FindPw = () => {

    const [input, setInput] = useState({memberId:"", memberEmail:""});
    const navigator = useNavigate();

    const getFindPw = async () => {
        await axios.post('/member/findPw', input)
            .then((res) => {
                alert(`[${res.data.memberEmail}]로 임시비밀번호가 발급되었습니다. 로그인 후 비밀번호를 변경해주세요`);
                navigator('/login');
                return;
            }).catch((e) => {
                alert('입력하신 정보로 등록된 계정을 찾을 수 없습니다. 아이디 또는 이메일을 다시 확인해주세요.');
                return;
            })
    };

    const handleFindPwInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    //view
    return(
        <div>
            <Jumbotron title="비밀번호 찾기" />
            <div className="inquiry_write">
                <div className="mb-3">
                    <div className="col">
                        <label>아이디</label>
                        <input className="input-control" type="text" name="memberId" value={input.memberId} onChange={(e) => handleFindPwInputChange(e)} 
                                placeholder="아이디를 입력해주세요"/>
                    </div>
                </div>
                <div className="mb-3">
                    <div className="col">
                        <label htmlFor="email">이메일</label>
                        <input className="input-control" type="text" name="memberEmail" value={input.memberEmail} onChange={(e) => handleFindPwInputChange(e)} 
                                placeholder="가입한 이메일 주소를 입력해주세요."/>
                    </div>
                </div>
                <button className="findButton" type="button" onClick={getFindPw}>비밀번호 찾기</button>
            </div>
        </div>
    );
};

export default FindPw;
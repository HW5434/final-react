import { useState } from "react";
import axios from "../../utils/CustomAxios";
import Jumbotron from "../../Jumbotron";
import { useNavigate } from 'react-router-dom';

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
            <Jumbotron title="비밀번호 찾기" content="FindPw" />
            <div className="text-center">
                <div>
                    <label>아이디:</label>
                    <input type="text" name="memberId" value={input.memberId} onChange={(e) => handleFindPwInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="email">이메일:</label>
                    <input type="text" name="memberEmail" value={input.memberEmail} onChange={(e) => handleFindPwInputChange(e)} />
                </div>
                <button type="button" onClick={getFindPw}>비밀번호 찾기</button>
            </div>
        </div>
    );
};

export default FindPw;
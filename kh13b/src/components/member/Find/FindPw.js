import { useState } from "react";
import axios from "../../utils/CustomAxios";
import Jumbotron from "../../Jumbotron";
import { useNavigate } from 'react-router-dom';

const FindPw = () => {

    const [input, setInput] = useState({memberId:"", memberEmail:""});
    const navigator = useNavigate();

    const getFindPw = async () => {
        const response = await axios.post('/member/findPw', input);
        console.log(response);
        if (!response.data.memberId) {
            alert('입력하신 정보로 등록된 아이디를 찾을 수 없습니다.');
            return;
        } else {
            alert(`고객님의 이메일 ${response.data.memberEmail} 에 임시비밀번호가 전송되었습니다.`);
            navigator('/login');
            return;
        }
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
            <form onSubmit={getFindPw} className="text-center">
                <div>
                    <label>아이디:</label>
                    <input type="text" name="memberId" value={input.memberId} onChange={(e) => handleFindPwInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="email">이메일:</label>
                    <input type="text" name="memberEmail" value={input.memberEmail} onChange={(e) => handleFindPwInputChange(e)} />
                </div>
                <button type="submit">비밀번호 찾기</button>
            </form>
        </div>
    );
};

export default FindPw;
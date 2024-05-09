import { useState } from "react";
import axios from "../../utils/CustomAxios";
import Jumbotron from "../../Jumbotron";


const FindId = () => {

    const [input, setInput] = useState({ memberName:"", memberEmail:"" });

    const [findId, setFindId] = useState('');

    const getFindId = async () => {
        const response = await axios.post('/member/findId', input);
        console.log(response);
        if (!response.data.memberId) {
            alert('입력하신 정보로 등록된 아이디를 찾을 수 없습니다.');
        } else {
            alert(`고객님의 정보와 일치하는 아이디입니다 : ${response.data.memberId}`)
            setFindId(response.data.id);
        }
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
            <Jumbotron title="아이디 찾기" content="FindId" />
            <form onSubmit={getFindId} className="text-center">
                <div>
                    <label>이름:</label>
                    <input type="text" name="memberName" value={input.memberName} onChange={(e) => handleFindIdInputChange(e)} />
                </div>
                <div>
                    <label>이메일:</label>
                    <input type="text" name="memberEmail" value={input.memberEmail} onChange={(e) => handleFindIdInputChange(e)} />
                </div>
                <button type="submit">아이디 찾기</button>
            </form>
        </div>
    );

};

export default FindId;
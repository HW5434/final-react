import { useState } from "react";
import axios from "../../utils/CustomAxios";


const FindId = () => {

    const [input, setInput] = useState({ memberName:"", memberEmail:"" });

    const [findId, setFindId] = useState('');

    const getFindId = async () => {
        const response = await axios.post('/member/findId', input);
        console.log(response);
        if (!response.data.memberId) {
            alert('입력하신 정보로 등록된 아이디를 찾을 수 없습니다.');
        } else {
            alert(`리턴 데이터 체크 ${response.data.memberId}`)
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
            <h2>아이디 찾기</h2>
            <form onSubmit={getFindId}>
                <div>
                    <label htmlFor="email">이메일:</label>
                    <input type="text" name="memberEmail" value={input.memberEmail} onChange={(e) => handleFindIdInputChange(e)} />
                </div>
                <div>
                    <label htmlFor="name">이름:</label>
                    <input type="text" name="memberName" value={input.memberName} onChange={(e) => handleFindIdInputChange(e)} />
                </div>
                <button type="submit">아이디 찾기</button>
            </form>
        </div>
    );

};

export default FindId;
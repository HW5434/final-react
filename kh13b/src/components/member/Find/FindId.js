import { useState } from "react";
import axios from "src/";


const FindId = () => {

    const [memberName, setMemberName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [findId, setFindId] = useState('');

    const getFindId = async () => {
        const response = await axios.post('/findId', {
            memberName: memberName,
            memberEmail: memberEmail
        });
          
        if (!response.data.id) {
            alert('입력하신 정보로 등록된 아이디를 찾을 수 없습니다.');
        } else {
            setFindId(response.data.id);
        }
    };


};

export default FindId;
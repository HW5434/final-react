//탈퇴
import { useCallback, useState } from 'react';
import axios from "../../../utils/CustomAxios"
import './Withdrawal.css';
import { useRecoilState } from 'recoil';
import { loginIdState, loginGradeState } from '../../../utils/RecoilData';
import { useNavigate } from "react-router-dom";

const Withdrawal = () => {

    //state
    const [member, setMember] = useState([]);
    const [input, setInput] = useState({
        memberPw: ""
    });
    //recoil
    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [loginGrade, setLoginGrade] = useRecoilState(loginGradeState);

    //navigator
    const navigator = useNavigate();

    //callback
    const changeInput = useCallback(e=> {
        setInput({
            ...input,//원래정보유지
            [e.target.name] : e.target.value//name에만 value를 넣으셈
        });
    }, [input]);

    const withdrawalMember = useCallback(async (target)=> {
        const choice = window.confirm("탈퇴하시겠습니까?");
        if(choice === false) return;
        await axios.post('/member/withdrawal', {
            memberId: loginId,
            memberPw: input.memberPw
        }).then((res) => {
            alert("회원 탈퇴가 완료되었습니다.");
            setLoginId('');
            setLoginGrade('');
            localStorage.removeItem('refreshToken');
            navigator('/');
        }).catch((e) => {
            alert("비밀번호가 맞지 않습니다.");
        });
    }, [input]);
    
    return (
        <div className='withdrawal-layout'>
            <div className='text-center'>
                <h1>회원 탈퇴</h1>
            </div>
            <div className='withdrawal-pwCheckbox'>
                <label>비밀번호 확인</label>
                <input type="password" name="memberPw" className="input-control" onChange={(e) => changeInput(e)} placeholder='비밀번호 확인' />
                <p className='passwor-flag'>
                    
                </p>
            </div>
            <div className='withdrawal-submit'>
                <button className='btn btn-danger' onClick={e=> withdrawalMember(member)}>
                    탈퇴하기
                </button>
            </div>
        </div>
    );
};

export default Withdrawal;
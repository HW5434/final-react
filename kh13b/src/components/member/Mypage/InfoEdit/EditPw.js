
import { useCallback, useMemo, useRef, useState } from 'react';
import axios from '../../../utils/CustomAxios'
import './InfoEdit.css';
import { useNavigate } from 'react-router-dom';
import { MdRemoveRedEye } from "react-icons/md";
import Jumbotron from '../../../Jumbotron';

const EditPw = ({memberId, layoutChange}) => {

    const [pw, setPw] = useState({
        currentPw: "",
        newPw: "",
        confirmPw: ""
    });

    //유효성 체크 데이터
    const [inputValid, setInputValid] = useState({
        currentPw: false,
        newPw: false,
        confirmPw: false,
    });

    //비밀번호 보임/숨김
    const [isShowPwChecked, setShowPwChecked] = useState(false);
    const currentPwRef = useRef(null);
    const newPwRef = useRef(null);
    const confirmPwRef = useRef(null);

    //const [backup, setBackup] = useState(null);
    
    const inputPw = (e) => {
        const { name, value } = e.target;
        setPw(prevState => ({
            ...prevState,
            [name]: value
        }));

        if(name === "newPw") {
            const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[A-Za-z0-9!@#$]{8,16}$/;
            setInputValid({
                ...inputValid,
                memberPw : regex.test(value)
            });
        } else if(name === "confirmPw") {
            setInputValid({
                ...inputValid,
                confirmPw : pw.newPw === value
            });
        }
    };

    const isPasswordMatch = useMemo(() => 
        pw.newPw === pw.confirmPw
    , [pw.newPw, pw.confirmPw]);
    
    const cancelEditPw = useCallback(() => {
        layoutChange('my'); // 메인페이지로 이동
    }, []);

    const saveEditPw = useCallback(async () => {
        try {
            // 서버로 비밀번호 변경 요청을 보냅니다.
            await axios({
                url:'/member/editPassword', 
                method: 'POST',
                data: { 
                    memberId: memberId,
                    memberPw: pw.currentPw,
                    newPassword: pw.newPw
                },
                baseURL : "http://localhost:8080",
                timeout : 5000,
            });
    
            // 비밀번호 변경이 성공한 경우, 사용자에게 알림을 표시할 수 있습니다.
            alert('비밀번호가 성공적으로 변경되었습니다.');
    
            // 비밀번호 변경 후에는 메인 페이지로 이동할 수 있습니다.
            navigator("/");
        } catch (error) {
            // 비밀번호 변경에 실패한 경우, 사용자에게 에러를 표시할 수 있습니다.
            console.error('비밀번호 변경에 실패했습니다:', error);
            alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
        }
    }, [pw.currentPw, pw.newPw, memberId]);

    //네비게이터
    const navigator = useNavigate();


    // 비밀번호 보임/숨김 처리
    const handleShowCurrentPw = async () => {
        const password = await currentPwRef.current;
        if (password === null) return;
        
        await setShowPwChecked(!isShowPwChecked);

        if(!isShowPwChecked) {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    }

    const handleShowNewPw = async () => {
        const password = await newPwRef.current;
        if (password === null) return;
        
        await setShowPwChecked(!isShowPwChecked);
    
        if(!isShowPwChecked) {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    }
    
    const handleShowConfirmPw = async () => {
        const password = await confirmPwRef.current;
        if (password === null) return;
        
        await setShowPwChecked(!isShowPwChecked);
    
        if(!isShowPwChecked) {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    }

    return (
        <div>
            <Jumbotron title="비밀번호 변경" />
            <div className='mb-3'>
                    <div className='col'>
                        <label>현재 비밀번호</label>
                            <div>
                                <input type="password" name="currentPw" value={pw.currentPw} className="input-control" onChange={e => inputPw(e)} ref={currentPwRef} 
                                        placeholder='현재 비밀번호' />
                                <p className='passwor-flag' onClick={handleShowCurrentPw}>
                                    <MdRemoveRedEye />
                                </p>
                            </div>
                            
                    </div>
                </div>
                <div className='mb-3'>
                    <div className='col'>
                    <label>새 비밀번호</label>
                        <input type="password" name="newPw" value={pw.newPw} className="input-control" onChange={e => inputPw(e)} 
                        placeholder='영문 대,소문자와 숫자, 특수문자(!, @, #, $)가 포함 되어야 합니다' ref={newPwRef} />
                        <p className='passwor-flag' onClick={handleShowNewPw}>
                            <MdRemoveRedEye />
                        </p>
                        <p className={inputValid.memberPw ? "trueValid" : "falseValid"}>
                            {(pw.newPw === "") || (pw.newPw === undefined) ? "" : (inputValid.memberPw ? "올바른 비밀번호 형식입니다" : "형식에 맞게 입력해주세요")}
                        </p>
                    </div>
                </div>
                <div className='mb-3'>
                    <div className='col'>
                    <label>새 비밀번호 확인</label>
                        <input type="password" name="confirmPw" value={pw.confirmPw} className="input-control" onChange={e => inputPw(e)} 
                        placeholder='새 비밀번호 확인' ref={confirmPwRef} />
                        <p className='passwor-flag' onClick={handleShowConfirmPw}>
                            <MdRemoveRedEye />
                        </p>
                        <br/>
                        {pw.confirmPw === '' ? "" : isPasswordMatch ? null : <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
                    </div>
                </div>

                <div className="editButton-group">
                    <button className="cancel-button" type="button" onClick={cancelEditPw}>취소</button>
                    <button className="save-button" type="button" onClick={e=> saveEditPw(pw)}>저장</button>
                </div>
        </div>
    );
};

export default EditPw;
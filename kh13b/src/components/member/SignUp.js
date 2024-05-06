import { useCallback, useState } from 'react';
import AddressSearch from "./AddressSearch/AddressSearch";
import axios from "../utils/CustomAxios";
import Jumbotron from './../Jumbotron';
import './Member.css';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

    //State
    const [input, setInput] = useState({
        memberName:"",
        memberId: "",
        memberPw: "",
        memberPwCheck:"",
        memberBirth: "",
        memberContact: "",
        memberEmail: "",
        memberPost: "",
        memberAddress1: "",
        memberAddress2: "",
    });

    //유효성 체크 데이터
    const [inputValid, setInputValid] = useState({
        memberName: false,
        memberId: false,
        memberPw: false,
        memberPwCheck: false,
        memberBirth: false,
        memberContact: false,
        memberEmail: false,
        memberPost: false,
        memberAddress1: false,
        memberAddress2: false,
    });

    //id 중복체크
    const [checkId, setCheckId] = useState({ flag: false, message: "" });
    //email 중복체크
    const [checkEmail, setCheckEmail] = useState({ flag: false, message: "" });
    //email인증
    const [emailVerification, setEmailVerification] = useState({ flag: false, authenticationCode: "", });
    //email인증 사용자 입력번호
    const [inputCode, setInputCode] = useState("");

    const navigator = useNavigate();

    //등록 입력값 변경
    const handleSignUpInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        if(name === 'memberName') {
            setInputValid({
                ...inputValid,
                memberName : value !== '' && value.length > 1
            });
        } else if(name === 'memberId') {
            //아이디 입력값이 변경 되면 flag 값을 다시 false로 설정
	        setCheckId({flag : false, message: ""});

            const regex = /^[a-z][a-z0-9]{7,19}$/;
            setInputValid({
                ...inputValid,
                memberId : regex.test(value)
            });
        } else if(name === "memberPw") {
            const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[A-Za-z0-9!@#$]{8,16}$/;
            setInputValid({
                ...inputValid,
                memberPw : regex.test(value)
            });
        } else if(name === "memberPwCheck") {
            setInputValid({
                ...inputValid,
                memberPwCheck : input.memberPw === value
            });
        } else if(name === "memberBirth") {
            const regex = /^(19[0-9]{2}|20[0-9]{2})-(02-(0[1-9]|1[0-9]|2[0-8])|(0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30)|(0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01]))$/;
            setInputValid({
                ...inputValid,
                memberBirth : regex.test(value)
            });
        } else if(name === "memberContact") {
            const regex = /^010[1-9][0-9]{3}[0-9]{4}$/;
            setInputValid({
                ...inputValid,
                memberContact : regex.test(value)
            });
        }
    }

    //등록
    const saveInput = useCallback(async ()=> {
        //중복 확인(아이디, 이메일) 안했으면 가입 못하게
        // 아이디,이메일 중복 체크를 모두 완료하지 않은 경우
        if(!checkId.flag || !checkEmail.flag) {
            alert("아이디 또는 이메일 중복 확인을 해주세요.");
            return;
        }
        // 중복 확인이 완료된 경우, 회원가입 요청을 보냄
        const resp = await axios.post("/member/", input);
    }, [checkId.flag, checkEmail.flag]);

    //등록취소
    const cancelInput = useCallback(()=> {
        const choice = window.confirm("작성 중인 내용이 모두 삭제되고 메인 페이지로 돌아갑니다. 진행하시겠습니까");
        if(choice === false) return;
        navigator("/") // 메인 페이지로 이동
    }, [input]);

    //아이디 중복
    const doubleCheckId = async (memberId) => {
        if(memberId === '') {
            alert("아이디를 입력해주세요");
            return;
        }
        const res = await axios.get(`/member/doubleCheckId/${memberId}`);
        if(res.data) {
            setCheckId({
                flag: true,
                message: "사용할 수 있는 아이디입니다."
            });
        } else {
            setCheckId({
                flag: false,
                message: "다시 입력해"
            });
        }
    }

    //이메일 중복
    const doubleCheckEmail = async (memberEmail) => {
        if(memberEmail === '') {
            alert("이메일을 입력해주세요");
            return;
        }
        const res = await axios.get(`/member/doubleCheckEmail/${memberEmail}`);
        if(res.data) {
            setCheckEmail({
                flag: true,
                message: "사용할 수 있는 이메일입니다."
            });
        } else {
            setCheckEmail({
                flag: false,
                message: "다시 입력해"
            });
        }
    }

    //이메일 인증번호 전송
    const sendEmail = async (memberEmail) => {
        const res = await axios.get(`/member/sendEmail/${memberEmail}`);
        setEmailVerification(prevState => ({
            authenticationCode: res.data,
            flag: true,
        }));
    }

    //사용자 이메일 인증번호 입력
    const handleEmailCheckInputChange = (e) => {
        setInputCode(e.target.value);
    }

    //인증번호 확인
    const userInputCode = (inputCode) => {
        if(inputCode === String(emailVerification.authenticationCode)) {
            alert("인증완료");
        } else {
            alert("인증실패");
        }
    }

 
    //이메일 주소관련
    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [emailType, setEmailType] = useState('');

    const handleEmailIdChange = (e) => {
        //이메일 입력값이 변경 되면 flag 값을 다시 false로 설정
        setCheckEmail({flag: false, message: ""});

        setEmailId(e.target.value);
        setInput(prevState => ({
            ...prevState,
            memberEmail: e.target.value + "@" + emailDomain
        }));
    };

    const handleEmailTypeChange = (e) => {
        //이메일 입력값이 변경 되면 flag 값을 다시 false로 설정
        setCheckEmail({flag: false, message: ""});

        setEmailType(e.target.value);
        setEmailDomain(e.target.value);
        setInput(prevState => ({
            ...prevState,
            memberEmail: emailId + "@" + e.target.value
        }));        
    };

    const handleEmailDomainChange = (e) => {
        //이메일 입력값이 변경 되면 flag 값을 다시 false로 설정
        setCheckEmail({flag: false, message: ""});

        setEmailDomain(e.target.value);
        setInput(prevState => ({
            ...prevState,
            memberEmail: emailId + "@" + e.target.value
        }));
    };

    // 현재 날짜를 ISO 형식으로 가져옵니다.
    const currentDate = new Date().toLocaleDateString('en-CA');


    //view
    return (
        <div className='inquiry_write'>
            <h1 className='signupTitle'>회원가입</h1>
            <form>
                <div className='mb-3'>
                    <div className='col'>
                        <label>이름</label>
                        <input type="text" name="memberName" value={input.memberName} className="input-control"  onChange={handleSignUpInputChange} placeholder='이름' />
                        <p className={inputValid.memberName ? "trueValid" : "falseValid"}>
                            {input.memberName === "" ? "" : inputValid.memberName ? "이름 잘 입력했어" : "이름 입력해"}
                        </p>
                    </div>
                </div>
                <div className='mb-3'>
                    <div className='col'>
                        <label>아이디</label>
                        <p className={checkId.flag ? "trueValid" : "falseValid"}>
                            {checkId.message === "" ? "" : checkId.message}
                        </p>
                        <input type="text" name="memberId" value={input.memberId} className="input-control" onChange={handleSignUpInputChange} placeholder='아이디' />
                        <p className={inputValid.memberId ? "trueValid" : "falseValid"}>
                            {input.memberId === "" ? "" : inputValid.memberId ? "아이디 잘 입력했어" : "아이디 다시 입력해"}
                        </p>
                        <button className={`${inputValid.memberId ? "openData" : "noneData"}`} onClick={() => doubleCheckId(input.memberId)}>아이디 중복확인</button>
                    </div>  
                </div>
                <div className='mb-3'>
                    <div className='col'>
                        <label>비밀번호</label>
                        <input type="password" name="memberPw" value={input.memberPw} className="input-control" onChange={handleSignUpInputChange} placeholder='비밀번호' />
                        <p className={inputValid.memberPw ? "trueValid" : "falseValid"}>
                            {input.memberPw === "" ? "" : inputValid.memberPw ? "비밀번호 잘 입력했어" : "비밀번호 다시 입력해"}
                        </p>
                    </div>
                </div>
                <div className='mb-3'>
                    <div className='col'>
                        <label>비밀번호 확인</label>
                        <input type="password" name="memberPwCheck" value={input.memberPwCheck} className="input-control" onChange={handleSignUpInputChange} placeholder='비밀번호 확인' />
                        <p className={inputValid.memberPwCheck ? "trueValid" : "falseValid"}>
                            {input.memberPwCheck === "" ? "" : inputValid.memberPwCheck ? "비밀번호 일치해" : "비밀번호 일치하지않아"}
                        </p>
                    </div>
                </div>
                <div className='mb-3'>
                    <div className='col'>
                        <label>생년월일</label>
                        <input type="date" name="memberBirth" value={input.memberBirth} className="input-control" onChange={handleSignUpInputChange} max={currentDate} />
                    </div>
                </div>
                <div className='mb-3'>
                    <div className='col'>
                        <label>연락처 (숫자만 입력)</label>
                        <input type="tel" name="memberContact" value={input.memberContact} className="input-control" onChange={handleSignUpInputChange} placeholder='연락처' />
                        <p className={inputValid.memberContact ? "trueValid" : "falseValid"}>
                            {input.memberContact === "" ? "" : inputValid.memberContact ? "연락처 잘 입력했어" : "연락처 입력해"}
                        </p>
                    </div>
                </div>
                <div className='mb-3'>
                    <div className='col'>
                        <label>이메일</label>
                        <div className='email-wrap'>
                            <div className='email-top'>
                                <input type="text" value={emailId} onChange={handleEmailIdChange} className="input-control" placeholder='이메일' />
                                <span className='at'>@</span>
                                <select name="menuType" value={emailType} onChange={handleEmailTypeChange}>
                                    <option value="">직접입력</option>
                                    <option value="hanmail.net">hanmail.net</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="hotmail.com">hotmail.com</option>
                                    <option value="nate.com">nate.com</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="kakao.com">kakao.com</option>
                                    <option value="outlook.com">outlook.com</option>
                                </select>
                                <input type="text" name="email" value={emailDomain} readOnly={emailType === '' ? false : true}
                                    onChange={handleEmailDomainChange} className="input-control"/>
                            </div>
                            <p className={checkEmail.flag ? "trueValid" : "falseValid"}>
                                {checkEmail.message === "" ? "" : checkEmail.message}
                            </p>
                        </div>
                        <div className='email-bottom-rap'>
                            <button className={`mr ${input.memberEmail.length > 1  ? 'openData' : 'noneData'}`} onClick={() => doubleCheckEmail(input.memberEmail)}>중복확인</button>
                            {emailVerification.flag ? 
                                <>
                                    <input type='text' onChange={handleEmailCheckInputChange}/>
                                    <button className="ml checkButton" onClick={() => userInputCode(inputCode)}>인증확인</button>
                                </> : 
                                <button className={`ml ${checkEmail.flag ? 'openData' : 'noneData'}`} onClick={() => sendEmail(input.memberEmail)}>이메일 인증</button>
                            }
                        </div>
                        <div className="notice">
                            ※ 일부 이메일(gmail.com, hotmail.com, live.co.kr, outlook.com, nate.com, dreamwiz.com, empal.com 등)은 답변 메일 수신이 원활하지 않을 수 있습니다. <br />
                            ※ 특정 키워드를 사용한 이메일의 경우, 홈페이지 보안 정책에 따라 가입이 어려울 수 있습니다.
                        </div>
                    </div>
                </div>
            </form>
            <AddressSearch input={input} handleSignUpInputChange={handleSignUpInputChange}/>
            <div className='mb-3'>
                <div className='col text-center'>
                    <button className='btn btn-success' onClick={e=>saveInput()}>
                        회원가입
                    </button>
                    <button className='btn btn-danger ms-2' onClick={e=>cancelInput()}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
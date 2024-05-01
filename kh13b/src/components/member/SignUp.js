import { useCallback, useState } from 'react';
import AddressSearch from "./AddressSearch/AddressSearch";
import axios from "../utils/CustomAxios";
import Jumbotron from './../Jumbotron';
import './Member.css';


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

    const [checkId, setCheckId] = useState({
        flag: false,
        message: "",
    });
    const [checkEmail, setCheckEmail] = useState({
        flag: false,
        message: "",
    });

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
        const resp = await axios.post("/member/", input);
        clearInput();
    }, [input]);

    //등록취소
    const cancelInput = useCallback(()=> {
        const choice = window.confirm("작성 중인 내용이 모두 삭제되고 메인 페이지로 돌아갑니다. 진행하시겠습니까");
        if(choice === false) return;
        window.location.href = "/Home"; // 메인 페이지로 이동
    }, [input]);

    //아이디 중복
    const doubleCheckId = async (memberId) => {
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

    //아이디 중복
    const doubleCheckEmail = async (memberEmail) => {
        alert(memberEmail)
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

    //입력값초기화
    const clearInput = useCallback(()=> {
        setInput({
            memberName:"",
            memberId: "",
            memberPw: "",
            memberBirth: "",
            memberContact: "",
            memberEmail: "",
            memberPost: "",
            memberAddress1: "",
            memberAddress2: "",
        });
    }, [input]);
    

    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [emailType, setEmailType] = useState('');

    const handleEmailIdChange = (e) => {
        setEmailId(e.target.value);
        setInput(prevState => ({
            ...prevState,
            memberEmail: e.target.value + "@" + emailDomain
        }));
    };
    const handleEmailTypeChange = (e) => {
        setEmailType(e.target.value);
        setEmailDomain(e.target.value);
        setInput(prevState => ({
            ...prevState,
            memberEmail: emailId + "@" + e.target.value
        }));        
    };
    const handleEmailDomainChange = (e) => {
        setEmailDomain(e.target.value);
        setInput(prevState => ({
            ...prevState,
            memberEmail: emailId + "@" + e.target.value
        }));
    };

    //view
    return (
        <>

            <Jumbotron title="회원가입" content="SignUp"/>

            <div className='row mt-4'>
                <div className='col'>
                    <label>이름</label>
                    <input type="text" name="memberName" value={input.memberName} className="form-control"  onChange={handleSignUpInputChange} />
                    <p className={inputValid.memberName ? "trueValid" : "falseValid"}>
                        {input.memberName === "" ? "" : inputValid.memberName ? "이름 잘 입력했어" : "이름 입력해"}
                    </p>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>아이디</label>
                    <button href="#" className="me-2" onClick={() => doubleCheckId(input.memberId)}>아이디 중복확인</button>
                    <p className={checkId.flag ? "trueValid" : "falseValid"}>
                        {checkId.message === "" ? "" : checkId.message}
                    </p>
                    <input type="text" name="memberId" value={input.memberId} className="form-control" onChange={handleSignUpInputChange}/>
                    <p className={inputValid.memberId ? "trueValid" : "falseValid"}>
                        {input.memberId === "" ? "" : inputValid.memberId ? "아이디 잘 입력했어" : "아이디 다시 입력해"}
                    </p>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>비밀번호</label>
                    <input type="password" name="memberPw" value={input.memberPw} className="form-control" onChange={handleSignUpInputChange}/>
                    <p className={inputValid.memberPw ? "trueValid" : "falseValid"}>
                        {input.memberPw === "" ? "" : inputValid.memberPw ? "비밀번호 잘 입력했어" : "비밀번호 다시 입력해"}
                    </p>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>비밀번호 확인</label>
                    <input type="password" name="memberPwCheck" value={input.memberPwCheck} className="form-control" onChange={handleSignUpInputChange}/>
                    <p className={inputValid.memberPwCheck ? "trueValid" : "falseValid"}>
                        {input.memberPwCheck === "" ? "" : inputValid.memberPwCheck ? "비밀번호 일치해" : "비밀번호 일치하지않아"}
                    </p>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>생년월일</label>
                    <input type="date" name="memberBirth" value={input.memberBirth} className="form-control" onChange={handleSignUpInputChange}/>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>연락처</label>
                    <input type="tel" name="memberContact" value={input.memberContact} className="form-control" onChange={handleSignUpInputChange}/>
                    <p className={inputValid.memberContact ? "trueValid" : "falseValid"}>
                        {input.memberContact === "" ? "" : inputValid.memberContact ? "연락처 잘 입력했어" : "연락처 입력해"}
                    </p>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>이메일</label>
                    <input type="text" value={emailId} onChange={handleEmailIdChange} className="form-control"/>
                    <span>@</span>
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
                        onChange={handleEmailDomainChange} className="form-control"/>
                    
                    <button className="me-2" onClick={() => doubleCheckEmail(input.memberEmail)}>이메일 중복확인</button>
                    <p className={checkEmail.flag ? "trueValid" : "falseValid"}>
                        {checkEmail.message === "" ? "" : checkEmail.message}
                    </p>
                    <a href="#" className="me-2">이메일 인증</a>
                    <div className="notice">
                        ※ 일부 이메일(gmail.com, hotmail.com, live.co.kr, outlook.com, nate.com, dreamwiz.com, empal.com 등)은 <span className="color_red">답변 메일 수신</span>이 원활하지 않을 수 있습니다. <br />
                        ※ 특정 키워드를 사용한 이메일의 경우, 홈페이지 보안 정책에 따라 가입이 어려울 수 있습니다.
                    </div>
                </div>
            </div>
            <AddressSearch input={input} handleSignUpInputChange={handleSignUpInputChange}/>
            <div className='row mt-4'>
                <div className='col text-center'>
                    <button className='btn btn-success' onClick={e=>saveInput()}>
                        확인
                    </button>
                    <button className='btn btn-danger ms-2' onClick={e=>cancelInput()}>
                        취소
                    </button>
                </div>
            </div>
        </>
    );
};

export default SignUp;
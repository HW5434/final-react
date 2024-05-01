import { useCallback, useState } from 'react';
import AddressSearch from "./AddressSearch/AddressSearch";
import axios from "../utils/CustomAxios";


const SignUp = () => {

    //State
    const [join, setJoin] = useState([]);

    const [input, setInput] = useState({
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

    //등록 입력값 변경
    const handleSignUpInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    //등록
    const saveInput = useCallback(async ()=> {
        const resp = await axios.post("/join/", input);
        clearInput();
    }, [input]);
    //등록취소
    const cancelInput = useCallback(()=> {
        const choice = window.confirm("작성 중인 내용이 모두 삭제되고 메인 페이지로 돌아갑니다. 진행하시겠습니까");
        if(choice === false) return;
        window.location.href = "/Home"; // 메인 페이지로 이동
    }, [input]);

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
    };
    const handleEmailTypeChange = (e) => {
        setEmailType(e.target.value);
        setEmailDomain(e.target.value);
    };
    const handleEmailDomainChange = (e) => {
        setEmailDomain(e.target.value);
    };



    //view
    return (
        <>
            <div className='row mt-4'>
                <div className='col'>
                    <label>이름</label>
                    <input type="text" name="memberName" value={input.memberName} className="form-control" onChange={handleSignUpInputChange}/>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>아이디</label>
                    <input type="text" name="memberId" value={input.memberId} className="form-control" onChange={handleSignUpInputChange}/>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>비밀번호</label>
                    <input type="password" name="memberPw" value={input.memberPw} className="form-control" onChange={handleSignUpInputChange}/>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>비밀번호 확인</label>
                    <input type="password" name="memberPwCheck" value={input.memberPw} className="form-control" onChange={handleSignUpInputChange}/>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>생년월일</label>
                    <input type="text" name="memberBirth" value={input.memberBirth} className="form-control" onChange={handleSignUpInputChange}/>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>연락처</label>
                    <input type="tel" name="memberContact" value={input.memberContact} className="form-control" onChange={handleSignUpInputChange}/>
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
                    
                    <a href="#" className="me-2">이메일 중복확인</a>
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
                    <button className='btn btn-success ms-2' onClick={e=>saveInput()}>
                        확인
                    </button>
                    <button className='btn btn-danger' onClick={e=>cancelInput()}>
                        취소
                    </button>
                </div>
            </div>
        </>
    );
};

export default SignUp;
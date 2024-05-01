
import { useState } from 'react';
import AddressSearch from "./AddressSearch";

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

    const [emailId, setEmailId] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [emailType, setEmailType] = useState('');

    const handleSignUpInputChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

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
                    <input type="password" name="memberPw" value={input.memberPw} className="form-control" onChange={handleSignUpInputChange}/>
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
            <div className='row mt-4'>
                <div className='col'>
                    <label>주소</label><br/>
                    <AddressSearch/>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col text-center'>
                    <button className='btn btn-success'>
                        확인
                    </button>
                    <button className='btn btn-danger ms-2'>
                        취소
                    </button>
                </div>
            </div>
        </>
    );
};

export default SignUp;
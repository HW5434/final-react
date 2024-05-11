import './Login.css';
import { useCallback, useState } from "react";
import Jumbotron from "../../Jumbotron";
import {useRecoilState} from "recoil";
import { loginIdState, loginGradeState } from "../../utils/RecoilData";
import axios from "../../utils/CustomAxios";
import { useNavigate, Link } from "react-router-dom";

const redirect_uri = 'http://localhost:3000/auth'

const Login = () => {

    //state
    const [input, setInput] = useState({
        memberId: "", memberPw: ""
    });

    //recoil
    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [loginGrade, setLoginGrade] = useRecoilState(loginGradeState);

    //callback
    const changeInput = useCallback(e=> {
        setInput({
            ...input,//원래정보유지
            [e.target.name] : e.target.value//name에만 value를 넣으셈
        });
    }, [input]);

    //navigator
    const navigator = useNavigate();

    const login = useCallback(async()=> {
        if(input.memberId.length === 0) return;
        if(input.memberPw.length === 0) return;
        try {
            const resp = await axios.post("/member/login", input);

            setLoginId(resp.data.memberId);
            setLoginGrade(resp.data.memberGrade);
    
            //accessToken은 이후의 axios 요청에 포함시켜서 서버로 가져가야함
            axios.defaults.headers.common['Authorization'] = resp.data.accessToken;
    
            //refreshToken을 localStorage에 저장
            window.localStorage.setItem("refreshToken", resp.data.refreshToken);
    
            //로그인 후 메인 페이지로 이동
            navigator("/")  
        } catch(e) {
            alert("아이디 혹은 비밀번호가 틀렸습니다.");
        }
    }, [input]);



    const handleKakaoLogin = () => {
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_TEMP_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`;
        window.location.href = kakaoURL;
    }

    return (
        <main className='login-main'>
            <div className='login'>
                <div className="login-wrap">
                    <Link className='login-logo' to='/'>
                        <img className='login-logoImage' src='/static/media/logo.8732cb4a8436724ca619.png'></img>
                    </Link>
                    <form className='login-form'>
                        <div className="">
                            <input type="text" name="memberId" value={input.memberId} className="login-id" onChange={e=>changeInput(e)} placeholder='아이디' />
                        </div>
                        <div className="">
                            <input type="password" name="memberPw" value={input.memberPw} className="login-pw" onChange={e=>changeInput(e)} placeholder='비밀번호' />
                        </div>
                        <button className='login-button' onClick={e=>login()}>
                            로그인
                        </button>
                        <section className='login-option'>
                            <Link className='option-first' to="/findId">아이디 찾기</Link>
                            <Link className='option-other' to="/findPw">비밀번호 찾기</Link>
                            <Link className='option-other' to="/SignUP">회원가입</Link>
                        </section>
                        <section className='social-login'>
                            <div className='social-text'>SNS 간편 로그인</div>
                            <button type='button' onClick={handleKakaoLogin} className='kakao-login'>
                                <svg width="48" height="48" viewBox="0 0 48 48" preserveAspectRatio="xMidYMid meet"><g fill="none" fill-rule="evenodd"><path fill="#FFEB00" d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"></path><path fill="#3C2929" d="M24 11.277c8.284 0 15 5.306 15 11.85 0 6.545-6.716 11.85-15 11.85-.92 0-1.822-.066-2.697-.191l-6.081 4.105a.43.43 0 0 1-.674-.476l1.414-5.282C11.777 31.031 9 27.335 9 23.127c0-6.544 6.716-11.85 15-11.85zm6.22 8.407c-.416 0-.718.297-.718.707v5.939c0 .41.289.686.718.686.41 0 .718-.295.718-.686v-1.932l.515-.526 1.885 2.57c.277.374.426.54.691.568.037.003.075.005.112.005.154 0 .66-.04.716-.563.038-.293-.137-.52-.348-.796l-2.043-2.675 1.727-1.743.176-.196c.234-.26.353-.39.353-.587.009-.422-.34-.652-.687-.661-.274 0-.457.15-.57.262l-2.528 2.634v-2.3c0-.422-.288-.706-.717-.706zm-9.364 0c-.56 0-.918.432-1.067.837l-2.083 5.517a.84.84 0 0 0-.065.315c0 .372.31.663.706.663.359 0 .578-.162.69-.51l.321-.97h2.999l.313.982c.111.335.34.498.7.498.367 0 .655-.273.655-.62 0-.056-.017-.196-.081-.369l-2.019-5.508c-.187-.53-.577-.835-1.069-.835zm-2.92.064h-4.452c-.417 0-.642.337-.642.654 0 .3.168.652.642.652h1.51v5.21c0 .464.274.752.716.752.443 0 .718-.288.718-.751v-5.21h1.508c.474 0 .643-.352.643-.653 0-.317-.225-.654-.643-.654zm7.554-.064c-.442 0-.717.287-.717.75v5.707c0 .497.28.794.75.794h2.674c.434 0 .677-.321.686-.627a.642.642 0 0 0-.17-.479c-.122-.13-.3-.2-.516-.2h-1.99v-5.195c0-.463-.274-.75-.717-.75zm-4.628 1.306l.008.01 1.083 3.265h-2.192L20.842 21a.015.015 0 0 1 .028 0z"></path></g></svg>                                
                            </button>
                        </section>
                    </form>
                </div>
            </div>
        </main>
    );
};


export default Login;
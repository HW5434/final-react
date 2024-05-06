import { useCallback, useState } from "react";
import Jumbotron from "../Jumbotron";
import {useRecoilState} from "recoil";
import { loginIdState, loginGradeState } from "../utils/RecoilData";
import axios from "../utils/CustomAxios";
import { useNavigate } from "react-router-dom";

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

        const resp = await axios.post("/member/login", input);
        //console.log(resp.data);
        setLoginId(resp.data.memberId);
        setLoginGrade(resp.data.memberGrade);

        //로그인 후 메인 페이지로 이동
        navigator("/")
    }, [input]);

    return (
        <>
            <Jumbotron title="로그인" content="Login"/>

            <div className="row mt-4">
                <div className="col">
                    <label>아이디</label>
                    <input type="text" name="memberId" value={input.memberId}
                    className="form-control" onChange={e=>changeInput(e)}/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>비밀번호</label>
                    <input type="password" name="memberPw" value={input.memberPw}
                    className="form-control" onChange={e=>changeInput(e)}/>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col text-center'>
                    <button className='btn btn-success' onClick={e=>login()}>
                        로그인
                    </button>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                <label>
                    <input type="checkbox"/>
                    자동로그인
                </label>
                </div>
            </div>
            
        </>
    );
};

export default Login;
import { useState } from "react";
import Jumbotron from "../Jumbotron";


const Login = () => {

    const [input, setInput] = useState({
        memberId: "",
        memberPw: "",
    });

    return (
        <>
            <Jumbotron title="로그인" content="Login"/>
            <div className="row mt-4">
                <div className="col">
                    <label>아이디</label>
                    <input type="text" name="memberId" value={input.memberId}
                    className="form-control"/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>비밀번호</label>
                    <input type="password" name="memberPw" value={input.memberPw}
                    className="form-control"/>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col text-center'>
                    <button className='btn btn-success'>
                        로그인
                    </button>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                <label>
                    <input type="checkbox"/>
                    아이디 저장
                </label>
                </div>
            </div>
            
        </>
    );
};

export default Login;
import './Mypage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from "recoil";
import { isLoginState } from "../../utils/RecoilData";
import axios from '../../utils/CustomAxios';
import Profile from './Profile/Profile';
import MyLayout from './MyLayout/MyLayout'

const Mypage = () => {

    const [login, setLogin] = useRecoilState(isLoginState);
    const [member, setMember] = useState({});

    const load = useCallback(async() => {
        const refreshToken = localStorage.getItem('refreshToken');
        await axios.get(`/member/getMember/${refreshToken}`).then((res) => {
            setMember(res.data);
        });
    });

    useEffect(() => {
        load();
    }, []);

    return (
        <div className='mypage'>
            <div className='mypage-container'>
                <Profile member={member} />
                <div className='my-empty'>
                    <div className='empty-sub'></div>
                </div>
                <MyLayout />
            </div>
        </div>
    )
}

export default Mypage;
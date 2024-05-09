import './Mypage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from "recoil";
import { loginIdState } from "../../utils/RecoilData";
import axios from '../../utils/CustomAxios';
import Profile from './Profile/Profile';
import MyLayout from './MyLayout/MyLayout'

const Mypage = () => {

    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [member, setMember] = useState({});
    const [reservationList, setReservationList] = useState([]);

    const load = useCallback(async() => {
        const refreshToken = localStorage.getItem('refreshToken');
        await axios.get(`/member/getMember/${refreshToken}`).then((res) => {
            setMember(res.data);
        });
        await axios.get(`/member/getMyReservationList/${refreshToken}`).then((res) => {
            setReservationList(res.data);
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
                <MyLayout reservationList={reservationList} />
            </div>
        </div>
    )
}

export default Mypage;
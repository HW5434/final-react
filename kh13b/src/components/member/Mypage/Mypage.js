import './Mypage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from "recoil";
import { loginIdState } from "../../utils/RecoilData";
import axios from '../../utils/CustomAxios';
import Profile from './Profile/Profile';
import MyLayout from './MyLayout/MyLayout';
import Withdrawal from './Withdrawal/Withdrawal';

const Mypage = () => {

    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [member, setMember] = useState({});
    const [reservationList, setReservationList] = useState([]);
    const [layout, setLayout] = useState('my');

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
                <Profile member={member} layoutChange={setLayout}/>
                <div className='my-empty'>
                    <div className='empty-sub'></div>
                </div>
                <div className='profile-wrap'>
                    {layout === 'my' && (
                        <MyLayout reservationList={reservationList} />
                    )}
                    {layout === 'update' && (
                        <div>
                            수정화면
                            <button type="button" className='btn btn-danger' onClick={() => setLayout('delete')}>회원탈퇴</button>
                        </div>
                    )}
                    {layout === 'delete' && (
                        <Withdrawal/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Mypage;
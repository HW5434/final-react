import './Mypage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from "recoil";
import { loginIdState } from "../../utils/RecoilData";
import axios from '../../utils/CustomAxios';
import Profile from './Profile/Profile';
import MyLayout from './MyLayout/MyLayout';
import Withdrawal from './Withdrawal/Withdrawal';
import InfoEdit from './InfoEdit/InfoEdit';
import EditPw from './InfoEdit/EditPw';

const Mypage = () => {

    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [member, setMember] = useState({});
    const [reservationList, setReservationList] = useState([]);
    const [layout, setLayout] = useState('my');

    //페이징 시스템 구현하기
    const [page, setPage] = useState(1);//현재 페이지 번호
    const [size] = useState(6);//목록 개수
    const [count, setCount] = useState(0);

    const load = useCallback(async() => {
        const refreshToken = localStorage.getItem('refreshToken');
        const data = {
            refreshToken: refreshToken,
            page: page,
            size: size
        }
        await axios.get(`/member/getMember/${refreshToken}`).then((res) => {
            setMember(res.data);
        });
        await axios.post(`/member/getMyReservationList/`,
            data
        ).then((res) => {
            setReservationList(res.data);
            setCount(res.data.pageVO.totalPage);
        });
    }, [page, size]);

    useEffect(() => {
        load();
    }, [page, size]);

    return (
        <div className='mypage'>
            <div className='mypage-container'>
                <Profile member={member} layoutChange={setLayout}/>
                <div className='my-empty'>
                    <div className='empty-sub'></div>
                </div>
                <div className='profile-wrap'>
                    {layout === 'my' && (
                        <MyLayout 
                            reservationList={reservationList.reservationList}
                            seatList={reservationList.seatList}
                            page={page}
                            size={size}
                            count={count}
                            setPage={setPage}
                        />
                    )}
                    {layout === 'update' && (
                        <div>
                            <InfoEdit memberId={loginId} layoutChange={setLayout}/>
                            <button type="button" className='btn btn-danger withdrawal-button' onClick={() => setLayout('delete')}>회원탈퇴</button>
                        </div>
                    )}
                    {layout === 'editPassword' && (
                        <EditPw memberId={loginId} layoutChange={setLayout}/>
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
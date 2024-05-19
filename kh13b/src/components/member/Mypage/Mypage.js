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
import { PiSealWarningBold } from "react-icons/pi";

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
        const res = await axios.post(`/member/getMyReservationList/`,data)

        await Promise.all(res.data.reservationList.map(async (item, idx) => {
            await axios.get(`/member/getAttach/${item.CONCERT_SCHEDULE_NO}`, {
                responseType: 'arraybuffer',
            }).then((imageRes) => {
                const base64 = btoa(
                    new Uint8Array(imageRes.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );
                res.data.reservationList[idx].concertImage = base64;
            }).catch((e) => {
                console.log("파일 없음")
            });
        }));
        
        setReservationList(res.data);
        setCount(res.data.pageVO.totalPage);
        
    }, [page, size]);

    useEffect(() => {
        load();
    }, [page, size]);

    return (
        <div className='mypage'>
            <div className='mypage-container'>
                <Profile member={member} layoutChange={setLayout} reservationCount={reservationList.reservationCount} />
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
                        <>
                        <div>
                            <InfoEdit memberId={loginId} layoutChange={setLayout} setMember={setMember}/>
                        </div>
                        <div className='withdrawal-button'>
                            <button type="button" onClick={() => setLayout('delete')}>
                            <PiSealWarningBold style={{ fontSize: '16px' }} />&nbsp;회원탈퇴
                            </button>
                        </div>
                        </>
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
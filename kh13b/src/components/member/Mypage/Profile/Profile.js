import './Profile.css';
import { Link, NavLink } from 'react-router-dom';
import { IoTicketOutline, IoInformationCircleOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { loginGradeState, loginIdState } from '../../../utils/RecoilData';
import { useRecoilState } from 'recoil';
import { useCallback, useMemo } from 'react';
import axios from "../../../utils/CustomAxios";


const Profile = ({ member, layoutChange, reservationCount }) => {

    //state
    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [loginGrade, setLoginGrade] = useRecoilState(loginGradeState);

    //memo
    const isLogin = useMemo(() => {
        return loginId.length > 0 && loginGrade.length > 0;
    }, [loginId, loginGrade]);

    //callback
    const logout = useCallback(() => {
        //recoil 저장소에 대한 정리 + axios의 헤더 제거
        setLoginId('');
        setLoginGrade('');
        localStorage.removeItem('refreshToken');
        
        delete axios.defaults.headers.common['Authorization'];
    }, [loginId, loginGrade]);

    return (
        <div className='l-profile-wrap'>
            <div className='sticky-container'>
                <div className='sticky-child'>
                    <div>
                        <div className='profile'>
                            <div className='profile-main'>
                                <div className='main-rap'>
                                    <div className='profile-name'>{member.memberName} 님</div>
                                    <div className='profile-bottom'>
                                        {isLogin ? (
                                            <dl className='bottom-datarap'>
                                                <dt className='datarap-text'>
                                                    <NavLink className="dropdown-item me-2" to="/" onClick={e => logout()}>로그아웃</NavLink>
                                                </dt>
                                                <dt className='datarap-text'>
                                                    <NavLink className="dropdown-item" to="/mypage">마이페이지</NavLink>
                                                </dt>
                                            </dl>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='profile-sub'>
                                <div className='sub-rap'>
                                    <Link className='sub-link' onClick={() => layoutChange('my')}>
                                        <div className='link-icon'>
                                            <IoTicketOutline className='profile-icon'/>
                                        </div>
                                        <div className='sub-text'>예매내역</div>
                                        <div className='sub-count'>{reservationCount}</div>
                                    </Link>
                                    <Link className='sub-link' onClick={() => layoutChange('update')}>
                                        <div className='link-icon'>
                                            <IoInformationCircleOutline className='profile-icon'/>
                                        </div>
                                        <div className='sub-text'>내정보</div>
                                    </Link>
                                    <Link className='sub-link' onClick={() => layoutChange('editPassword')}>
                                        <div className='link-icon'>
                                            <RiLockPasswordLine className='profile-icon' />
                                        </div>
                                        <div className='sub-text'>비밀번호변경</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
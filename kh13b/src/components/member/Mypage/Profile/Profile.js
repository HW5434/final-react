import './Profile.css';
import { Link } from 'react-router-dom';
import { IoTicketOutline, IoInformationCircleOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

const Profile = ({ member, layoutChange }) => {

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
                                        <dl className='bottom-datarap'>
                                            <dt className='datarap-text'>DATA1</dt>
                                            <dd className='datarap-data'>0</dd>
                                            <dt className='datarap-text'>DATA2</dt>
                                            <dd className='datarap-data'>0</dd>
                                        </dl>
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
                                        <div className='sub-count'>0</div>
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
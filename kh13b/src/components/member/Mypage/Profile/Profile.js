import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = ({ member, layoutChange }) => {

    return (
        <div className='l-profile-wrap'>
            <div className='sticky-container'>
                <div className='sticky-child'>
                    <div>
                        <div className='profile'>
                            <div className='profile-main'>
                                <div className='main-rap'>
                                    <div className='profile-name'>{member.memberName}</div>
                                    <div className='profile-bottom'>
                                        <dl className='bottom-datarap'>
                                            <dt className='datarap-text'>DATA1</dt>
                                            <dd className='datarap-data'>0</dd>
                                            <dt className='datarap-text'>DATA2</dt>
                                            <dd className='datarap-data'>0</dd>
                                        </dl>
                                        <div className='bottom-updaterap'>
                                            <button type='button' onClick={() => layoutChange('my')} className='update-link'>예매내역</button>
                                            <button type='button' onClick={() => layoutChange('update')} className='update-link'>수정</button>
                                            <button type='button' onClick={() => layoutChange('editPassword')} className='update-link'>비밀번호변경</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='profile-sub'>
                                <div className='sub-rap'>
                                    <Link className='sub-link'>
                                        <div className='link-icon'>아이콘1</div>
                                        <div className='sub-text'>텍스트1</div>
                                        <div className='sub-count'>0</div>
                                    </Link>
                                    <Link className='sub-link'>
                                    <div className='link-icon'>아이콘2</div>
                                        <div className='sub-text'>텍스트2</div>
                                        <div className='sub-count'>0</div>
                                    </Link>
                                    <Link className='sub-link'>
                                    <div className='link-icon'>아이콘3</div>
                                        <div className='sub-text'>텍스트3</div>
                                        <div className='sub-count'>0</div>
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
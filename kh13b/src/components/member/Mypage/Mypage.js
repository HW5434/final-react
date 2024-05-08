import './Mypage.css';
import { Link } from 'react-router-dom';

const Mypage = () => {
// <div></div>
    return (
        <div className='mypage'>
            <div className='mypage-container'>
                <div className='l-profile-wrap'>
                    <div className='sticky-container'>
                        <div className='sticky-child'>
                            <div>
                                <div className='profile'>
                                    <div className='profile-main'>
                                        <div className='main-rap'>
                                            <div className='profile-name'>이름자리</div>
                                            <div className='profile-bottom'>
                                                <dl className='bottom-datarap'>
                                                    <dt className='datarap-text'>DATA1</dt>
                                                    <dd className='datarap-data'>0</dd>
                                                    <dt className='datarap-text'>DATA2</dt>
                                                    <dd className='datarap-data'>0</dd>
                                                </dl>
                                                <div className='bottom-updaterap'>
                                                    <Link href="" className='update-link'>설정</Link>
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
                <div className='my-empty'>
                    <div className='empty-sub'></div>
                </div>
                <div className='profile-wrap'>
                    <div className='mypage-layout'>
                        <div>
                            <section className='layout-rap'>
                                <div className='layout-title'>
                                    <h1 className='my-title-text'>
                                        타이틀
                                        <span className='my-title-count'>1</span>
                                    </h1>
                                    <div className='my-nav'>
                                        <Link>전체보기</Link>
                                    </div>
                                </div>
                                <div className='layout-list'>
                                    <div className='my-list-data'>데이터</div>
                                    <div className='my-list-data'>데이터</div>
                                    <div className='my-list-data'>데이터</div>
                                    <div className='my-list-data'>데이터</div>
                                </div>
                            </section>
                            <section className='layout-rap'>
                                <div className='layout-title'>
                                    <h1 className='my-title-text'>
                                        타이틀2
                                        <span className='my-title-count'>1</span>
                                    </h1>
                                    <div className='my-nav'>
                                        <Link>전체보기</Link>
                                    </div>
                                </div>
                                <div className='layout-list'>
                                    <div className='my-list-data'>데이터2</div>
                                    <div className='my-list-data'>데이터2</div>
                                    <div className='my-list-data'>데이터2</div>
                                    <div className='my-list-data'>데이터2</div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mypage;
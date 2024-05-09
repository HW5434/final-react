import './MyLayout.css';
import { Link } from 'react-router-dom';

const MyLayout = () => {
    return (
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
    )
}

export default MyLayout;
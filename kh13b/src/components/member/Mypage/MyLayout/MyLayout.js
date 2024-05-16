import './MyLayout.css';
import { Link } from 'react-router-dom';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const MyLayout = ({ 
    reservationList,
    page,
    size,
    count,
    setPage
}) => {
    //페이지네이션
    const previousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1)); // 이전 페이지로 이동하는 함수
    };

    const nextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, count)); // 다음 페이지로 이동하는 함수
    };

    const pageChange = (pageNumber) => {
        setPage(pageNumber); // 페이지 번호를 직접 선택하여 이동하는 함수
    };
        
    return (
        <div className='mypage-layout'>
            <div>
                <section className='layout-rap'>
                    <div className='layout-title'>
                        <h1 className='my-title-text'>
                            예매내역
                        </h1>
                        <div className='my-nav'>
                            <Link>전체보기</Link>
                        </div>
                    </div>
                    <div className='layout-list'>
                        <div className='my-list-data'>
                            <label>공연명</label>
                        </div>
                        <div className='my-list-data'>
                            <label>예약자명</label>
                        </div>
                        <div className='my-list-data'>
                            <label>공연일자</label>
                        </div>
                        <div className='my-list-data'>
                            <label>결제상태</label>
                        </div>
                    </div>
                    {reservationList && reservationList.map((item) => (
                        <div key={item} className='layout-list'>
                            <div className='my-list-data'>
                                <div className='data'>{item.RESERVATION_CONCERT_TITLE}</div>
                            </div>
                            <div className='my-list-data'>
                                <div className='data'>{item.RESERVATION_PERSON_NAME}</div>
                            </div>
                            <div className='my-list-data'>
                                <div className='data'>{item.RESERVATION_CONCERT_DATE}</div>
                            </div>
                            <div className='my-list-data'>
                                <div className='data'>{item.RESERVATION_STATUS}</div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
            {/* 페이지네이션 UI */}
            <div className="row mt-2">
                <div className="col">
                    <nav aria-label="...">
                        <ul className="pagination justify-content-center"> {/* 클래스 이름이 'pagination'으로 변경됨 */}
                            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={previousPage}> {/* 'page-item.active .page-link' 클래스는 제거됨 */}
                                    <GrFormPrevious />
                                </button>
                            </li>
                            {[...Array(count).keys()].map(pageNumber => (
                                <li key={pageNumber + 1} className={`page-item ${page === pageNumber + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => pageChange(pageNumber + 1)}>{pageNumber + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${page === count ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={nextPage}>
                                    <GrFormNext />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* 페이지네이션 UI 끝 */}
        </div>
    )
}

export default MyLayout;
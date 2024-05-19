import './MyLayout.css';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const MyLayout = ({ 
    reservationList,
    seatList,
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
                    </div>                   
                    {reservationList && reservationList.length !== 0 ? reservationList.map((item, idx) => (
                        <div className="box-info">
                            <div className="detail-area">
                                <div className="reservation-info-wrap">
                                    <h2 className="box-contents artHouse">
                                        <span className="res-title">{item.RESERVATION_CONCERT_TITLE}</span>
                                        <span className="res-price">{item.SUM_PRICE.toLocaleString()}원</span>
                                    </h2>
                                    <ul className="reservation-mv-info">
                                        <li>
                                            <dl>
                                                <dt>예약자명</dt>
                                                <dd>{item.RESERVATION_PERSON_NAME}</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt>관람인원</dt>
                                                <dd>{item.RESERVATION_COUNT}명</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt>관람일시</dt>
                                                <dd className="txt-red">{item.RESERVATION_CONCERT_DATE}</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt>관람좌석</dt>
                                                <dd className='seat-list'>
                                                    {seatList[idx].map((data, i) => {
                                                        let seat = " ";
                                                        if(data.RESERVATION_PAY_DATE === item.PAY_DATE) {
                                                            seat += ` ${data.SEAT_LEVEL}석 `;
                                                            if(seatList[idx].length === 1) {
                                                                seat += data.SEAT_CHOICE;
                                                            } else if(i === seatList[idx].length-1) {
                                                                seat += data.SEAT_CHOICE;
                                                            } else {
                                                                seat += data.SEAT_CHOICE+", ";
                                                            }
                                                        }
                                                        return <div key={i}>{seat}</div>;
                                                    })}
                                                </dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt>예약상태</dt>
                                                <dd>{item.RESERVATION_STATUS}</dd>
                                            </dl>
                                        </li>
                                        <li>
                                            <dl>
                                                <dt>매수</dt>
                                                <dd>{item.RESERVATION_COUNT}매</dd>
                                            </dl>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                    )) : 
                        <div>
                            <div className="detail-area">
                                <div className="reservation-info-wrap">
                                    <h2 className="box-contents artHouse">
                                        <span className="res-title">예매내역이 없습니다.</span>
                                    </h2>
                                </div>
                            </div>
                        </div>}
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
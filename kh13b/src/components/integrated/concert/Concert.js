import { useCallback, useEffect, useState } from 'react';
import axios from '../../utils/CustomAxios';
import Jumbotron from "../../Jumbotron";
import { Link } from "react-router-dom";
import './Concert.css';
//랜덤 포스터 출력
import poster1 from "../../Home/swiper/Bannerimg/3.jpg";
import poster2 from "../../Home/swiper/Bannerimg/2.jpg";
import poster3 from "../../Home/swiper/Bannerimg/1.jpg";

//** 현재 날짜 기준 지난 공연들은 안나오게 구현
const Concert = () => {
    const [concerts, setConcerts] = useState([]);
    //랜덤 포스터 출력
    const posters = [poster1, poster2, poster3];
    useEffect(() => {
        loadData();
    }, []);

    const loadData = useCallback(async () => {
        try {
            const resp = await axios.get("/concertRequest/");
            // 승인 상태가 'y'이고 현재 날짜 이후인 공연만 필터링하여 저장**
            const now = new Date();
            const approvedConcerts = resp.data.filter(concert => {
                const endDate = new Date(concert.concertRequestStartfDay);
                return concert.concertRequestState === 'y' && endDate > now;
            });
            await Promise.all(approvedConcerts.map(async (item, idx) => {
                await axios.get(`/concertRequest/getAttach/${item.concertRequestNo}`, {
                    responseType: 'arraybuffer',
                }).then((res) => {
                    const base64 = btoa(
                        new Uint8Array(res.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    );
                    approvedConcerts[idx].concertImage = base64;
                }).catch((e) => {
                    console.log("파일 없음")
                });
            }));
            setConcerts(approvedConcerts);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }, []);

    const formatDate = (dateString) => {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dayOfWeek = daysOfWeek[date.getDay()];
        return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
    };
    // 랜덤 포스터 출력
    const getRandomPoster = () => {
        return posters[Math.floor(Math.random() * posters.length)];
    };

    return (
        <>
            <Jumbotron title="공연 목록" />
            <div className="container w-100">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">
                            <div className="row">
                                {concerts.map(concert => (
                                    <div key={concert.concertRequestNo} className="col-lg-6 mb-4">
                                        <Link to={`/concert/${concert.concertRequestNo}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div className="card h-100">
                                                <div className="row no-gutters">
                                                    <div className="col-md-3 concert-image">
                                                        {/* <img src={`data:image/;base64,${concert.concertImage}`} className="card-img" alt="뮤지컬 포스터" /> */}
                                                        {/* <img src={poster1} className="card-img" alt="뮤지컬 포스터" /> */}
                                                        <img src={getRandomPoster()} className="card-img" alt="뮤지컬 포스터" />
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="card-body">
                                                        <p className="card-text" style={{ fontWeight: 'bold' }}>[ {concert.concertRequestConcertGenre} ]</p>
                                                            <h5 className="card-title mt-2" style={{ fontWeight: 'bold' }}>{concert.concertRequestConcertName}</h5>
                                                            <p className="card-text mt-4"><strong>공연 일정 </strong> {formatDate(concert.concertRequestStarthDay)} ~ {formatDate(concert.concertRequestStartfDay)}</p>
                                                            <p className="card-text "><strong>제작사 </strong> {concert.concertRequestCompanyName}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Concert;

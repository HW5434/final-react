import Jumbotron from "../../Jumbotron";
import { useCallback, useEffect, useState } from 'react';
import axios from '../../utils/CustomAxios';
import { Link } from "react-router-dom";

const Concert = () => {
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = useCallback(async () => {
        const resp = await axios.get("/concertRequest/");
        setConcerts(resp.data)
    }, [concerts]);

    const formatDate = (dateString) => {
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dayOfWeek = daysOfWeek[date.getDay()];
        return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
    }
    return (
        <>
            <Jumbotron title="뮤지컬 정보" />
            <div className="row">
            {concerts.map(concert => (
                <div key={concert.concertRequestNo} className="col-lg-6 mb-4">
                    <Link to={`/concert/${concert.concertRequestNo}`}>
                    <div className="card h-100">
                        <div className="row no-gutters">
                            <div className="col-md-3">
                                <img src="https://www.charlottetheater.co.kr/_upload/ART/2024222133311_17637.jpg" className="card-img" alt="뮤지컬 포스터" />
                            </div>
                            <div className="col-md-9">
                                <div className="card-body">
                                    <h5 className="card-title">{concert.concertRequestConcertName}</h5>
                                    <p className="card-text"><strong>공연 일정:</strong> {formatDate(concert.concertRequestStarthDay)} ~ {formatDate(concert.concertRequestStartfDay)}</p>
                                    <p className="card-text"><strong>제작사:</strong> {concert.concertRequestCompanyName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                </div>
            ))}
        </div>
        </>
    );
}

export default Concert;
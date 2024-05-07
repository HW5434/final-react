import { useEffect, useState } from 'react';
import axios from '../../utils/CustomAxios';

const ConcertScheduleInfo = ({ concertNo }) => {
    const [schedules, setSchedules] = useState([]);
    console.log("concertNo:", concertNo);

    useEffect(() => {
        loadSchedules();
    }, [concertNo]);

    const loadSchedules = async () => {
        try {
            const resp = await axios.get(`/schedule/${concertNo}/byConcertNo`);
            setSchedules(resp.data);
        } catch (error) {
            console.error("Error loading schedules:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
    };

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <>
            <div className="row mt-4">
                {schedules.map(schedule => (
                    <div key={schedule.concertScheduleNo} className="col-lg-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{formatDate(schedule.concertScheduleStart)}</h5>
                                <p className="card-text"><strong>시간:</strong> {formatTime(schedule.concertScheduleStart)} - {formatTime(schedule.concertScheduleEnd)}</p>
                                <p className="card-text"><strong>배우:</strong></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ConcertScheduleInfo;

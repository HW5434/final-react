import { useEffect, useState } from "react";
import Jumbotron from "../../Jumbotron";
import axios from "../../utils/CustomAxios";

const ScheduleList = () => {

    const [concertSchedules, setConcertSchedules] = useState([]);
    const [castActors, setCastActors] = useState([]);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const schedule = await axios.get("/schedule/");
            const actor = await axios.get("/castActor/");
            setConcertSchedules(schedule.data);
            setCastActors(actor.data);

        } catch (error) {
            console.error("Error loading data:", error);
        }
    };
    return (
        <>
            <Jumbotron title="일정등록목록" />
            <div className="container w-100 justify-content-end mt-3">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="shadow-lg p-3 my-3 bg-light rounded w-100 h-100">
                            <table className="table text-center align-middle justify-content-end">
                                <thead>
                                    <tr>
                                        <th>공연 신청번호</th>
                                        <th>시작 날짜/시간</th>
                                        <th>종료 날짜/시간</th>
                                        <th>일정 등록 번호 </th>
                                    </tr>
                                </thead>
                                <tbody className="text-center align-middle justify-content-end">
                                    {concertSchedules.map(concertSchedule => (
                                        <tr key={concertSchedule.concertScheduleNo}>
                                            <td>{concertSchedule.concertScheduleNo}</td>
                                            <td>{concertSchedule.concertScheduleStart}</td>
                                            <td>{concertSchedule.concertScheduleEnd}</td>
                                            <td>{concertSchedule.concertRequestNo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};
export default ScheduleList;
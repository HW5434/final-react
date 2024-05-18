import { useEffect, useState, useCallback } from "react";
import Jumbotron from "../../Jumbotron";
import axios from "../../utils/CustomAxios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const ConcertScheduleAdd = () => {
    const { concertRequestNo } = useParams();

    const [startDateTime, setStartDateTime] = useState(new Date()); // 시작일시
    const [endDateTime, setEndDateTime] = useState(new Date()); // 종료일시
    // const [castActors, setCastActors] = useState([]); //배우 그룹번호
    // const [selectedActors, setSelectedActors] = useState([]);
    const [concertSchedules, setConcertSchedules] = useState([]);
    // const [actors, setActors] = useState([]);
    const [request, setRequests] = useState({});

    // useEffect(() => {
    //     loadActors();
    // }, []);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const schedule = await axios.get("/schedule/");
            // const actor = await axios.get("/castActor/");
            setConcertSchedules(schedule.data);
            // setCastActors(actor.data);

        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    // const loadActors = useCallback(async () => {
    //     try {
    //         const response = await axios.get("/actor/");
    //         setActors(response.data);
    //     } catch (error) {
    //         console.error("Error loading actors:", error);
    //     }
    // }, []);

    const loadRequestList = useCallback(async () => {
        const resp = await axios.get(`/concertRequest/${concertRequestNo}`);
        setRequests(request.data);
    }, [])
    console.log(request);

    // 시작일시 변경 핸들러
    const handleStartDateTimeChange = (date) => {
        setStartDateTime(date);
    };

    // 종료일시 변경 핸들러
    const handleEndDateTimeChange = (date) => {
        setEndDateTime(date);
    }

    // //버튼 클릭시 이벤트
    // const toggleActorSelection = (actorNo) => {
    //     const isSelected = selectedActors.includes(actorNo);
    //     const updatedSelectedActors = isSelected
    //         ? selectedActors.filter(id => id !== actorNo)
    //         : [...selectedActors, actorNo];
    //     setSelectedActors(updatedSelectedActors);
    // };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const saveAdd = useCallback(() => {
        const formattedStartDateTime = formatDate(startDateTime);
        const formattedEndDateTime = formatDate(endDateTime);

        const req = {
            concertRequestNo: concertRequestNo,
            concertScheduleStart: formattedStartDateTime,
            concertScheduleEnd: formattedEndDateTime,
            // 묶어서 보내지 않고 풀어서 전송함
            // concertScheduleNo:"",
            // concertSchedule: {
            // },
            // actors: selectedActors,
        };
        console.log(req);


        axios.post("/schedule/new", req)
            .then(response => {
                console.log("Schedule saved successfully", response.data);
                // 저장 성공 시 필요한 로직 추가
            })
            .catch(error => {
                console.error("Error saving schedule:", error);
            });
    }, [concertRequestNo, startDateTime, endDateTime]);

    return (
        <>
            <Jumbotron title="공연일정 등록" />

            <div className="row mt-4">
                <div className="col text-center">
                    <div className="container w-100">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="shadow-lg p-3 mt-5 mb-5 bg-light rounded w-100 h-80">
                                    <div className="row mt-4">
                                        <div className="col">
                                            <h2>일정 선택</h2>
                                        </div>
                                    </div>
                                    <div className='row mt-4'>
                                        <div className='col'>
                                            <input type="hidden" name="concertRequestNo"
                                                value={request.concertRequestNo}
                                                className='form-control' />
                                        </div>

                                    </div>

                                    {/* 시작날짜 */}

                                    <div className="row mt-4">
                                        <div className="col">
                                            <DatePicker
                                                selected={startDateTime} // 선택된 시작일시
                                                onChange={handleStartDateTimeChange} // 변경 핸들러
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={30}
                                                timeCaption="Start Time"
                                                dateFormat="MMMM d, yyyy HH:mm" // 날짜와 시간을 구분하여 표시
                                            />
                                        </div>
                                    </div>

                                    {/* 종료날짜 */}

                                    <div className="row mt-4">
                                        <div className="col">
                                            <DatePicker
                                                selected={endDateTime} // 선택된 종료일시
                                                onChange={handleEndDateTimeChange} // 변경 핸들러
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={30}
                                                timeCaption="End Time"
                                                dateFormat="MMMM d, yyyy HH:mm" // 날짜와 시간을 구분하여 표시
                                            />
                                        </div>
                                    </div>

                                    {/* 배우선택

                                    <div className='row mt-4' style={{ whiteSpace: 'nowrap' }}>
                                        {actors.map(actor => (
                                            <div key={actor.actorNo} className='col'>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        id={`actor-${actor.actorNo}`}
                                                        value={actor.actorNo}
                                                        onChange={() => toggleActorSelection(actor.actorNo)}
                                                    />
                                                    {actor.actorName}
                                                </label>
                                            </div>
                                        ))}
                                    </div> */}

                                    {/* 등록버튼 */}
                                    <div className="row mt-4">
                                        <div className="col">
                                            <button onClick={saveAdd} className="btn btn-primary">
                                                저장
                                            </button>
                                        </div>
                                    </div>

                                    {/* 목록
                                    <div className="container w-100 justify-content-end mt-3">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10">
                                                <div className="shadow-lg p-3 my-3 bg-light rounded w-100 h-80">
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
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConcertScheduleAdd;
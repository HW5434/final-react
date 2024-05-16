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
    const [selectedActors, setSelectedActors] = useState([]);
    const [actors, setActors] = useState([]);
    const [request,setRequests] = useState({});
    
    

    useEffect(() => {
        loadActors();
    }, []);

    const loadActors = useCallback(async () => {
        try {
            const response = await axios.get("/actor/");
            setActors(response.data);
        } catch (error) {
            console.error("Error loading actors:", error);
        }
    }, []);

    const   loadRequestList = useCallback (async ()=>{
        const resp = await axios.get(`/concertRequest/${concertRequestNo}`);
        setRequests(request.data);
    },[])
    console.log(request);

    // 시작일시 변경 핸들러
    const handleStartDateTimeChange = (date) => {
        setStartDateTime(date);
    };

    // 종료일시 변경 핸들러
    const handleEndDateTimeChange = (date) => {
        setEndDateTime(date);
    }

    const toggleActorSelection = (actorNo) => {
        const isSelected = selectedActors.includes(actorNo);
        const updatedSelectedActors = isSelected
            ? selectedActors.filter(id => id !== actorNo)
            : [...selectedActors, actorNo];
        setSelectedActors(updatedSelectedActors);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const saveAdd = useCallback(() => {
        const formattedStartDateTime = formatDate(startDateTime);
        const formattedEndDateTime = formatDate(endDateTime);
    
        const req = {
            concertRequestNo: concertRequestNo,
            // concertScheduleNo:"",
            concertSchedule: {
                concertScheduleStart: formattedStartDateTime,
                concertScheduleEnd: formattedEndDateTime,
            },
            actors: selectedActors,
        };
        console.log(req);

        axios.post("/schedule/", req)
            .then(response => {
                console.log("Schedule saved successfully", response.data);
                // 저장 성공 시 필요한 로직 추가
            })
            .catch(error => {
                console.error("Error saving schedule:", error);
            });
    }, [concertRequestNo, startDateTime, endDateTime, selectedActors]);




    

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
                                    <div className='row mt-4'>
                                        <div className='col'>
                                            <label>배우 선택</label>
                                            {actors.map(actor => (
                                                <div key={actor.actorNo}>
                                                    <input
                                                        type="checkbox"
                                                        id={`actor-${actor.actorNo}`}
                                                        value={actor.actorNo}
                                                        onChange={() => toggleActorSelection(actor.actorNo)}
                                                    />
                                                    <label htmlFor={`actor-${actor.actorNo}`}>
                                                        {actor.actorName}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col">
                                            <button onClick={saveAdd} className="btn btn-primary">
                                                저장
                                            </button>
                                        </div>
                                    </div>
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

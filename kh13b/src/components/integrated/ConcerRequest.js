import { useState } from "react"
import Jumbotron from './../Jumbotron';


const ConcerRequest = ()=>{
    const [concerRequests, setConcerRequests] = useState([]);
    const [input, setInput] = useState({
        concertRequestNo:"", 
        concertRequestCompanyName:"",
        concertRequestCompanyNumber:"",
        concertRequestRepresentative:"", 
        concertRequestManager:"", 
        concertRequestAddress:"", 
        concertRequestOfficeNumber:"", 
        concertRequestPhoneNumber:"", 
        concertRequestEmail:"", 
        concertRequestFax:"", 
        concertRequestConcertName:"", 
        concertRequestConcertGenre:"", 
        concertRequestAge:"", 
        concertRequestRuntimeFirst:"", 
        concertRequestIntermission:"", 
        concertRequestRuntimeSecond:"", 
        concertRequestHeadDay:"", 
        concertRequestFooterDay:"", 
        concertRequestReadyhDay:"", 
        concertRequestReadyfDay:"", 
        concertRequestStarthDay:"", 
        concertRequestStartfDay:"", 
        concertRequestWithdrawhDay:"", 
        concertRequestWithdrawfDay:"", 
        concertRequestSeatvip:"", 
        concertRequestSeatr:"", 
        concertRequestSeats:"", 
        concertRequestSeata:""
    });

    const bsModal = useRef();
    const openModal = useCallback(()=>{
        const modal = new Modal(bsModal.current);
        modal.show();
    },[bsModal]);
    const closeModal = useCallback(() => {
        const modal = Modal.getInstance(bsModal.current);
        modal.hide();
    }, [bsModal]);

return(
    <>
      <Jumbotron title="공연 대관 문의 양식"/>
        
    
    </>
)



}

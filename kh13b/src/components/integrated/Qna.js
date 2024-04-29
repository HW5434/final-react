import { useCallback, useEffect, useState } from 'react';
import Jumbotron from '../Jumbotron';
import axios from '../utils/CustomAxios';


function Qna() {

    //State
    const [qnas, setQnas] = useState([]);

    //최소 1회
    useEffect(()=>{
        loadData();
    },[]);

    // CallBack 함수 
    const loadData = useCallback(async () => {
        const resp = await axios.get("/qna/");
        setQnas(resp.data);
    }, [qnas]);


    return(
        <>
            <Jumbotron title="질문글 테스트" />

            {qnas.map((qna)=>(
                <div key={qna.qnaNo}>
                    <span>{qna.qnaNo}</span>
                    <span>{qna.qnaTitle}</span>
                    <span>{qna.qnaContent}</span>
                </div>
            ))}
        </>
    );

}

export default Qna;
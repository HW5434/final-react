import { useCallback, useEffect, useState } from 'react';
import Jumbotron from '../Jumbotron';
import axios from '../utils/CustomAxios';
import { RiDeleteBack2Fill } from "react-icons/ri";

function Qna() {

    //State
    const [qnas, setQnas] = useState([]);
    //등록 State
    const [input, setInput] = useState({
        qnaNo : "",
        qnaTitle : "",
        qnaContent : ""
    });

    //최소 1회
    useEffect(() => {
        loadData();
    }, []);

    // CallBack 함수
    const loadData = useCallback(async () => {
        const resp = await axios.get("/qna/");
        setQnas(resp.data);
    }, [qnas]);

    //삭제
    const deleteQna = useCallback(async (target) => {
        const choice = window.confirm("정말 삭제하시겠습니까?");
        if (choice === false) return;

        const resp = await axios.delete("/qna/" + target.qnaNo);
        loadData();
    }, [qnas]);

    //등록
    const saveInput = useCallback(() => {

    }, [input])

    return (
        <>
            <Jumbotron title="질문글 테스트" />

            <div className='row-4'>
                <div className='col'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>글제목</th>
                                <th>글 내용</th>
                                <th>임시 삭제버튼</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {qnas.map((qna) => (
                                <tr key={qna.qnaNo}>
                                    <td>{qna.qnaNo}</td>
                                    <td>{qna.qnaTitle}</td>
                                    <td>{qna.qnaContent}</td>
                                    <td>        
                                        <RiDeleteBack2Fill className='bnt text-danger'/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

}

export default Qna;
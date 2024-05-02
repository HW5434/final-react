import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from '../utils/CustomAxios';
import { useParams } from "react-router-dom";


const NoticeDetail = () => {

    const { noticeNo } = useParams();
    const [notice, setNotice] = useState([]);

    useEffect(() => {
        loadData();
    }, [noticeNo]);



    const loadData = useCallback(async () => {
        const resp = await axios.get(`/notice/${noticeNo}`);
        setNotice(resp.data)
    }, [noticeNo]);

    return (
        <>
            <Jumbotron title="상세페이지" content="공지글에 대한 페이지입니다." />
            <div className="row">
                <div className="col">
                    <div>
                        <h1>
                            {notice.noticeNo}번째 글
                        </h1>
                    </div>

                    <div>
                        {/* 공지글 제목 */}
                        {notice.noticeTitle}
                    </div>

                    <div>
                        {/* 공지글 내용 */}
                        {notice.noticeContent}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div>
                        <h1>
                            {notice.noticeNo}번째 글
                        </h1>
                    </div>

                    <div>
                        {/* 공지글 제목 */}
                        {notice.noticeTitle}
                    </div>

                    <div>
                        {/* 공지글 내용 */}
                        {notice.noticeContent}
                    </div>
                </div>
            </div>

            {/* 
            
            테이블로 설정했을때

            <table className="table">
                <thead>
                    <tr>
                        <th>공지글 내용</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        {notice.noticeContent}
                    </tr>
                </tbody>
            </table> */}


            {/* 
            이전글
             
            State에 -1한 값을 주소에 넣어볼까?
            */}

            {/* 
            다음글 

            State에 +1한 값을 주소에 넣어볼까?
            */}

        </>
    );


}

export default NoticeDetail;
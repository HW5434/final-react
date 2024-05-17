import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from '../utils/CustomAxios';
import { useParams } from "react-router-dom";
import Wrapper from "../Home/Wrapper";


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
            <Wrapper>
                <div className="row justify-content-center text-start">
                    <div className="col-md-10">
            <Jumbotron title="상세페이지" content="공지글에 대한 페이지입니다." />
                        <div className="row mt-5">
                            <div className="col">
                                <div className="">
                                    <h1>
                                        {notice.noticeNo}번째 글
                                    </h1>
                                    <hr/>
                                </div>

                                <div className="col">
                                    <div className="my-5">
                                        {/* 공지글 제목 */}
                                        <h2><strong>
                                            {notice.noticeTitle}
                                        </strong>
                                        </h2>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="my-5">
                                        {/* 공지글 내용 */}
                                        <h3>
                                            {notice.noticeContent}
                                        </h3>
                                    </div>
                                    <hr className="my-5"/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Wrapper>
        </>
    );


}

export default NoticeDetail;
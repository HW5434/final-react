import { useCallback, useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import axios from '../utils/CustomAxios';
import { useParams } from "react-router-dom";
import Wrapper from "../Home/Wrapper";
import './Notice.css';

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
            <div className="detail-wrapper">
                <Wrapper>
                    <div className="row justify-content-center text-start">
                        <div className="col-md-10">
                            {/* <Jumbotron title="상세페이지" content="공지글에 대한 페이지입니다." /> */}
                            <div className="row mt-5">
                                <div className="col">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h2>
                                            <strong>
                                                {notice.noticeTitle}
                                            </strong>
                                        </h2>
                                        <span>작성일 : {notice.noticeWdate}</span>
                                    </div>

                                    <div className="col">
                                        <div className="my-5">
                                            {/* 공지글 제목 */}

                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="my-5">
                                            {/* 공지글 내용 */}
                                            <div dangerouslySetInnerHTML={{ __html: notice.noticeContent }} />
                                        </div>
                                        <hr className="my-5" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Wrapper>
            </div>
        </>
    );
}

export default NoticeDetail;

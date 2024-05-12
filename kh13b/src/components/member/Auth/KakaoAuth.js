import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginIdState, loginGradeState } from "../../utils/RecoilData";
import axios from "../../utils/CustomAxios";
import { useNavigate } from "react-router-dom";

const KakaoAuth = () => {

    const [userInfo, setUserInfo] = useRecoilState(loginIdState);
    const navigate = useNavigate();
    const queryUrl = document.location.href.split('?',document.location.href.length)[1];
    const PARAMS = new URLSearchParams(queryUrl);
    const KAKAO_CODE = PARAMS.get("code");
    const [accessTokenFetching, setAccessTokenFetching] = useState(false);

    //recoil
    const [loginId, setLoginId] = useRecoilState(loginIdState);
    const [loginGrade, setLoginGrade] = useRecoilState(loginGradeState);

    // Access Token 받아오기
    const getAccessToken = async () => {
        if (accessTokenFetching) return; // Return early if fetching
        try {
            setAccessTokenFetching(true); // Set fetching to true
            const resp = await axios.get("/member/api/kakaoLogin/"+KAKAO_CODE,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setLoginId(resp.data.memberId);
            setLoginGrade(resp.data.memberGrade);
            axios.defaults.headers.common['Authorization'] = resp.data.accessToken;
            window.localStorage.setItem("refreshToken", resp.data.refreshToken);
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        if (KAKAO_CODE && !userInfo.accessToken) {
            getAccessToken();
        }
    }, [KAKAO_CODE, userInfo]);

}

export default KakaoAuth;
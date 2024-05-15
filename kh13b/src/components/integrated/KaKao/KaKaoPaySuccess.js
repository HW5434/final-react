import React, { useEffect, useCallback } from "react";
import axios from "../../utils/CustomAxios";
import { useLocation, useNavigate } from "react-router-dom";

const KaKaoPaySuccess =()=>{
    
    const location = useLocation();
    const navigator = useNavigate();
    
    console.log(location);
    
    const url = location.search;
    
    const pgToken = url.split('=')[1];
    
    console.log(pgToken);
    const kakaoPayData = JSON.parse(localStorage.getItem("kakaoPayData"));

    useEffect(() => {
        load();
    }, []);

    const load = useCallback(async() => {
        try {
            const postData = {
                partnerOrderId: kakaoPayData.partnerOrderId,
                partnerUserId: kakaoPayData.partnerUserId,
                tid: kakaoPayData.tid,
                pgToken: pgToken,
            };
            const resp = await axios.post("/kakaopay/success", postData);
            console.log("결제 승인 완료");
            console.log(resp);
            navigator("/ReservationFinish");
        } catch (error) {
            console.error("Error processing purchase:", error);
        }    
    });
}

export default KaKaoPaySuccess;
import { useCallback, useEffect, useState } from "react";
import axios from "../../../utils/CustomAxios";


const InfoEdit = () => {

    const [infoEdits, setInfoEdits] = useState([]);

    const [input, setInput] = ({
        memberName:"",
        memberPw:"",
        memberContact:"",
        memberBirth:"",
        memberPost:"",
        memberAddress1:"",
        memberAddress2:"",
    });

    //복원을 위한 백업
    const [backup, setBackup] = useState(null);

    const loadData = useCallback(async ()=> {
        const resp = await axios.get("/member/");
        setInfoEdits(resp.data);
    },[infoEdits]);

    useEffect(()=> {
        loadData();
    }, []);

    const editMemberHandle = useCallback((target)=>{
        //기존걸 복사
        const copy = [...infoEdits];

        
    });

    //view
    return (
        <>
        </>
    );
};

export default InfoEdit;
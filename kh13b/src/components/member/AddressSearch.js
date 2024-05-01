import { Postcode } from "react-daum-postcode";

import React, { useRef } from 'react';

const AddressSearch = () => {
    const memberPostRef = useRef(null);
    const memberAddress1Ref = useRef(null);
    const memberAddress2Ref = useRef(null);

    const handleClick = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                let addr = '';
                if (data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }

                memberPostRef.current.value = data.zonecode;
                memberAddress1Ref.current.value = addr;
                memberAddress2Ref.current.focus();
            }
        }).open();
    };

    return (
        <>
            <input type="text" name="memberPost" ref={memberPostRef} placeholder="우편번호" />
            <button type="button" className="btn-address-search" onClick={handleClick}>우편번호 찾기</button>
            <br />
            <input type="text" name="memberAddress1" ref={memberAddress1Ref} placeholder="주소" />
            <br />
            <input type="text" name="memberAddress2" ref={memberAddress2Ref} placeholder="상세주소" />
        </>
    );
};

export default AddressSearch;
import DaumPostcode from "react-daum-postcode";
import React, { useRef, useState, useEffect } from 'react';
import Modal from "react-modal";

const AddressSearch = ({
    input,
    handleSignUpInputChange
}) => {

    const [isOpen, setIsOpen] = useState(false);
    const postModalRef = useRef();

    const onToggleModal = () => {
        setIsOpen((prev) => !prev);
    };

    const completeHandler = (data) =>{
        input.memberPost = data.zonecode;
        input.memberAddress1 = data.roadAddress;
        setIsOpen(false);
    }

    useEffect(()=> {
        const outSideClick = (e) => {
           const { target } = e;
           if (isOpen && postModalRef.current) {
            onToggleModal(false);
           }
         };
         document.addEventListener("mousedown", outSideClick);
    }, [isOpen]);

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "400px",
            padding: "0",
            overflow: "hidden",
        },
    };

    return (
        <>
            <div className='row mt-4'>
                <div className='col'>
                    <label>우편번호</label>
                    <input type="text" name="memberPost" className="input-control" value={input.memberPost} />
                </div>
            </div>        
            <button type="button" className="mt-3 btn-address-search openData" onClick={onToggleModal}>우편번호 찾기</button>
            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                <DaumPostcode onComplete={completeHandler} height="100%" ref={postModalRef}/>
            </Modal>
            <div className='row mt-4'>
                <div className='col'>
                    <label>주소</label>
                    <input type="text" name="memberAddress1" className="input-control" value={input.memberAddress1} />
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <label>상세주소</label>
                    <input type="text" name="memberAddress2" className="input-control" value={input.memberAddress2} onChange={handleSignUpInputChange}/>
                </div>
            </div>
        </>
    );
};

export default AddressSearch;
import ReactQuill from "react-quill";
import { useState } from "react";
import axios from "../components/utils/CustomAxios";
import 'react-quill/dist/quill.snow.css';


function Test02() {

    const modules = {
        toolbar: {
          container: [
            ["image"],
            [{ header: [1, 2, 3, 4, 5, false] }],
            ["bold", "underline"],
          ],
        },
       };
       const [content, setContent] = useState("");
       console.log(content);
       const [title, setTitle] = useState("");
       const handleTitleChange = (e) => {
        setTitle(e.currentTarget.value);
       };
       const handleSubmit = async () => {
        const date = new Date();
        try {
          await axios({
            title: title,
            content,
            date,
          }).then((res) => console.log(res));
        } catch (error) {
          console.log(error);
        }
       };

    return(
        <>
            <div>
     <label htmlFor="title">제목</label>
     <input id="title" type="text" onChange={handleTitleChange} />
     <ReactQuill
       style={{ width: "800px", height: "600px" }}
       modules={modules}
       onChange={setContent}
     />
   </div>
   <button style={{ marginTop: "50px" }} onClick={handleSubmit}>
     제출
   </button>
        </>
    );
};


export default Test02;
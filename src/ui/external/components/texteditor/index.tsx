// import React  from 'react'
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// interface EditorProps {
//     value: string;
//     onChange: (value: string) => void;
//     placeholder: string;
// }
// const TextEditor:React.FC<EditorProps> = ({ value, onChange, placeholder }) => {
//     return <ReactQuill   style={{  height : 300}}  placeholder={placeholder} theme="snow" value={value} onChange={onChange}  className="quill-no-border" />;
// }

// export default TextEditor


import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const TextEditor: React.FC<EditorProps> = ({ value, onChange, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <div className={`quill-wrapper ${value  ? 'focused' : ''}`}>
            <ReactQuill
                style={{ height: 300 }}
                placeholder={placeholder}
                theme="snow"
                value={value}
                onChange={onChange}
                className="quill-no-border"
                onFocus={handleFocus} // Set focus state
                onBlur={handleBlur} // Set blur state
            />
        </div>
    );
}

export default TextEditor;

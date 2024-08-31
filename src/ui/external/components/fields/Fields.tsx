import React from 'react';


interface FieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    type: string;
    [key: string]: any;
    autoFocus?:boolean

}
const InputField:React.FC<FieldProps> = ({type,placeholder,onChange,value,autoFocus=false,...props}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value); 
      };
  return (<>
  <input autoFocus={autoFocus} type={type} value={value} onChange={handleChange} placeholder={placeholder} {...props} />
  </>)
}

export {InputField}
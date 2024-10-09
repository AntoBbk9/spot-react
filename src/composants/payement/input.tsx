import React from "react";

interface InputProps {
  id: string;
  label?: string;
  type: string;
  placeholder: string;
  register: any;
  errors: any;
  validation?: object;
}

const Input: React.FC<InputProps> = ({ id, label, type, placeholder, register, errors, validation }) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block font-semibold">{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, validation)}
        className={`border p-2 w-full h-10 rounded outline-none ${errors[id] ? "border-red-500" : ""}`}
      />
      {errors[id] && <p className="text-red-500">{errors[id]?.message}</p>}
    </div>
  );
};

export default Input;

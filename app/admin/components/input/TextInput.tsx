"use client";

import { useState } from "react";
import { IconType } from "react-icons";

interface TextInputProps {
  label: string;
  icon: IconType;
  children: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  icon: Icon,
  children,
}) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-lg font-semibold text-slate-600">
          {label}
        </span>
      </div>
      <label className="input input-bordered flex items-center gap-2">
        <Icon />
        {children}
      </label>
    </label>
  );
};

export default TextInput;

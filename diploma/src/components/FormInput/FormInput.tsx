import React from 'react';
import classNames from 'classnames';
import s from './FormInput.module.scss';

type InputProps = {
    value: string;
    label: string;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string; 
}

export const FormInput: React.FC<InputProps> = ({value, onChange, placeholder = '', className}) => {

  return (
        <div className={classNames(s.Container, className)}>
            <input type="text" className={s.Input} id="name" placeholder={placeholder} value={value} onChange={onChange} />
        </div>
  );
}


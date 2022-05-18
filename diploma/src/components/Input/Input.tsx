import React, { useState } from 'react';
import classNames from 'classnames';
import s from './Input.module.scss';

type InputProps = {
    value: string;
    label: string;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
    isError?: boolean;
    password?: boolean;
    errorText?: string;
    className?: string; 
    active?: boolean;
}

export const Input: React.FC<InputProps> = ({value, label, onChange, isError = false, password = false, errorText = '', className, active = false}) => {

    const [isActive, setIsActive] = useState(active);

    const [isFocus, setIsFocus] = useState(false);
    console.log(value);
    console.log(isActive);

    const handleFocus = () => {
        setIsFocus(!isFocus);
        value ? setIsActive(true) : setIsActive(!isActive);
    };

  return (
        <div className={classNames(s.Container, className)}>
            <label htmlFor={label} className={classNames(s.NameInput, {
                [s.Active]: isActive,
            })}>{label}</label>
            <input id={label} type={password ? 'password' : 'text'} className={classNames(s.Input, {
                [s.Error]: isError && !isFocus,
            })} onFocus={handleFocus} onBlur={handleFocus} value={value} onChange={onChange}/>
            {isError && !isFocus && <div className={s.ErrorText}>{errorText}</div>}
      </div>
  );
}


import React from 'react';
import classNames from 'classnames';
import s from './FormInput.module.scss';

type InputProps = {
    value: string;
    label: string;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    inputClassname?: string;
    smallPadding?: boolean
}

export const FormInput: React.FC<InputProps> = ({value, onChange, placeholder = '', className, smallPadding = false}) => {

  return (
        <div className={classNames(s.Container, className)}>
            <input type="text" className={classNames(s.Input, smallPadding && s.inputClassname)} id="name" placeholder={placeholder} value={value} onChange={onChange} />
        </div>
  );
}


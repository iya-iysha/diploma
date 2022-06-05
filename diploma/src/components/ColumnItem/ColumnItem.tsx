import React, { useState } from 'react';
import classNames from 'classnames';
import {FormInput} from '../FormInput/FormInput';
import s from './ColumnItem.module.scss';

type ColumnItemProps = {
    value: string;
    label: string;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string; 
    name: string;
    needChange?: boolean;
    setValue: (value: string) => void;
    handleChangeValue: (value: string) => () => void;

}

export const ColumnItem: React.FC<ColumnItemProps> = ({value, onChange, placeholder = '', className, name, needChange = false, setValue, handleChangeValue}) => {

    const [changeValue, setChangeValue] = useState(false);

  return (
    <div>
        <div>{name}</div>
        <div className={s.changeNote} onClick={() => {setChangeValue(true); setValue(name);}}>Изменить</div>
        {changeValue && needChange && 
            <div style={{marginTop: '40px'}}>
                <FormInput label='Название' className={s.EnterData} value={name} onChange={onChange} placeholder={'Название записи'}/>
                <div onClick={handleChangeValue(name)}>сохр</div>
            </div>}
    </div>
  );
}


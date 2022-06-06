import React, { useState } from 'react';
import classNames from 'classnames';
import s from './RegPage.module.scss';
import {Input} from '../../components/Input/Input';
import {registrateUser, logUser} from '../../actions/registration';


export const RegPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPass, setRepearPass] = useState('');
    const [activePage, setActivePage] = useState('Reg'); // false - Register page, true - LogIn page

    const handleChange = (setValue:(value: string) => void) => (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const wrongPassword = password && repeatPass && password !== repeatPass || false;

    const changePage = (pageName: string) => () => {
        setActivePage(pageName);
        setName('');
        setEmail('');
        setPassword('');
        setRepearPass('');
    }

    const handleClickLog = () => {
        if (activePage === 'Reg') {
            registrateUser({name: name, email: email, password: password});
        } else {
            logUser({name: name, password: password});
        }
    }

  return (
        <div className={s.Container}>
            <div className={s.Form}>
                <div className={s.Buttons}>
                    <div className={classNames(s.ButtonName, {
                        [s.Active]: activePage === 'Reg',
                    })} onClick={changePage('Reg')}>Регистрация</div>
                    <div className={classNames(s.ButtonName, {
                        [s.Active]: activePage === 'Log',
                    })} onClick={changePage('Log')}>Войти</div>
                </div>
                {activePage === 'Reg' ? (<React.Fragment>
                    <Input label='Имя' value={name} onChange={handleChange(setName)}/>
                    <Input label='Email' value={email} onChange={handleChange(setEmail)}/>
                    <Input label='Пароль' password value={password} onChange={handleChange(setPassword)}/>
                    <Input label='Повторите пароль' password value={repeatPass} onChange={handleChange(setRepearPass)} isError={wrongPassword} errorText={'Пароли не совпадают'}/>
                    </React.Fragment>) : (
                    <React.Fragment>
                        <Input label='Логин' value={name} onChange={handleChange(setName)}/>
                        <Input label='Пароль' value={password} password onChange={handleChange(setPassword)}/>
                    </React.Fragment>
                )}
                <div className={s.Button} onClick={handleClickLog}>{activePage === 'Reg' ? 'Зарегистрироваться' : 'Войти'}</div>
            </div>
        </div>
  );
}
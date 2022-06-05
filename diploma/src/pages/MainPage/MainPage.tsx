import s from './MainPage.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Input } from '../../components/Input/Input';
import {FormInput} from '../../components/FormInput/FormInput';

type TableRowProps = {
    name: string;
    userName: string;
    picture: File;
    text: string;
    index: number;
};

type Table = TableRowProps[];

export const MainPage = () => {

    const userName = 'iya-iysha';

    const [url, setUrl] = useState<File>();
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [clearImage, setClearImage] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [changeTitle, setChangeTitle] = useState(false);
    const [changeText, setChangeText] = useState(false);
    const [convertText, setConvertText] = useState('Распознанный текст');
    const [search, setSearch] = useState('');


    const [data, setData] = useState<Table>([]);

    const changeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event?.target?.files) {
            setUrl(event.target.files[0]);
            setClearImage(false);
        }
    }

    const handleChange = (setValue:(value: string) => void) => (event: React.FormEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const handleClick = () => {
        setData([...data, {name: name,
            userName: userName,
            picture: url ? url : new File(['cats'], 'cats.jpg'),
            text: convertText,
            index: data.length}]);
        setName('');
        setText('');
        setUrl(new File(['cats'], 'cats.jpg'));
        setClearImage(true);
        setAddNote(false);
        setConvertText('Распознанный текст');
    }

    console.log(url);

    const handleChangeTitle = (id: number, name: string) => () => {
        const newData = data.map(item => item.index === id ? {...item, name: name} : item);
        setData(newData);
        setName('');
        setChangeTitle(false);
     };

     const handleChangeText = (id: number, text: string) => () => {
        const newData = data.map(item => item.index === id ? {...item, text: text} : item);
        setData(newData);
        setText('');
        setChangeText(false);
     };

     console.log(search);
     console.log( data.filter(item => search ? item.name === search : item));

    return (
      <div className={s.Container}>
        {!!data.length ? <table className={s.Table}> 
            <caption className={s.Title}>История пользователя</caption>
            <FormInput label='Поиск' className={s.Search} value={search} onChange={handleChange(setSearch)} placeholder={'Введите название записи'} smallPadding/>

            <tr>
                <th>Название</th>
                <th>Пользователь</th>
                <th>Изображение</th>
                <th>Текст</th>
            </tr>
            <td>
                {data.filter(item => search ? item.name.includes(search) : item).map(item => <tr className={classNames(s.Column)}>
                    <div key={item.index}>
                        {changeTitle ? 
                            <div style={{marginTop: '40px'}}>
                                <FormInput label='Название' className={s.ChangeData} value={name} onChange={handleChange(setName)} placeholder={'Название записи'} smallPadding/>
                                <div onClick={handleChangeTitle(item.index, name)}>сохр</div>
                            </div> : 
                            <div>
                                <div>{item.name}</div>
                                <div className={s.changeNote} onClick={() => {setChangeTitle(true); setName(item.name);}}>Изменить</div>
                        </div>}
                    </div>
                    </tr>)}
            </td>
            <td>{data.filter(item => search ? item.name.includes(search) : item).map(item => <tr className={classNames(s.Column)}>{item.userName}</tr>)}</td>
            <td>{data.filter(item => search ? item.name.includes(search) : item).map(item => <tr className={s.Column}><img src={URL.createObjectURL(item.picture)} style={{height: '300px', marginTop: '40px'}}></img></tr>)}</td>
            <td>{data.filter(item => search ? item.name.includes(search) : item).map(item => <tr className={classNames(s.Column)}>
                <div key={item.index}>
                        {changeText ? 
                            <div style={{marginTop: '40px'}}>
                                <FormInput label='Название' className={s.ChangeData} value={text} onChange={handleChange(setText)} placeholder={'Название записи'} smallPadding/>
                                <div onClick={handleChangeText(item.index, text)}>сохр</div>
                            </div> : 
                            <div>
                                <div>{item.text}</div>
                                <div className={s.changeNote} onClick={() => {setChangeText(true); setText(item.text);}}>Изменить</div>
                        </div>}
                    </div>
            </tr>)}</td>
        </table> : <div style={{height: '100vh'}}> Данные об истории пользователей отсутствуют. Но вы можете их добавить, нажать на кнопку "Добавить запись" внизу страницы.
            </div>}
        {addNote ? <div className={s.AddForm}>
            <div className={s.ModalContent}>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <div className={s.UploadImage}>
                    <div style={{marginTop: '120px', position: 'relative'}}>
                        <label className={classNames(s.File, (url && url?.name !== 'cats.jpg') && s.HideBorders)} htmlFor="file">
                           Выберите файл
                            <input type="file" id="file" className={s.Input} onChange={changeFile}/>
                        </label>
                    </div>
                    {!clearImage && url && <img src={URL.createObjectURL(url)}className={s.Image}></img>}
                </div>
                <div className={s.ButtonConvert} onClick={handleClick}>{'=>'}</div>
                <div className={s.ConvertText}>{convertText}</div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '100px', alignItems: 'center'}}>
                    <div>
                        <FormInput label='Название' className={s.EnterData} value={name} onChange={handleChange(setName)} placeholder={'Название записи'}/>
                    </div>
                    <div>{userName}</div>
                    
                {/* <div style={{marginTop: '10px'}}>
                    <FormInput label='Текст' className={s.EnterData} value={text} onChange={handleChange(setText)} placeholder={'Текст'}/>
                </div> */}
                </div>
                <div className={s.Button} onClick={handleClick}>Добавить</div>
            </div>
        </div> : <div className={s.AddNote} onClick={() => setAddNote(true)}>Добавить запись</div>}
    </div>
  );
}

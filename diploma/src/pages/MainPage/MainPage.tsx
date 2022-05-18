import s from './MainPage.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { Input } from '../../components/Input/Input';
import {FormInput} from '../../components/FormInput/FormInput';

type TableRowProps = {
    name: string;
    userName: string;
    picture: File;
    text: string;
};

type Table = TableRowProps[];

// const table: Table = [{
//     name: 'name1',
//     userName: 'user1',
//     picture: '1',
//     text: 'I love cats',
// }, {
//     name: 'name2',
//     userName: 'user1',
//     picture: '2',
//     text: 'I love cats',
// }, {
//     name: 'name3',
//     userName: 'user1',
//     picture: '3',
//     text: 'I love cats',
// }]

export const MainPage = () => {

    const userName = 'iya-iysha';

    const [url, setUrl] = useState<File>();
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [clearImage, setClearImage] = useState(false);
    const [addNote, setAddNote] = useState(false);

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
            text: text}]);
        setName('');
        setText('');
        setUrl(new File(['cats'], 'cats.jpg'));
        setClearImage(true);
        setAddNote(false);
    }

    return (
      <div>
        {data && <table>
            <caption>История пользователя</caption>
            <tr>
                <th>Название</th>
                <th>Пользователь</th>
                <th>Изображение</th>
                <th>Текст</th>
            </tr>
            <td>
                {data.map(item => <tr>{item.name}</tr>)}
            </td>
            <td>{data.map(item => <tr>{item.userName}</tr>)}</td>
            <td>{data.map(item => <tr><img src={URL.createObjectURL(item.picture)} style={{width: '300px', marginTop: '40px'}}></img></tr>)}</td>
            <td>{data.map(item => <tr>{item.text}</tr>)}</td>
        </table>}
        {addNote ? <div>
            <div style={{marginTop: '40px'}}>
                <label className={s.File} htmlFor="file">
                    <input type="file" id="file" className={s.Input} onChange={changeFile}/>
                </label>
            </div>
            {!clearImage && url && <img src={URL.createObjectURL(url)} style={{height: '200px', marginTop: '40px'}}></img>}
            <div style={{marginTop: '40px'}}>
                <FormInput label='Название' className={s.EnterData} value={name} onChange={handleChange(setName)} placeholder={'Название записи'}/>
            </div>
            <div style={{marginTop: '10px'}}>
                <FormInput label='Текст' className={s.EnterData} value={text} onChange={handleChange(setText)} placeholder={'Текст'}/>
            </div>
            <div className={s.Button} onClick={handleClick}>Добавить</div>
        </div> : <div className={s.Button} onClick={() => setAddNote(true)}>Добавить запись</div>}
    </div>
  );
}



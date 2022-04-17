import s from './MainPage.module.scss';
import classNames from 'classnames';

type MainPageProps = {
    isAuth?: boolean;
    firstTime?: boolean;
    userName?:string;
}

export const MainPage: React.FC<MainPageProps> = ({isAuth = false, firstTime = false, userName = 'Kbhbkk'}) => {
  return (
    <div className={classNames(s.Container, s.Main)}>
        Главная страница будущего диплома {userName}
    </div>
  );
}

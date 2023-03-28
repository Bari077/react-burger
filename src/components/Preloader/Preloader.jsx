import style from './Preloader.module.css';

export const Preloader =()=> {
    return (
        <div className={style.box}>
            <div className={style.container}>
                <span className={style.circle}></span>
                <span className={style.circle}></span>
                <span className={style.circle}></span>
                <span className={style.circle}></span>
            </div>
        </div>
    )
}
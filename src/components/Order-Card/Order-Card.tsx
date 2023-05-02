import cardStyle from './Order-Card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks';
import { useMemo, useState, FC } from 'react';
import Modal from '../Modal/Modal';
import { useLocation } from 'react-router-dom';
import { FeedOrder } from '../Feed-Order/Feed-Order';
import { TFeedOrder, TIngredientDetails } from '../../services/types/data';

interface IOrderCardProps {
    order: TFeedOrder
}

export const OrderCard: FC<IOrderCardProps> = ({order})=> {
    
    const {pathname} = useLocation();
    const { createdAt, ingredients, name, number, status } = order;    
    const ingredientsList = useSelector(state=> state.ingredientsReducer.items);
    const orderIngredients = useMemo(() => {
        const orderIngredientsList = ingredients.reduce((arr: Array<TIngredientDetails>, ingredient) => {
          const isIngredient = ingredientsList.find((ingredientToFind) => ingredientToFind._id === ingredient);
          return isIngredient ? [...arr, isIngredient] : arr;
        }, []);
        
        const ingredientsCount = orderIngredientsList.reduce((arr: Array<TIngredientDetails & {count : number}>, ingredient) => {            
            let currentIngredient = arr.find(
              (arrIngrredient) => arrIngrredient._id === ingredient._id
            );
            if (currentIngredient) {
              currentIngredient.count += 1;
            } else {
              let currentIngredient = {
                count: 1,
                ...ingredient,
              };
              arr.push(currentIngredient);
            }
            return arr;
          }, []);
          return ingredientsCount;

    }, [ingredients, ingredientsList])

    const orderTotal = useMemo(
        ()=>
        orderIngredients.reduce((total, ingredient) => (total += ingredient.price * ingredient.count),
        0
        ), [orderIngredients]
    )
    
    const orderStatus = {
        done: 'Выполнен',
        pending: 'Готовится',
        created: 'Создан'
    }
    
    const [isShowModal, setIsShowModal] = useState({ visible: false });    
    
    const handleOpenModal =()=> {
        if(pathname === '/feed') {
            window.history.replaceState(null, "", `feed/${number}`);
        } else if(pathname === '/profile/orders') {
            window.history.replaceState(null, "", `orders/${number}`);
        }        
        setIsShowModal({ visible: true });                                     
    }

    const handleCloseModal =()=> {
        setIsShowModal({ visible: false });
        if(pathname === '/feed') {
            window.history.replaceState(null, "", `/feed`)
        }  else if(pathname === '/profile/orders') {
            window.history.replaceState(null, "", `/profile/orders`);
        }                 
    }

    const modal = (
        <Modal onClose={handleCloseModal} > 
           <FeedOrder order={order} ingredients={orderIngredients}/>
        </Modal>
    ); 

    return (
        <>
            <article className={cardStyle.card} onClick={handleOpenModal}>
                <div className={cardStyle.id}>
                    <p className="text text_type_digits-default"># {number}</p>
                    <time className="text text_type_main-default text_color_inactive" dateTime={createdAt}><FormattedDate date={new Date(createdAt)} /> i-GMT+3</time>
                </div>            
                <h3 className="text text_type_main-medium mb-2">{name}</h3>
                {pathname === '/feed' ? null :
                <span className={`text text_type_main-default mb-6 ${status === 'done' ? cardStyle.status: null}`}>{orderStatus[status]}</span>
                }                
                <div className={cardStyle.details}>
                    <ul className={cardStyle.itemList}>
                        {orderIngredients.map((item, index)=> (
                            index< 5 && 
                            <li style={{zIndex: 50 - index}} className={cardStyle.imageContainer} key={index}><img className={cardStyle.image} src={item.image} /></li>                        
                        ))}
                        {orderIngredients.map((item, index)=> (
                            index < 6 && index > 4 && 
                            <li style={{zIndex: 50 - index}} className={cardStyle.imageContainer} key={index}><img className={`${cardStyle.image} ${cardStyle.imageLast}`} src={item.image} />
                                <span className={`${cardStyle.imageCount} text text_type_main-default`}>+{orderIngredients.length-5}</span>
                            </li>                                             
                        ))}                                        
                    </ul>
                    <span className="text text_type_digits-default pr-2">{orderTotal}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </article>
            {isShowModal.visible && modal}
        </>        
    )
}
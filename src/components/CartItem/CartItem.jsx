import React from 'react';
import "./CartItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/actions/cartActions';
import { removeFromCart } from '../../store/actions/cartActions'; // Assuming you add this action

function CartItem({ item }) {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeFromCart(item.id));  // Dispatch remove action
    };

    return (
        <div className="item">
            <div className="item-image">
                <img src={`https://bookify.pythonanywhere.com/${item.image}`} alt={item.name} />
            </div>
            <div className="item-name">
                <p>{item.name}</p>
            </div>
            <div className="item-price">${item.price}</div>
            <div className="item-qty">
                <FontAwesomeIcon className='chng-qty' icon={faMinus} onClick={() => {
                    if (item.qty > 1) {
                        dispatch(addToCart(item.id, item.qty - 1));
                    } else if (item.qty === 1) {
                        handleRemove()
                    }
                }} />
                <span>{item.qty}</span>
                <FontAwesomeIcon className='chng-qty' icon={faPlus} onClick={() => {
                    dispatch(addToCart(item.id, item.qty + 1));
                }} />
            </div>
            <div className="item-del">
                <FontAwesomeIcon icon={faTrash} onClick={handleRemove} />
            </div>
        </div>
    );
}

export default React.memo(CartItem);

import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';


const HeaderCartButton = props => {
    const [btnHighLighted, setBtnHighLighted] = useState(false);

    const cartContext = useContext(CartContext);

    const { items } = cartContext;

    const numberOfCartItems = items.reduce((currNumber, item) => {
        return currNumber + item.amount;
    }, 0)

    const btnClasses = `${classes.button} ${btnHighLighted ? classes.bump : ''}`

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnHighLighted(true);

        const timer = setTimeout(() => {
            setBtnHighLighted(false);
        }, 300);

        return ()=>{
            clearTimeout(timer);
        };


    }, [items])


    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
};


export default HeaderCartButton;
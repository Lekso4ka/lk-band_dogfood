import { useState, useContext } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { ArrowThroughHeart, ArrowThroughHeartFill, Percent } from "react-bootstrap-icons";
import Ctx from "../../context";

// {img, name, price} => props (props.img, props.name, props.price)
const Card = ({
    img, 
    name, 
    price, 
    _id, 
    discount, 
    tags, 
    likes
}) => {
    const { setServerGoods, userId, api } = useContext(Ctx);
    // проверка, есть ли id пользователя в массиве с лайками товара
    const [isLike, setIsLike] = useState(likes.includes(userId));



    const updLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLike(!isLike);
        api.setLike(_id, !isLike)
            .then(data => {
                console.log(data);
                setServerGoods(function(old) {
                    console.log(old)
                    const arr = old.map(el => {
                        if (el._id === _id) {
                            return data;
                        } else {
                            return el;
                        }
                    }); 
                    return arr;
                })
            })
    }

    return <Link className="card" to={`/product/${_id}`}>
        {discount > 0 && <span className="card__discount"><Percent/> {discount}</span>}
        <span className="card__like" onClick={updLike}>
            {isLike ? <ArrowThroughHeartFill/> : <ArrowThroughHeart/>}
        </span>
        {/*<div src={img} alt="Картинка" className="card__img"/>*/}
        <span className="card__img2" style={{backgroundImage: `url(${img})`}}/>
        <span className="card__name">{name}</span>
        <span className="card__price">
            {discount > 0 
                ? <>
                    <del>{price}</del>
                    &nbsp;
                    {price * (100 - discount) / 100}
                </>
                : price
            } 
        &nbsp;₽</span>
        <button className="card__btn">В корзину</button>
        {/* <span className="card__tags">
            {tags.map(el => <span key={el}>{el}</span>)}
        </span> */}
    </Link>
}

export default Card;
import "./style.css";
import { Link } from "react-router-dom";
import { ArrowThroughHeart, ArrowThroughHeartFill, Percent } from "react-bootstrap-icons"

// {img, name, price} => props (props.img, props.name, props.price)
const Card = ({img, name, price, _id, discount, tags}) => {
    return <Link className="card" to={`/product/${_id}`}>
        {discount > 0 && <span className="card__discount"><Percent/> {discount}</span>}
        <span className="card__like"><ArrowThroughHeart/></span>
        <img src={img} alt="Картинка" className="card__img"/>
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
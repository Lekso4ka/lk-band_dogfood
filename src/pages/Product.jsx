import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect, useContext} from "react";
import {Trash} from "react-bootstrap-icons";
import Ctx from "../context";

import Loader from "../components/Loader";

const Product = () => {
    const [product, setProduct] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const {userId, setServerGoods, api} = useContext(Ctx);

    useEffect(() => {
        api.getSingleProduct(id)
            .then(data => {
                if (!data.err) {
                    console.log(data);
                    setProduct(data);
                }
            })
    }, []);

    /*
        product?.name
        ~
        product && product.name
    */

    const del = () => {
        api.delProduct(id)
            .then(data => {
                console.log(data);
                setServerGoods(prev => prev.filter(el => el._id !== id))
                navigate("/catalog")
            })
    }

    return <>
        { product.name 
            ? <>
                {userId === product.author._id && <button style={{justifySelf: "flex-end"}} onClick={del}><Trash/></button>}
                <h1>{product.name}</h1>
                <img src={product.pictures} alt={product.name} height="200" />
                <mark>{product.price}₽</mark>
            </>
            : <Loader/>
        }
        {/* <h1>
            {product.name ? product.name : "Страница одного товара"}
        </h1>
        {product.pictures && <img src={product.pictures} alt={product.name} />}
        {product.price && <mark>{product.price}₽</mark>} */}
    </>
}

export default Product;
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import Loader from "../components/Loader";

const Product = () => {
    const [product, setProduct] = useState({});
    const {id} = useParams();

    useEffect(() => {
        fetch(`https://api.react-learning.ru/products/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("rockToken")}`
            }
        })
            .then(res => res.json())
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
    return <>
        { product.name 
            ? <>
                <h1>{product.name}</h1>
                <img src={product.pictures} alt={product.name} />
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
import {useContext} from "react";
import {Link} from "react-router-dom";

import Ctx from "../context";

const Basket = () => {
    const {serverGoods} = useContext(Ctx);
    return <>
        <h1>Корзина</h1>
        <table>
            <thead>
                <tr>
                    <td>Изображение</td>
                    <td>Название</td>
                    <td>Количество</td>
                    <td>Цена</td>
                    <td>Скидка</td>
                    <td>Цена со скидкой</td>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </>
}

export default Basket;
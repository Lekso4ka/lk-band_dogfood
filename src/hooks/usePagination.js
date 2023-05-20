import {useState} from "react";

const usePagination = (data, cnt) => {
    const [current, setCurrent] = useState(1);
    // сколько страниц будет на сайте исходя из количества данных и сколько элементов мы хотим видеть на странице
    // 16 el => 5 el/page => pages = 4 (не 3,2!)
    const max = Math.ceil(data.length / cnt);
    return {current, max}
}

export default usePagination;
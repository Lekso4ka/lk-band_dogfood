import {useState} from "react";

const usePagination = (data, cnt) => {
    const [current, setCurrent] = useState(1);
    // сколько страниц будет на сайте исходя из количества данных и сколько элементов мы хотим видеть на странице
    // 16 el => 5 el/page => pages = 4 (не 3,2!)
    const max = Math.ceil(data.length / cnt);

    // функция принимает в себя номер страницы, которая становится активной
    const step = (page) => {
        setCurrent(page);
    }

    const prev = () => {
        // не выходим за рамки первой страницы (не должно быть <= 0)
        const prevPage = Math.max(current - 1, 1)
        setCurrent(prevPage)
    }

    const next = () => {
        // не выходим за рамки последней страницы (не должно быть > max)
        const nextPage = Math.min(current + 1, max)
        setCurrent(nextPage)
    }

    const setDataPerPage = () => {
        // cnt + current
        // 1 => arr[0, 20)
        // 2 => arr[20, 40)
        // 3 => arr[40, 60)
        let start = (current - 1) * cnt;
        let end = start + cnt;
        return data.slice(start, end);
    }

    return {current, max, step, prev, next, setDataPerPage}
}

export default usePagination;
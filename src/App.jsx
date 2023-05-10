/*
    Зачем здесь LS?
    Когда я запускаю программу, я сразу хочу видеть данные
    Но сервер говорит - у тебя нет токена, значит тебя нет, значит данных не будет (ИБ)

    Я вошла в систему и получила токен, поработала с данными и выключила React

    Когда я зайду снова - мне снова прийдется авторизоваться (чтобы получить токен)

    Что делать?

    Создавать переменную
    token="ey1242325..."

    При работе с облачными ресурсами (github) можно скомпроментировать свой токен и робот, получивший токен может обрушить нам всю БД

    Что делать?
    Созранить его в браузер

    localStorage.getItem("token")

    UserName и userId в ls можно и не хранить - можно принимать решение о том, что должно, а что не должно быть в LS самостоятельно

    Если у меня есть токен и он хр в переменной, а инф-я об имени пользователя нужна только в ЛК => Открыть страницу профиля и отправляем запрос на получение данных о пользователе, после чего отображаем их
*/

import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";

// компоненты (кусочки кода, которые используются многократно)
import {Header, Footer} from "./components/General";
import Modal from "./components/Modal";
import Search from "./components/Search";

// страницы - отдельный компонент со своим набором компонентов
import Draft from "./pages/Draft";
import Main from "./pages/Main";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";

/*
    TODO: проработать материал с лекции:
    - Изменить ссылки на Link внутри Logo и Footer
    - После входа перенаправлять пользователя на страница профиля (useNavigate)
    - В подвал добавить ссылку на Draft
*/

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("rockUser"));
    const [token, setToken] = useState(localStorage.getItem("rockToken"));
    // Товары из БД
    const [serverGoods, setServerGoods] = useState([]);
    // Товары для поиска и филтрации
    const [goods, setGoods] = useState(serverGoods);

    const [modalActive, setModalActive] = useState(false);

    // useEffect срабатывает каждый раз, когда компонент создался или перерисовался
    useEffect(() => {
        if (token) {
            fetch("https://api.react-learning.ru/products", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setServerGoods(data.products);
                })
        }
    }, [token])

    useEffect(() => {
        console.log("=)")
        setGoods(serverGoods);
    }, [serverGoods]);

    // useEffect(() => {
    //     console.log("Модалка изменилась")
    // }, [modalActive])

    useEffect(() => {
        console.log("Change User")
        if (user) {
            setToken(localStorage.getItem("rockToken"));
        } else {
            setToken("");
        }
        console.log("u", user);
    }, [user])

    return (
        <>
            <Header 
                user={user} 
                setModalActive={setModalActive}
            />
            <main>
                <Search arr={serverGoods} upd={setGoods}/>
                {/* 
                    SPA - Single Page Application (одностраничное)
                */}
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/catalog" element={<Catalog goods={goods}/>}/>
                    <Route path="/draft" element={<Draft/>}/>
                    <Route path="/profile" element={
                        <Profile user={user} setUser={setUser} color="yellow"/>
                    }/>
                    <Route path="/product/:id" element={<Product/>}/>
                </Routes>
                {/* 
                    /v2/:gr/posts/likes/:id
                    /v2/group-12/posts/likes/83745613476812
                    /v2/group-9/posts/likes/768883746527383
                */}
            </main>
            <Footer/>
            <Modal 
                active={modalActive} 
                setActive={setModalActive}
                setUser={setUser}
            />
        </>
    )
}

export default App;
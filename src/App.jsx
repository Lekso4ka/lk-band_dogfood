import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";

// подключаем контекст
import Ctx from "./context";
// подключаем API
import Api from "./api";

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
import Favorites from "./pages/Favorites";
import Add from './pages/AddProduct';

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("rockUser"));
    const [token, setToken] = useState(localStorage.getItem("rockToken"));
    const [userId, setUserId] = useState(localStorage.getItem("rockId"));
    // Поиск по сайту
    const [text, setText] = useState("");
    // Товары из БД
    const [serverGoods, setServerGoods] = useState([]);
    // Товары для поиска и филтрации
    const [goods, setGoods] = useState(serverGoods);
    // Получаем новости
    const [news, setNews] = useState([]);
    const [api, setApi] = useState(new Api(token));

    // useEffect(() => {
    //     fetch("https://newsapi.org/v2/everything?q=животные&sources=lenta&apiKey=6c7fc5e6a754429ab47063a1b1a54774")
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setNews(data.articles)
    //         })
    // }, [])
    const [modalActive, setModalActive] = useState(false);

    // useEffect срабатывает каждый раз, когда компонент создался или перерисовался
    useEffect(() => {
        setApi(new Api(token));
    }, [token])

    useEffect(() => {
        if (api.token) {
            api.getProduct()
                .then(data => {
                    console.log(data);
                    setServerGoods(data.products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
                })
        }
    }, [api.token])

    useEffect(() => {
        if (!goods.length) {
            console.log("=)")
            setGoods(serverGoods);
        }
    }, [serverGoods]);

    useEffect(() => {
        console.log("Change User")
        if (user) {
            setToken(localStorage.getItem("rockToken"));
            setUserId(localStorage.getItem("rockId"));
        } else {
            setToken("");
            setUserId("");
        }
        console.log("u", user);
    }, [user]);

    return (
        <Ctx.Provider value={{
            goods: goods,
            setGoods,
            setServerGoods,
            news,
            text,
            setText,
            userId,
            token,
            api
        }}>
            <Header 
                user={user} 
                setModalActive={setModalActive}
                serverGoods={serverGoods}
            />
            <main>
                <Search arr={serverGoods} />
                {/* 
                    SPA - Single Page Application (одностраничное)
                */}
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/catalog" element={<Catalog
                        setServerGoods={setServerGoods}
                    />}/>
                    <Route path="/add" element={<Add/>}/>
                    <Route path="/favorites" element={<Favorites 
                        goods={goods}
                        userId={userId}
                        setServerGoods={setServerGoods}
                    />}/>
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
        </Ctx.Provider>
    )
}

export default App;
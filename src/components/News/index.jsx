import {useState, useEffect, useContext} from "react";
// import Carousel from "better-react-carousel";
import {ScrollingCarousel} from "@trendyol-js/react-carousel";
import Ctx from "../../context";
import "./style.css"


const News = () => {
    const {news} = useContext(Ctx);
    const [data, setData] = useState(news || [])

    useEffect(() => {
            const id = setTimeout(() => {
                let updateArr = [...data];
                let firstNew = updateArr.shift();
                updateArr.push(firstNew);
                setData(updateArr);
            }, 4000)
            return () => clearTimeout(id);
    }, [data])

    useEffect(() => {
        setData(news)
    }, [news])

    return <>
        <div>
            <h2>1. Новости Lenta.ru</h2>
            <div className="news-block">
                {data.slice(0, 6).map((el,i) => <img
                    key={i}
                    src={el.urlToImage}
                    alt={el.title}
                    style={{
                        animation: "slide 2000ms linear 1"
                    }}
                />)}
            </div>
        </div>
        {/*<div>*/}
        {/*    <h2>2. Новости Lenta.ru</h2>*/}
        {/*    <Carousel cols={1} rows={1} gap={10} loop>*/}
        {/*        {news.map((el,i) => <Carousel.Item key={i}>*/}
        {/*            <img src={el.urlToImage} alt={el.title} />*/}
        {/*        </Carousel.Item>)}*/}
        {/*    </Carousel>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    <h2>3. Новости Lenta.ru</h2>*/}
        {/*        <ScrollingCarousel show={3} slide={3} swiping={true}>*/}
        {/*            {news.map((el,i) => <div>*/}
        {/*                <img src={el.urlToImage} height="100" alt={el.title} key={i} />*/}
        {/*            </div>)}*/}
        {/*        </ScrollingCarousel>*/}
        {/*</div>*/}
    </>
}

export default News;

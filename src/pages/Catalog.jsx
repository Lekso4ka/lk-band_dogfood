import Card from "../components/Card"

const Catalog = ({goods, setServerGoods}) => {
    return <div className="container">
        {goods.map(g => <Card 
            key={g._id} 
            {...g} 
            img={g.pictures} 
            setServerGoods={setServerGoods}
        />)}   
    </div>
}

export default Catalog;

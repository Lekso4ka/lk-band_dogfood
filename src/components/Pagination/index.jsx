import Item from "./Item"
import "./style.css"

const Pagination = ({hk}) => {
    let items = [];
    for (let i = 0; i < hk.max; i++) {
        items.push(<Item
            val={i+1}
            onClick={() => {}}
            active={hk.current === i+1}
            key={i}
        />)
    }
    return <div className="pagination">
        <Item start onClick={() => {}}/>
        <Item prev onClick={() => {}}/>
        {items}
        <Item next onClick={() => {}}/>
        <Item end onClick={() => {}}/>
    </div>
}

export default Pagination;
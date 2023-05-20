import { useState, useEffect, useContext } from "react";
import Ctx from "../../context"
import "./style.css";

// arr - список товаров из json-файла
const Search = ({arr}) => {
	const {setGoods, text, setText} = useContext(Ctx);
	// let text = "Corn";
	const [quantity, setQuantity] = useState(arr.length);
	/*
		useState = то, что создает пару из переменной и функции, которая ее изменяет

		Единственный аргумент useState - значение по умолчанию
	*/
	const [count, updateCount] = useState(0);
	useEffect(() => {
		if (text) {
			let result = arr.filter(el => new RegExp(text, "i").test(el.name))
			setGoods(result);
			setQuantity(result.length);
		} else {
			setGoods(arr);
			setQuantity(arr.length)
		}
	}, [arr]);
	let n = 1;
	const click = () => {
		// console.log(n++);
		/*
			Вызывая функцию updateCount , мы говорим приложению, что при следующем монтаже его параметр count будет равен новому значению
		*/
		updateCount(count + 1); // новое состояние
		console.log("count", count);
	}
	const searchByText = (e) => {
		// e.target (e.currentTarget) - обращение к тегу, на котором висит событие
		let val = e.target.value;
		setText(val);
		// let result = arr.filter(el => el.name.toLowerCase().includes(val.toLowerCase()));
		let result = arr.filter(el => new RegExp(val, "i").test(el.name))
		setGoods(result);
		setQuantity(result.length);
		console.log(result);
	}

	return (
		<div className="search-block">
			<input type="search" value={text} onChange={searchByText}/>
			{/*<input 
				type="search" 
				value={text} 
				onChange={(e) => setText(e.target.value)}/>*/}
			<button onClick={click}>Кнопочка</button>
			<hr/>
			{/*<div>{text}, {n}, {count}</div>*/}
			<div>По вашему запросу « {text} » найдено {quantity} подходящих товаров</div>
		</div>
	)
}

export default Search;


// Search => 
// 	document.createElement("div")
// 	...
// 	document.createElement("input")
// 	...
// 	button
// 	...
// 	div2
// 	div.append(input, button, div2)



/*
	<div onclick="foo()"></div>
	div.onclick = function() {}
	div.addEventListener("click", foo)

	<div onClick={foo}>
*/


/*
	Жизненный цикл компонента
		Рендеринг 
			render
		Монтировка (монтаж приложения)
			componentWillMount
			componentDidMount
		Размонтировка
			componentWillUnmount
			componentDidUnmount
			componentWillUpdate
			componentDidUpdate
*/













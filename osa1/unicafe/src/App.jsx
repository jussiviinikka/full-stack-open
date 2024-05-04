import { useState } from 'react'

const Button = ({onClick, text}) => (
	<button onClick={onClick}>{text}</button>
)

const App = () => {
	// tallenna napit omaan tilaansa
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const good_click = () => {
		setGood(good + 1)
	}
	const neutral_click = () => {
		setNeutral(neutral + 1)
	}
	const bad_click = () => {
		setBad(bad + 1)
	}
	
	return (
		<div>
			<h1>Give feedback</h1>
			<Button onClick={good_click} text="good"/>
			<Button onClick={neutral_click} text="neutral"/>
			<Button onClick={bad_click} text="bad"/>
			<br/>
			<h1>Statistics</h1>
			good: {good}<br/>
			neutral: {neutral}<br/>
			bad: {bad}<br/>
		</div>
	)
}

export default App

import { useState } from 'react'

const Button = ({onClick, text}) => (
	<button onClick={onClick}>{text}</button>
)

const StatisticLine = ({text, value}) => {
	return (<tr><td>{text}</td><td>{value}</td></tr>)
}

const Statistics = ({good, neutral, bad}) => {

	const all = () => (good + neutral + bad)
	const positive_perc = () => (
		<>{(100 * (good / (good + neutral + bad))).toFixed(1)} %</>
	)
	const average = () => (
		((good - bad) / all()).toFixed(1)
	)

	if (all() > 0) {
		return (
			<div>
			<h1>Statistics</h1>
				<table>
					<tbody>
						<StatisticLine text="good" value={good}/>
						<StatisticLine text="neutral" value={neutral}/>
						<StatisticLine text="bad" value={bad}/>
						<StatisticLine text="all" value={all()}/>
						<StatisticLine text="average" value={average()}/>
						<StatisticLine text="positive" value={positive_perc()}/>
					</tbody>
			</table>
			</div>
		)
	}
	return (
		<div>
			<h1>Statistics</h1>
			No feedback given.
		</div>
	)
}

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
			<Statistics good={good} neutral={neutral} bad={bad}/>
		</div>
	)
}

export default App

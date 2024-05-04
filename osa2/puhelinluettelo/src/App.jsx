import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({name, number}) => {
	return(
		<li key={name}>
			{name} {number}
		</li>
	)	
}

const Persons = ({persons}) => {
	return (
		<ul>
			{persons.map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
		</ul>
	)
}

const Filter = ({filter, onChange}) => {
	return (
			<div>
				filter shown with: 
				<input value={filter} onChange={onChange}/>
			</div>
	)
}

const PersonForm = (props) => {
	return (
		<form onSubmit={props.addNumber}>
			<div>
				name:
				<input
					value={props.newName}
					onChange={props.handleNameChange}
				/>
			</div>
			<div>
				number:
				<input
					value={props.newNumber}
					onChange={props.handleNumberChange}
				/>
			</div>				
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')	
	const [shownPersons, setShownPersons] = useState(persons)

	const baseUrl = 'http://localhost:3001/persons'
	
	useEffect(() => {
		axios
			.get(baseUrl)
			.then(response => {
				setPersons(response.data)
				setShownPersons(response.data)
			})
	}, [])

	const post = (person) => axios
		  .post(baseUrl, person)
		  .then(response => {console.log(response)})
	
	const addNumber = (event) => {
		event.preventDefault()
		const newPerson = {
			name: newName,
			number: newNumber
		}
		if (persons.some(p => p.name == newPerson.name))
		{alert(`${newName} is already added to phonebook`)}
		else {
			const new_persons = persons.concat(newPerson)
			setPersons(new_persons)
			setShownPersons(new_persons.filter(person =>
				person.name.toLowerCase().includes(filter)))
			post(newPerson)
		}
		setNewName('')
		setNewNumber('')
	}

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	const handleFilterChange = (event) => {
		const new_filter = event.target.value.toLowerCase()
		setFilter(new_filter)
		setShownPersons(persons.filter(person =>
			person.name.toLowerCase().includes(new_filter)))
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter value={filter} onChange={handleFilterChange}/>
			
			<h2>Add new</h2>
			<PersonForm {...{newName, handleNameChange, newNumber, handleNumberChange, addNumber}}/>
			
			<h2>Numbers</h2>
			<Persons persons={shownPersons}/>
		</div>
	)

}

export default App

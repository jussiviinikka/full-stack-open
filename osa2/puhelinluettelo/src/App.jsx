import { useState } from 'react'

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
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]) 
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')	
	const [shownPersons, setShownPersons] = useState(persons)

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

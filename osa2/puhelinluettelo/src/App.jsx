import { useState, useEffect } from 'react'
import personService from './services/persons'


const Person = ({id, name, number, remove_function}) => {
	return(
		<li key={name}>
			{name} {number}
			<button key={id} onClick={remove_function}>delete</button>
		</li>
	)	
}

const Persons = ({persons, remove_function}) => {
	return (
		<ul>
			{
				persons.map(
					person => <Person
								  key={person.name}
								  id={person.id}
								  name={person.name}
								  number={person.number}
								  remove_function={() => remove_function(person.name, person.id)}
							  />
				)}
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
		<form onSubmit={props.addPerson}>
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

 	useEffect(() => {
		personService
			.getAll()
			.then(response => {
				setPersons(response.data)
				setShownPersons(response.data)
			})
	}, [])

	const addPerson = (event) => {
		event.preventDefault()
		const newPerson = {
			name: newName,
			number: newNumber
		}
		if (persons.some(p => p.name == newPerson.name))
		{alert(`${newName} is already added to phonebook`)}
		else {			
			personService.create(newPerson)
				.then(response => {
					const newPerson = response.data
					const new_persons = persons.concat(newPerson)
					setPersons(new_persons)
					setShownPersons(new_persons.filter(person =>
						person.name.toLowerCase().includes(filter)))
				})
		}
		setNewName('')
		setNewNumber('')
	}

	const removePerson = (name, key) => {
		if (window.confirm(`Delete ${name}?`)) {
			personService.remove(key)
			setPersons(persons.filter(p => p.id != key))		
			setShownPersons(shownPersons.filter(p => p.id != key))
		}
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
			<PersonForm {...{newName, handleNameChange, newNumber, handleNumberChange, addPerson}}/>
			
			<h2>Numbers</h2>
			<Persons persons={shownPersons} remove_function={removePerson}/>
		</div>
	)

}

export default App

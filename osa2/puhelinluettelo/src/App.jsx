import { useState } from 'react'

const Numbers = ({persons}) => {
	return (
		<ul>
		{persons.map(person =>
			<li key={person.name}>
				{person.name} {person.number}
			</li>
		)}
		</ul>
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
			setPersons(persons.concat(newPerson))
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
		setShownPersons(persons.filter(person =>
			person.name.toLowerCase().includes(event.target.value.toLowerCase())))
	}

	return (
		<div>
			<h1>Phonebook</h1>
			<div>
				filter shown with: 
				<input onChange={handleFilterChange}/>
			</div>
			<h2>Add new</h2>
			<form onSubmit={addNumber}>
				<div>
					name:
					<input
						value={newName}
						onChange={handleNameChange}
					/>
				</div>
				<div>
					number:
					<input
						value={newNumber}
						onChange={handleNumberChange}
					/>
				</div>				
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>

			<Numbers persons={shownPersons}/>
		</div>
	)

}

export default App

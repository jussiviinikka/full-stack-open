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
		{ name: 'Arto Hellas', number: '040-123456' }
	]) 
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

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

	return (
		<div>
			<h2>Phonebook</h2>
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

			<Numbers persons={persons}/>
		</div>
	)

}

export default App

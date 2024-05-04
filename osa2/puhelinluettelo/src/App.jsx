import { useState } from 'react'

const Numbers = ({persons}) => {
	return (
		<ul>
		{persons.map(person =>
			<li key={person.name}>
				{person.name}
			</li>
		)}
		</ul>
	)
} 

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	]) 
	const [newName, setNewName] = useState('')

	const addNumber = (event) => {
		event.preventDefault()
		const newPerson = {
			name: newName
		}
		if (persons.some(p => p.name == newPerson.name))
		{alert(`${newName} is already added to phonebook`)}
		else {
			setPersons(persons.concat(newPerson))
		}
		setNewName('')		
	}

	const handleInputChange = (event) => {
		setNewName(event.target.value)
	}
	
	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addNumber}>
				<div>
					name:
					<input
						value={newName}
						onChange={handleInputChange}
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

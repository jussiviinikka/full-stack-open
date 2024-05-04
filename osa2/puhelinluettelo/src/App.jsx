
import { useState, useEffect } from "react";
import personService from "./services/persons";

const Person = ({ id, name, number, remove_function }) => {
  return (
    <li key={name}>
      {name} {number}
      <button key={id} onClick={remove_function}>
        delete
      </button>
    </li>
  );
};

const Persons = ({ persons, remove_function }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name}
          id={person.id}
          name={person.name}
          number={person.number}
          remove_function={() => remove_function(person.name, person.id)}
        />
      ))}
    </ul>
  );
};

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter shown with:
      <input value={filter} onChange={onChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name:
        <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Notification = ({ message, error }) => {
  const errorStyle = {
    color: "red",
  };
  const notStyle = {
    color: "green",
  };

  if (message === null) {
    return null;
  }
  if (error) {
    return <div style={errorStyle}>{message}</div>;
  }
  return <div style={notStyle}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [shownPersons, setShownPersons] = useState(persons);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
      setShownPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((p) => p.name == newPerson.name)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook,` +
            "replace the old number with a new one?",
        )
      ) {
        const key = persons.filter((p) => p.name === newName)[0].id;
        newPerson.id = key;
        personService.update(newPerson).then((response) => {
          if (response.status === 200) {
            const updated_persons = persons.map((p) =>
              p.id != key ? p : newPerson,
            );
            setPersons(updated_persons);
            setShownPersons(
              updated_persons.filter((person) =>
                person.name.toLowerCase().includes(filter),
              ),
            );
            setNotification(`Updated ${newName}`, false);
            setTimeout(() => {
              setNotification(null, false);
            }, 2000);
          }
        });
      }
    } else {
      personService.create(newPerson).then((response) => {
        if (response.status === 201) {
          const newPerson = response.data;
          const new_persons = persons.concat(newPerson);
          setPersons(new_persons);
          setShownPersons(
            new_persons.filter((person) =>
              person.name.toLowerCase().includes(filter),
            ),
          );
          setNotification(`Added ${newName}`, false);
          setTimeout(() => {
            setNotification(null, false);
          }, 2000);
        }
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const removePerson = (name, key) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(key).then((response) => {
        if (response.status === 200) {
          setPersons(persons.filter((p) => p.id != key));
          setShownPersons(shownPersons.filter((p) => p.id != key));
          setNotification(`Removed ${name}`, false);
          setTimeout(() => {
            setNotification(null, false);
          }, 2000);
        }
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    const new_filter = event.target.value.toLowerCase();
    setFilter(new_filter);
    setShownPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(new_filter),
      ),
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>Add new</h2>
      <PersonForm
        {...{
          newName,
          handleNameChange,
          newNumber,
          handleNumberChange,
          addPerson,
        }}
      />

      <h2>Numbers</h2>
      <Persons persons={shownPersons} remove_function={removePerson} />
    </div>
  );
};

export default App;

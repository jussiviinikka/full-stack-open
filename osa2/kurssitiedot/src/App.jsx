const Part = ({name, exercises}) => <p>{name}: {exercises}</p>

const Content = ({parts}) => {
	return (
		<ul>
		{parts.map(part =>
			<li key={part.id}>
				<Part name={part.name} exercises={part.exercises}/>
			</li>
		)}
		</ul>
	)
} 

const Header = ({name}) => <h1>{name}</h1>

const total = (parts) => parts.map(part => part.exercises).reduce((a, b) => a + b, 0)

const Course = ({course}) => {
	return (
		<div>
			<Header name={course.name}/>
			<Content parts={course.parts}/>
			total of  exercises {total(course.parts)}
		</div>
	)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App

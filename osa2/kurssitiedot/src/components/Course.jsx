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

const Header = ({name}) => <h2>{name}</h2>

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

export default Course

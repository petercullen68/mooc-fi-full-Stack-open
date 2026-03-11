const Header = ({ coursename }) => {
  return (
    <h2>{coursename}</h2>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part =>
        <li key={part.id} >
          <Part part={part} />
        </li>)}
    </ul>
  )
}

const Total = ( { parts }) => {
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
  return (
    <p>Total of {total} exercises</p>
  )
}


const Course = ({ course }) => {
  return (
    <div>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
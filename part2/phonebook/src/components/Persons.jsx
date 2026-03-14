const Person = ({ person }) => {
    return (
        <li>{person.name} {person.number}</li>
    )
}

const Persons = ({ filteredArray }) => {
    return (
        <ul>
            {filteredArray.map(person =>
                <Person key={person.id} person={person} />
            )}
        </ul>)
}

export default Persons
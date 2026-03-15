const Person = ({ person, deleteHandler }) => {
    return (
        <li>
            {person.name} {person.number}
            <button onClick={() => deleteHandler(person)}> delete </button>
        </li>
    )
}

const Persons = ({ filteredArray, deleteHandler }) => {
    return (
        <ul>
            {filteredArray.map(person =>
                <Person key={person.id} person={person} deleteHandler={deleteHandler} />
            )}
        </ul>)
}

export default Persons
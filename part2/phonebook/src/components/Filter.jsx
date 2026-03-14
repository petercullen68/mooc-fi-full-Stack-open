const Filter = ({ handleFilterChange, filterStart }) => {
    return (
        <div>
            filter show with:
            <input
                value={filterStart}
                onChange={handleFilterChange}
            />
        </div>
    )
}

export default Filter

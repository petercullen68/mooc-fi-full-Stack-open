const Filter = ({ handleFilterChange, filterStart }) => {
    return (
        <div>
            find countries:
            <input
                value={filterStart}
                onChange={handleFilterChange}
            />
        </div>
    )
}

export default Filter

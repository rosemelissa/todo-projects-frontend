import IFilter from "../Interfaces/IFilter";

interface FilterProps {
    filterMethod: IFilter;
    setFilterMethod: React.Dispatch<React.SetStateAction<IFilter>>;
}

function Filter({filterMethod, setFilterMethod}: FilterProps): JSX.Element {

    return (
        <div id="filter">
            <label htmlFor="filter-method">Filter by:</label>
            <select
            id="filter-method"
            name="filter-method"
            onChange={(e) => {setFilterMethod({...filterMethod, method: e.target.value})}}
            >
            <option value="id">Default</option>
            <option value="title">Title</option>
            <option value="dueDate">Due date</option>
            <option value="updatedDate">Updated date</option>
            <option value="id">Created date</option>
            </select>
            <label>
            Show overdue todos?
            {filterMethod.showOverdue ? (
                <input type="checkbox" defaultChecked onClick={() => {setFilterMethod({...filterMethod, showOverdue: false})}} />
            ) : (
                <input type="checkbox" onClick={() => {setFilterMethod({...filterMethod, showOverdue: true})}} />
            )}
            </label>
        </div>
    )
}

export default Filter;
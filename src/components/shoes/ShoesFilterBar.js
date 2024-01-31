import { years } from "../../utility.js"

export const ShoesFilterBar = ({ setFilteredYear, setSearchTerm }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search..."
        className="shoe-search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="year-dropdown"
        onChange={(e) => setFilteredYear(e.target.value)}
      >
        <option value={0} key={0}>
          Filter by year...
        </option>
        <option value={1} key={1}>
          All Years
        </option>
        {years.map((year) => {
          return (
            <option value={year.year} key={year.id + 1}>
              {year.year}
            </option>
          )
        })}
      </select>
    </div>
  )
}

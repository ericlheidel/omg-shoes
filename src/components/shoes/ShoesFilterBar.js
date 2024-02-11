import "./ShoesFilterBar.css"
import { years } from "../../utility.js"

export const ShoesFilterBar = ({ setFilteredYear, setSearchTerm }) => {
  return (
    <div className="shoes-filter-bar">
      <input
        type="text"
        placeholder="Search..."
        className="shoe-search"
        spellCheck={false}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="year-dropdown"
        onChange={(e) => setFilteredYear(e.target.value)}
      >
        <option value={0} key={0}>
          All Years
        </option>
        {years.map((year) => {
          return (
            <option value={year.year} key={year.id}>
              {year.year}
            </option>
          )
        })}
      </select>
    </div>
  )
}

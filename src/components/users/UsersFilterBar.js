import "./UsersFilterBar.css"

export const UsersFilterBar = ({ setSearchTerm }) => {
  return (
    <div className="user-filter-bar">
      <input
        type="text"
        placeholder="Search..."
        className="user-search"
        spellCheck={false}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

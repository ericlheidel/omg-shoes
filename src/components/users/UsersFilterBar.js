import "./Users.css"

export const UsersFilterBar = ({ setSearchTerm }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search..."
        className="user-search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

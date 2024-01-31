export const UsersFilterBar = ({ setSearchTerm }) => {
  return (
    <div className="user-filter-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

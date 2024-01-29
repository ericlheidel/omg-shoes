export const Welcome = ({ currentUser }) => {
  return (
    <div>
      <h1>
        <span>
          Welcome, {currentUser.firstName} {currentUser.lastName}, to
        </span>
        <span>OMG...Shoes</span>
        <span>Your Home for</span>
        <span>Vintage Dunks</span>
      </h1>
      <button>Enter</button>
    </div>
  )
}

import "./Welcome.css"

export const Welcome = () => {
  return (
    <div className="welcome-div center">
      <h1>
        <span>Welcome to</span>
        <span>OMG, Shoes...</span>
      </h1>
      <div>Your Home for Vintage Nike Dunks</div>
      <img
        src="https://pbs.twimg.com/media/E25w2ORWQAMuBio?format=jpg&name=medium"
        alt="Pile of Nike dunks"
        className="welcome-img"
      />
    </div>
  )
}

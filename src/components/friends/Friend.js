import { Link } from "react-router-dom"

export const Friend = ({ friend }) => {
  return (
    <div className="friend">
      <Link to={`/users/${friend.friendId}`}>
        <img
          className="friend-avatar"
          src={friend.friendAvatar}
          alt="friend avatar"
        />
      </Link>
      {/* <div className="friend-name test">{friend.friendName}</div> */}
    </div>
  )
}

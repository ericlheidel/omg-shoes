export const Friend = ({ friend }) => {
  return (
    <div className="friend">
      <img
        className="friend-avatar"
        src={friend.friendAvatar}
        alt="friend avatar"
      />
      {/* <div className="friend-name test">{friend.friendName}</div> */}
    </div>
  )
}

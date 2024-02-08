import { useEffect, useState } from "react"
import { getAllFriendships } from "../../services/friendsService.js"
import "./FriendsList.css"
import { Friend } from "./Friend.js"

export const FriendsList = ({ userId }) => {
  const [friendships, setFriendships] = useState([])
  const [userFriends, setUserFriends] = useState([])

  useEffect(() => {
    getAllFriendships().then((data) => {
      setFriendships(data)
    })
  }, [])

  useEffect(() => {
    const foundFriends = friendships.filter(
      (friend) => friend.userId === parseInt(userId)
    )
    setUserFriends(foundFriends)
  }, [friendships, userId])

  console.log(userId)

  return (
    <>
      {userFriends.length === 0 ? (
        ""
      ) : (
        <>
          <div className="friends-title">Friends</div>
          <div className="friends-list">
            {userFriends.map((friend) => {
              return <Friend friend={friend} key={friend.id} />
            })}
          </div>
        </>
      )}
    </>
  )
}

export const FriendButton = () => {
  return (
    <>
      <button className="friend-btn">Add Friend</button>
      <button className="friend-btn">Remove Friend</button>
    </>
  )
}

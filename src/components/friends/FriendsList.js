import { useEffect, useState } from "react"
import { getFriendsByUserId } from "../../services/friendsService.js"
import "./FriendsList.css"
import { Friend } from "./Friend.js"

export const FriendsList = ({ userId }) => {
  const [userFriends, setUserFriends] = useState([])

  useEffect(() => {
    getFriendsByUserId(userId).then((data) => {
      setUserFriends(data)
    })
  }, [userId])

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

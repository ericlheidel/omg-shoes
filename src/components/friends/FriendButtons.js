import { useEffect, useState } from "react"
import { getAllUsers, getUserById } from "../../services/usersService.js"
import {
  addFriendship,
  getAllFriendships,
  removeFriendshipById,
} from "../../services/friendsService.js"

export const FriendButtons = ({ userId, currentUser }) => {
  const [friendships, setFriendships] = useState([])
  const [currentlyViewedUser, setCurrentlyViewedUser] = useState([])
  const [currentUserInfo, setCurrentUserInfo] = useState([])
  const [foundFriendship, setFoundFriendship] = useState([])

  useEffect(() => {
    getAllFriendships().then((data) => {
      setFriendships(data)
    })
  }, [])

  useEffect(() => {
    getUserById(userId).then((data) => {
      setCurrentlyViewedUser(data)
    })
  }, [userId])

  useEffect(() => {
    getUserById(currentUser.id).then((data) => {
      setCurrentUserInfo(data)
    })
  }, [currentUser])

  useEffect(() => {
    const foundFriendMatch = friendships.filter(
      (friendship) =>
        friendship.friendId === parseInt(userId) &&
        friendship.userId === currentUser.id
    )
    if (foundFriendMatch.length === 1) {
      setFoundFriendship(foundFriendMatch)
    }
  }, [friendships, userId])

  const handleAddFriend = () => {
    const newFriendship = {
      userId: currentUser.id,
      userName: currentUserInfo.name,
      friendId: parseInt(userId),
      friendName: currentlyViewedUser.name,
      friendAvatar: currentlyViewedUser.avatar,
    }
    addFriendship(newFriendship).then(() => {
      getAllFriendships().then((data) => {
        setFriendships(data)
      })
    })
  }

  const handleRemoveFriend = () => {
    // const foundFriendship = friendships.filter(
    //   (friendship) => friendship.friendId === parseInt(userId)
    // )
    removeFriendshipById(foundFriendship[0].id).then(() => {
      getAllFriendships().then((data) => {
        setFriendships(data)
        setFoundFriendship([])
      })
    })
  }

  return (
    <>
      {parseInt(userId) === currentUser.id ? (
        ""
      ) : (
        <>
          {foundFriendship.length === 1 && (
            <button className="remove-friend-btn" onClick={handleRemoveFriend}>
              Remove Friend
            </button>
          )}
          {foundFriendship.length === 0 && (
            <button className="add-friend-btn" onClick={handleAddFriend}>
              Add Friend
            </button>
          )}
          {/* <button
            className="add-friend-btn"
            hidden={isHidden}
            onClick={handleAdd}
          >
            Add Friend
          </button>
          <button
            className="remove-friend-btn"
            hidden={!isHidden}
            onClick={handleRemoveFriend}
          >
            Remove Friend
          </button> */}
        </>
      )}
    </>
  )
}

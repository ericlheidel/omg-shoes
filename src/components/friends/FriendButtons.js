import "./Friends.css"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/usersService.js"
import {
  addFriendship,
  getAllFriendships,
  removeFriendshipById,
} from "../../services/friendsService.js"

export const FriendButtons = ({
  userId,
  currentUser,
  getAndSetUserFriends,
}) => {
  const [friendships, setFriendships] = useState([])
  const [currentlyViewedUser, setCurrentlyViewedUser] = useState([])
  const [currentUserInfo, setCurrentUserInfo] = useState([])
  const [foundInitiator, setFoundInitiator] = useState([])
  const [foundRecipient, setFoundRecipient] = useState([])

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
    const foundInitiatorMatch = friendships.filter(
      (friendship) =>
        friendship.friendId === parseInt(userId) &&
        friendship.userId === currentUser.id
    )
    if (foundInitiatorMatch.length === 1) {
      setFoundInitiator(foundInitiatorMatch)
    }
  }, [currentUser, friendships, userId])

  useEffect(() => {
    const foundRecipientMatch = friendships.filter(
      (friendship) =>
        friendship.friendId === currentUser.id &&
        friendship.userId === currentlyViewedUser.id
    )
    if (foundRecipientMatch.length === 1) {
      setFoundRecipient(foundRecipientMatch)
    }
  }, [currentUser, currentlyViewedUser, friendships])

  const handleAdd = () => {
    const newInitiator = {
      userId: currentUser.id,
      userName: currentUserInfo.name,
      friendId: parseInt(userId),
      friendName: currentlyViewedUser.name,
      friendAvatar: currentlyViewedUser.avatar,
    }
    addFriendship(newInitiator)
      .then(() => {
        getAllFriendships().then((data) => {
          setFriendships(data)
          getAndSetUserFriends()
        })
      })
      .catch(console.error)
    const newRecipient = {
      userId: currentlyViewedUser.id,
      userName: currentlyViewedUser.name,
      friendId: currentUser.id,
      friendName: currentUserInfo.name,
      friendAvatar: currentUserInfo.avatar,
    }
    addFriendship(newRecipient)
      .then(() => {
        getAllFriendships().then((data) => {
          setFriendships(data)
          getAndSetUserFriends()
        })
      })
      .catch(console.error)
  }

  const handleRemove = () => {
    removeFriendshipById(foundInitiator[0].id).then(() => {
      removeFriendshipById(foundRecipient[0].id).then(() => {
        getAllFriendships().then((data) => {
          setFriendships(data)
          setFoundInitiator([])
          setFoundRecipient([])
          getAndSetUserFriends()
        })
      })
    })
  }

  return (
    <>
      {parseInt(userId) === currentUser.id ? (
        ""
      ) : (
        <>
          {foundInitiator.length === 1 && foundRecipient.length === 1 && (
            <button className="remove-friend-btn" onClick={handleRemove}>
              Remove Friend
            </button>
          )}
          {foundInitiator.length === 0 && foundRecipient.length === 0 && (
            <button className="add-friend-btn" onClick={handleAdd}>
              Add Friend
            </button>
          )}
        </>
      )}
    </>
  )
}

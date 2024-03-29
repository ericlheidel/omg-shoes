import { useEffect, useState } from "react"
import "./LikesDiv.css"
import { postLike, removeLikeById } from "../../services/likesService.js"
import { getUserShoeById } from "../../services/userShoeService.js"

export const LikesDiv = ({ currentUser, userShoe }) => {
  const [currentUserShoe, setCurrentUserShoe] = useState([])

  useEffect(() => {
    setCurrentUserShoe(userShoe)
  }, [userShoe])

  const addLike = () => {
    const foundLike = currentUserShoe.likes.filter(
      (like) => like.userId === currentUser.id
    )
    if (foundLike.length === 0) {
      const newLike = {
        userId: currentUser.id,
        userShoeId: currentUserShoe.id,
      }
      postLike(newLike).then(() => {
        getUserShoeById(userShoe.id).then((data) => {
          setCurrentUserShoe(data[0])
        })
      })
    }
  }

  const removeLike = () => {
    const foundLike = currentUserShoe.likes?.filter(
      (like) => like.userId === currentUser.id
    )
    if (foundLike.length === 1) {
      removeLikeById(foundLike[0].id).then(() => {
        getUserShoeById(userShoe.id).then((data) => {
          setCurrentUserShoe(data[0])
        })
      })
    }
  }

  return (
    <div className="likes-div flex">
      {currentUserShoe.likes?.find((like) => currentUser.id === like.userId) ? (
        <button className="like-btn" onClick={removeLike}>
          <i className="fa-solid fa-thumbs-down"></i>
        </button>
      ) : (
        <button className="like-btn" onClick={addLike}>
          <i className="fa-solid fa-thumbs-up"></i>
        </button>
      )}
      <div className="shoe-detail-one likes">
        {currentUserShoe.likes?.length ? currentUserShoe.likes?.length : "0"}
      </div>
    </div>
  )
}

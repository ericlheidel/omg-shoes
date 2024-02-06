import { useEffect, useState } from "react"
import "./LikesDiv.css"
import { postLike, removeLikeById } from "../../services/likesService.js"

export const LikesDiv = ({ currentUser, userShoe }) => {
  const [currentUserShoe, setCurrentUserShoe] = useState([])

  useEffect(() => {
    setCurrentUserShoe(userShoe)
  }, [userShoe])

  console.log(currentUserShoe)

  const addLike = () => {
    const foundLike = userShoe.likes.filter(
      (like) => currentUser.id === like.userId
    )
    if (!foundLike) {
      const newLike = {
        userId: currentUser.id,
        userShoeId: userShoe.id,
      }

      postLike(newLike).then(() => {
        //***************  THIS LINE
      })
    }
  }

  const removeLike = () => {
    const foundLike = userShoe.likes.filter(
      (like) => currentUser.id === like.userId
    )
    if (foundLike) {
      removeLikeById(foundLike.id).then(() => {
        //**********  THIS LINE
      })
    }
  }

  return (
    <div className="likes-div flex">
      {userShoe.likes?.find((like) => currentUser.id === like.userId) ? (
        <button className="like-btn" onClick={removeLike}>
          <i className="fa-solid fa-thumbs-down"></i>
        </button>
      ) : (
        <button className="like-btn" onClick={addLike}>
          <i className="fa-solid fa-thumbs-up"></i>
        </button>
      )}

      <div className="shoe-detail-one likes">{userShoe.likes?.length}</div>
    </div>
  )
}

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

  //ccccccccccccccccccccccccccccccccccccccccc
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

  //*   /$$$$$$$  /$$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$   /$$   /$$   /$$   /$$
  //*  | $$__  $$| $$__  $$ /$$__  $$| $$  /$$/| $$_____/| $$$ | $$  | $$  | $$  | $$
  //*  | $$  \ $$| $$  \ $$| $$  \ $$| $$ /$$/ | $$      | $$$$| $$  | $$  | $$  | $$
  //*  | $$$$$$$ | $$$$$$$/| $$  | $$| $$$$$/  | $$$$$   | $$ $$ $$  | $$  | $$  | $$
  //*  | $$__  $$| $$__  $$| $$  | $$| $$  $$  | $$__/   | $$  $$$$  |__/  |__/  |__/
  //*  | $$  \ $$| $$  \ $$| $$  | $$| $$\  $$ | $$      | $$\  $$$
  //*  | $$$$$$$/| $$  | $$|  $$$$$$/| $$ \  $$| $$$$$$$$| $$ \  $$   /$$   /$$   /$$
  //*  |_______/ |__/  |__/ \______/ |__/  \__/|________/|__/  \__/  |__/  |__/  |__/
  //! ********************  THIS IS NOT WORKING  ********************//
  //TODO Delete isn't deleting like by Id
  //TODO Like button isn't posting
  //TODO Like# isn't updated even when the post and delete was working
  //! ********************  THIS IS NOT WORKING  ********************//
  //*   /$$$$$$$  /$$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$   /$$   /$$   /$$   /$$
  //*  | $$__  $$| $$__  $$ /$$__  $$| $$  /$$/| $$_____/| $$$ | $$  | $$  | $$  | $$
  //*  | $$  \ $$| $$  \ $$| $$  \ $$| $$ /$$/ | $$      | $$$$| $$  | $$  | $$  | $$
  //*  | $$$$$$$ | $$$$$$$/| $$  | $$| $$$$$/  | $$$$$   | $$ $$ $$  | $$  | $$  | $$
  //*  | $$__  $$| $$__  $$| $$  | $$| $$  $$  | $$__/   | $$  $$$$  |__/  |__/  |__/
  //*  | $$  \ $$| $$  \ $$| $$  | $$| $$\  $$ | $$      | $$\  $$$
  //*  | $$$$$$$/| $$  | $$|  $$$$$$/| $$ \  $$| $$$$$$$$| $$ \  $$   /$$   /$$   /$$
  //*  |_______/ |__/  |__/ \______/ |__/  \__/|________/|__/  \__/  |__/  |__/  |__/
  //yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
  //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
  //ccccccccccccccccccccccccccccccccccccccccc

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

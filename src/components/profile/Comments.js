import { useEffect, useState } from "react"
import "./Comments.css"
import {
  addComment,
  getCommentsByUserShoeId,
} from "../../services/commentsService.js"
import { Comment } from "./Comment.js"

export const Comments = ({ currentUser, userShoeId }) => {
  const [userShoeComments, setUserShoeComments] = useState([])
  const [reversedUserShoeComments, setReversedUserShoeComments] = useState([])
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    getAndSetCommentsByUserShoeId(userShoeId)
  }, [userShoeId])

  const getAndSetCommentsByUserShoeId = () => {
    getCommentsByUserShoeId(userShoeId).then((data) => {
      setUserShoeComments(data)
    })
  }

  const handleSubmit = (e) => {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }

    const newComment = {
      userId: currentUser.id,
      userShoeId: parseInt(userShoeId),
      comment: commentText,
      timeStamp: new Date().toLocaleString("en-US", options),
      isEdited: false,
    }
    addComment(newComment).then(() =>
      getCommentsByUserShoeId(userShoeId).then((data) => {
        setUserShoeComments(data)
      })
    )
  }

  useEffect(() => {
    const reversed = userShoeComments.reverse()
    setReversedUserShoeComments(reversed)
  }, [userShoeComments])

  return (
    <div className="comments">
      <h2>COMMENTS</h2>
      <div className="new-comment-div">
        <textarea
          className="form-textarea comments-textarea"
          required
          value={commentText}
          placeholder="Leave a comment..."
          onChange={(e) => {
            setCommentText(e.target.value)
          }}
        ></textarea>
      </div>
      <div className="comments-btn-div">
        <button
          className="form-btn comment-btn"
          onClick={() => {
            handleSubmit()
            setCommentText("")
          }}
        >
          Submit
        </button>
      </div>
      <div className="old-comments-div">
        <article className="old-comments">
          {userShoeComments.map((commentObj) => {
            return (
              <Comment
                currentUser={currentUser}
                commentObj={commentObj}
                userShoeId={userShoeId}
                getAndSetCommentsByUserShoeId={getAndSetCommentsByUserShoeId}
                key={commentObj.id}
              />
            )
          })}
        </article>
      </div>
    </div>
  )
}

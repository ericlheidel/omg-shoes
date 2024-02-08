import { useEffect, useState } from "react"
import {
  removeCommentById,
  updateComment,
} from "../../services/commentsService.js"
import { getTodaysDateAndTime } from "../../utility.js"

export const Comment = ({
  currentUser,
  commentObj,
  userShoeId,
  getAndSetCommentsByUserShoeId,
}) => {
  const [isHidden, setIsHidden] = useState(false)
  const [originalCommentText, setOriginalCommentText] = useState("")
  const [updatedCommentText, setUpdatedCommentText] = useState(
    commentObj.comment
  )

  useEffect(() => {
    setOriginalCommentText(commentObj.comment)
  }, [commentObj])

  const handleDelete = () => {
    removeCommentById(commentObj.id).then(() => {
      getAndSetCommentsByUserShoeId(userShoeId)
    })
  }

  const handleUpdate = () => {
    const updatedComment = {
      id: commentObj.id,
      userId: currentUser.id,
      userShoeId: parseInt(userShoeId),
      comment: updatedCommentText,
      timeStamp: getTodaysDateAndTime(),
      isEdited: true,
    }
    updateComment(updatedComment).then(() => {
      getAndSetCommentsByUserShoeId(userShoeId)
    })
  }

  return (
    <div className="flex col">
      <div className="comment" hidden={isHidden}>
        {commentObj.comment}
      </div>
      <textarea
        className="comment"
        hidden={!isHidden}
        value={updatedCommentText}
        onChange={(e) => {
          setUpdatedCommentText(e.target.value)
        }}
      >
        {commentObj.comment}
      </textarea>
      <div className="commenter flex row">
        <img
          className="commenter-img"
          src={commentObj.user.avatar}
          alt="commenter"
        ></img>
        <div className="commenter-name">{commentObj.user.name}</div>
      </div>
      <div className="comment-btn-div flex">
        <div className="comment-timestamp">
          <i>
            <b>{commentObj.isEdited && "edited:"}</b>
          </i>{" "}
          {commentObj.timeStamp}
        </div>
        {currentUser.id === commentObj.userId && (
          <>
            <button
              className="form-btn cancel-btn"
              hidden={!isHidden}
              onClick={() => {
                setIsHidden(false)
                setUpdatedCommentText(originalCommentText)
              }}
            >
              X
            </button>
            <button
              className="form-btn submit-comment-btn"
              hidden={!isHidden}
              onClick={() => {
                handleUpdate()
                setIsHidden(false)
              }}
            >
              Submit
            </button>
            <button
              className="form-btn edit-comment-btn"
              hidden={isHidden}
              onClick={() => setIsHidden(true)}
            >
              Edit
            </button>
            <button
              className="form-btn delete-comment-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

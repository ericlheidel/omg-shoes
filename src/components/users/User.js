import { useEffect, useState } from "react"
import { getUserShoeCollectionByUserId } from "../../services/userShoeService.js"
import { Link } from "react-router-dom"

export const User = ({ userObj }) => {
  const [collectionAmount, setCollectionAmount] = useState(0)

  useEffect(() => {
    getUserShoeCollectionByUserId(userObj.id).then((collectionArray) => {
      setCollectionAmount(collectionArray)
    })
  }, [userObj])

  return (
    <div className="user-container">
      <div className="user-avatar">
        <img src={userObj.avatar} alt="User" />
      </div>
      <div className="user-info">
        <Link to={`/users/${userObj.id}`}>
          <div className="user-name">
            {userObj.firstName} {userObj.lastName}{" "}
            {userObj.hasEmoji ? "👟" : ""}
          </div>
        </Link>
        <div className="user-location">
          {userObj.city}, {userObj.state}
        </div>
        <div className="user-collection-amount">
          Shoes in Collection: {collectionAmount.length}
        </div>
      </div>
    </div>
  )
}

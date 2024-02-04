import "./User.css"
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
    <div className="user">
      <div className="user-img-div">
        <Link to={`/users/${userObj.id}`}>
          <img src={userObj.avatar} alt="User" className="user-img" />
        </Link>
      </div>
      <div className="user-name">{userObj.name}</div>
      <div className="user-list-info-div">
        <div className="user-list-location">
          {userObj.city}, {userObj.state}
        </div>
        <div className="user-amount">
          Shoes in Collection: {collectionAmount.length}
        </div>
      </div>
    </div>
  )
}

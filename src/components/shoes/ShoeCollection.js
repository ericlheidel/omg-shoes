import { useEffect, useState } from "react"
import {
  deleteUserShoeFromCollection,
  getUserShoeCollectionByUserId,
} from "../../services/userShoeService.js"
import { Link } from "react-router-dom"

export const ShoeCollection = ({ userId }) => {
  const [collection, setCollection] = useState([])

  useEffect(() => {
    getUserShoeCollectionByUserId(userId).then((collectionArray) =>
      setCollection(collectionArray)
    )
  }, [userId])

  const handleRemoveShoe = () => {
    deleteUserShoeFromCollection()
  }

  let count = 1
  return (
    <div className="collection">
      {collection.map((userShoe) => {
        return (
          <div className="collection-shoe" value={userShoe.id} key={count++}>
            <div img>
              <img
                src={userShoe.shoe?.image}
                alt="detailed view of shoe"
                className="shoe-img"
              />
            </div>
            <Link to={`/collection/user/${userId}/shoe/${userShoe.shoe.id}`}>
              <div className="collection-shoe-name">{userShoe.shoe.name}</div>
            </Link>
            <button onClick={handleRemoveShoe}>Remove Shoe</button>
          </div>
        )
      })}
    </div>
  )
}

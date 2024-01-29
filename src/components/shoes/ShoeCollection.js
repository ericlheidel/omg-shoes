// import { useEffect, useState } from "react"
import { deleteUserShoeFromCollection } from "../../services/userShoeService.js"
import { Link /* useParams */ } from "react-router-dom"

export const ShoeCollection = ({
  userId,
  currentUser,
  filteredShoes,
  getAndSetCollectionByUserId,
}) => {
  // const [collection, setCollection] = useState([])

  // const { shoeId } = useParams()
  // const { userShoeId } = useParams()

  // useEffect(() => {
  //   getAndSetCollectionByUserId(userId)
  // }, [userId])

  // const getAndSetCollectionByUserId = () => {
  //   getUserShoeCollectionByUserId(userId).then((collectionArray) =>
  //     setCollection(collectionArray)
  //   )
  // }

  let count = 1
  return (
    <div className="collection">
      {filteredShoes.map((userShoe) => {
        return (
          <div className="shoe" value={userShoe.id} key={count++}>
            <Link to={`/usershoe/${userShoe.id}`}>
              <div>
                <img
                  src={userShoe.shoe.image}
                  alt="detailed view of shoe"
                  className="shoe-img"
                />
              </div>
            </Link>
            <div className="collection-shoe-name">{userShoe.shoe.name}</div>
            <div className="user-shoe-info">
              <div className="user-shoe-size">{userShoe.shoeSize}</div>
              <div className="user-shoe-condition">
                {userShoe.condition.condition}
              </div>
              <div className="user-shoe-description">
                {userShoe.description}
              </div>
            </div>
            {currentUser.id === parseInt(userId) && (
              <button
                onClick={(e) => {
                  deleteUserShoeFromCollection(userShoe.id).then(
                    getAndSetCollectionByUserId
                  )
                }}
              >
                Remove Shoe
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

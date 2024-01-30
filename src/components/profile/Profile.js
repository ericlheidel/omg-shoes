import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getUserById } from "../../services/usersService.js"
import { ShoeCollection } from "../shoes/ShoeCollection.js"
import { Link } from "react-router-dom"
import { getUserShoeCollectionByUserId } from "../../services/userShoeService.js"

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState([])
  const [collection, setCollection] = useState([])
  const [filteredShoes, setFilteredShoes] = useState([])
  const [chosenShoeValue, setChosenShoeValue] = useState(0)

  const { userId } = useParams()

  useEffect(() => {
    if (userId) {
      getUserById(userId).then((data) => {
        const userObj = data
        setUser(userObj)
      })
    }
  }, [userId])

  useEffect(() => {
    getAndSetCollectionByUserId(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const getAndSetCollectionByUserId = () => {
    getUserShoeCollectionByUserId(userId).then((collectionArray) =>
      setCollection(collectionArray)
    )
  }

  useEffect(() => {
    if (chosenShoeValue !== 0) {
      const matchingShoes = collection.filter(
        (userShoe) => userShoe.shoe.id === parseInt(chosenShoeValue)
      )
      setFilteredShoes(matchingShoes)
    } else {
      setFilteredShoes(collection)
    }
  }, [chosenShoeValue, collection])

  const reduceCollection = (inputArray) => {
    const uniqueMap = new Map()
    //:
    //: Use Array.reduce to iterate over the inputArray
    //:
    const resultArray = inputArray.reduce((acc, currentItem) => {
      const shoeId = currentItem.shoeId
      //:
      //: Check if the shoeId already exists in the uniqueMap
      //:
      if (!uniqueMap.has(shoeId)) {
        //:
        //: If not, add it to the uniqueMap and push the currentItem to the resultArray
        //:
        uniqueMap.set(shoeId, true)
        acc.push(currentItem)
      }

      return acc
    }, [])

    return resultArray
  }

  const reducedCollectionArray = reduceCollection(collection)
  // const sortedReducedCollectionArray = reducedCollectionArray.sort(
  //   (a, b) => parseInt(a.shoeId) - parseInt(b.shoeId)
  // )

  return (
    <div className="profile">
      <div className="avatar-div">
        <img src={user.avatar} alt="User Avatar" />
      </div>
      <div className="name-div">
        {user.firstName} {user.lastName}
      </div>
      <div className="bio-div">
        {user.bio} {user.hasEmoji && "👟"}
      </div>
      <div className="location-div">
        {user.city}, {user.state}
      </div>
      <div className="edit-btn">
        {user.id === currentUser.id && (
          <Link to={`/users/${userId}/edit`}>
            <button>Edit Profile</button>
          </Link>
        )}
        <div className="dropdown-div">
          <select
            className="dropdown"
            onChange={(e) => {
              setChosenShoeValue(parseInt(e.target.value))
            }}
          >
            <option value={0} key={0}>
              All Shoes
            </option>
            {reducedCollectionArray.map((userShoe) => {
              return (
                <option value={userShoe.shoe.id} key={userShoe.shoe.id}>
                  {userShoe.shoe.name}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <div className="collection-div">
        <ShoeCollection
          userId={userId}
          currentUser={currentUser}
          filteredShoes={filteredShoes}
          getAndSetCollectionByUserId={getAndSetCollectionByUserId}
        />
      </div>
    </div>
  )
}

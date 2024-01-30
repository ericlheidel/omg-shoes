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

  // useEffect(() => {
  //   getUserShoeCollectionByUserId(userId).then((userShoeArray) => {
  //     setUserShoes(userShoeArray)
  //   })
  // }, [userId])

  // useEffect(() => {
  //   const sortedFilteredShoes = filteredShoes.sort(function (a, b) {
  //     return a.shoe.name - b.shoe.name
  //   })
  //   console.log(sortedFilteredShoes)
  // }, [filteredShoes])

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
            {collection.map((userShoe) => {
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

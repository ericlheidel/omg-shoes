import "./Profile.css"
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
  //!!!!!!!!!!!!LEARN THIS .reduce()!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const reduceCollection = (inputArray) => {
    const uniqueMap = new Map()
    //gg
    //gg Use .reduce() to iterate over the inputArray
    //gg
    const resultArray = inputArray.reduce((accumulator, currentItem) => {
      const shoeId = currentItem.shoeId
      //gg
      //gg Check if the shoeId already exists in the uniqueMap
      //gg
      if (!uniqueMap.has(shoeId)) {
        //gg
        //gg If not, add it to the uniqueMap and push the currentItem to the resultArray
        //gg
        uniqueMap.set(shoeId, true)
        accumulator.push(currentItem)
      }

      return accumulator
    }, [])

    resultArray.sort((a, b) => a.shoe.name.localeCompare(b.shoe.name))

    return resultArray
  }
  //!!!!!!!!!!!!LEARN THIS .reduce()!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const reducedCollectionArray = reduceCollection(collection)

  return (
    <div className="profile">
      <div className="profile-div">
        <div className="profile-img-div">
          <img src={user.avatar} alt="User Avatar" className="profile-img" />
        </div>
        <div className="user-name">{user.name}</div>
        <div className="user-info-div">
          <div className="user-bio">{user.bio}</div>
        </div>
        <div className="user-info-div">
          <div className="user-location">
            {user.city}, {user.state}
          </div>
        </div>
        <div className="user-info-div">
          <div className="user-collection-amount">
            Shoes in Collection: {reducedCollectionArray.length}
          </div>
        </div>
        <div className="edit-btn-div">
          {user.id === currentUser.id && (
            <Link to={`/users/${userId}/edit`}>
              <button className="btn-edit btn-submit">Edit Profile</button>
            </Link>
          )}
        </div>
        <div className="dropdown-div">
          <select
            className="form-select profile-dropdown"
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

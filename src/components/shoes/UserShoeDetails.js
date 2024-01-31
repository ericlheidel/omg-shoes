import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getUserShoeById } from "../../services/userShoeService.js"

export const UserShoeDetails = () => {
  const [userShoe, setUserShoe] = useState([])
  // const [allUserShoes, setAllUserShoes] = useState([])

  const { userShoeId } = useParams()

  useEffect(() => {
    getUserShoeById(userShoeId).then((data) => {
      setUserShoe(data[0])
    })
  }, [userShoeId])

  let count = 1
  return (
    <>
      <div className="user-shoe-container">
        <div className="user-shoe" key={count++}>
          <div className="user-shoe-img">
            <img
              src={userShoe.shoe?.image}
              alt="detailed view of shoe"
              className="shoe-img"
            />
          </div>
          <div className="user-shoe-details">
            <div className="user-shoe-name">{userShoe.shoe?.name}</div>
            <div className="user-shoe-size">{userShoe?.shoeSize}</div>
            <div className="user-shoe-condition">
              {userShoe.condition?.condition}
            </div>
            <div user-shoe-description>{userShoe?.description}</div>
          </div>
        </div>
      </div>
    </>
  )
}

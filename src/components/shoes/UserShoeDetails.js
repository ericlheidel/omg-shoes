import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getShoeById } from "../../services/shoesService.js"
import { getAllUserShoes } from "../../services/userShoeService.js"

export const UserShoeDetails = ({ currentUser }) => {
  const [shoe, setShoe] = useState([])
  const [allUserShoes, setAllUserShoes] = useState([])

  const { shoeId } = useParams()

  useEffect(() => {
    getShoeById(shoeId).then((shoeObj) => {
      setShoe(shoeObj)
    })
  }, [shoeId])

  useEffect(() => {
    getAllUserShoes().then((userShoesArray) => {
      setAllUserShoes(userShoesArray)
    })
  }, [])
  let count = 1
  return (
    <>
      <div className="user-shoe-container">
        {allUserShoes
          .filter(
            (userShoeObj) =>
              currentUser.id === userShoeObj.userId &&
              shoe.id === userShoeObj.shoeId
          )
          .map((userShoeMatch) => {
            return (
              <div className="user-shoe" key={count++}>
                <div className="user-shoe-img">
                  <img
                    src={userShoeMatch.shoe.image}
                    alt="detailed view of shoe"
                    className="shoe-img"
                  />
                </div>
                <div className="user-shoe-details">
                  <div className="user-shoe-name">
                    {userShoeMatch.shoe.name}
                  </div>
                  <div className="user-shoe-size">{userShoeMatch.shoeSize}</div>
                  <div className="user-shoe-condition">
                    {userShoeMatch.condition.condition}
                  </div>
                  <div user-shoe-description>{userShoeMatch.description}</div>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}

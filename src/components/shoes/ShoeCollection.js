// import { useEffect, useState } from "react"
import { deleteUserShoeFromCollection } from "../../services/userShoeService.js"
import { Link /* useParams */ } from "react-router-dom"

export const ShoeCollection = ({
  userId,
  currentUser,
  filteredShoes,
  getAndSetCollectionByUserId,
}) => {
  let count = 1
  return (
    <div className="shoe-collection">
      {filteredShoes.map((userShoe) => {
        return (
          <div className="user-shoe" value={userShoe.id} key={count++}>
            {/* <Link to={`/usershoe/${userShoe.id}`}> */}
            <div className="user-shoe-img-div">
              <img
                src={userShoe.shoe.image}
                alt="detailed view of shoe"
                className="user-shoe-img"
              />
            </div>
            {/* </Link> */}
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
              <>
                <div className="btn-div">
                  <button
                    className="btn-remove"
                    onClick={(e) => {
                      deleteUserShoeFromCollection(userShoe.id).then(
                        getAndSetCollectionByUserId
                      )
                    }}
                  >
                    Remove Shoe
                  </button>
                  <button className="btn-edit-shoe">Edit Shoe</button>
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

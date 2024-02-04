import "./ShoeDetails.css"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import {
  deleteUserShoeFromCollection,
  editUserShoe,
  getUserShoeById,
} from "../../services/userShoeService.js"
import { getAllConditions } from "../../services/conditionsService.js"

export const UserShoeDetails = ({ currentUser }) => {
  const [userShoe, setUserShoe] = useState([])
  // const [user, setUser] = useState([])
  const [conditions, setConditions] = useState([])
  const [editedCondition, setEditedCondition] = useState(0)
  const [editedDescription, setEditedDescription] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  // const [allUserShoes, setAllUserShoes] = useState([])

  const { userShoeId } = useParams()

  const navigate = useNavigate()

  const getAndSetShoe = () => {
    getUserShoeById(userShoeId).then((data) => {
      setUserShoe(data[0])
    })
  }

  useEffect(() => {
    getUserShoeById(userShoeId).then((data) => {
      setUserShoe(data[0])
    })
  }, [userShoeId])

  // useEffect(() => {
  //   getUserById(currentUser.id).then((userObj) => {
  //     setUser(userObj)
  //   })
  // }, [currentUser])

  useEffect(() => {
    getAllConditions().then((conditionsArray) => {
      setConditions(conditionsArray)
    })
  }, [])

  useEffect(() => {
    setEditedCondition(userShoe.conditionId)
  }, [userShoe])

  useEffect(() => {
    setEditedDescription(userShoe.description)
  }, [userShoe])

  const handleSave = (e) => {
    e.preventDefault()

    const editedUserShoe = {
      id: userShoe.id,
      userId: currentUser.id,
      shoeId: userShoe.shoeId,
      shoeSize: userShoe.shoeSize,
      conditionId: editedCondition,
      description: editedDescription,
    }

    // editUserShoe(editedUserShoe).then(() => {
    //   navigate(`/users/${currentUser.id}`)
    // })

    editUserShoe(editedUserShoe).then(() => {
      getAndSetShoe()
      setIsHidden(false)
    })
  }

  let count = 1
  return (
    <>
      {currentUser.id === userShoe.userId ? (
        <div className="shoe-details-container">
          <div className="shoe-details-div">
            <div className="shoe-details">
              <img
                src={userShoe.shoe?.image}
                alt="detailed view of shoe class"
                className="shoe-details-img"
              />
              <div className="shoe-detail-one">{userShoe.shoe?.name}</div>
              <div className="shoe-detail-two">{userShoe.shoe?.year}</div>
              <div className="shoe-detail-two">
                {userShoe.shoe?.modelNumber}
              </div>
              <div className="shoe-detail-two">{userShoe.shoe?.colorway}</div>
              <div className="shoe-detail-two" hidden={isHidden}>
                <div className="color-one">
                  <div className="shoe-detail-two">Condition:</div>
                  {userShoe.condition?.condition}
                </div>
              </div>
              <div className="shoe-detail-two" hidden={isHidden}>
                <div className="color-one">
                  <div className="shoe-detail-two">Description:</div>
                  {userShoe?.description}
                </div>
              </div>
              <button
                className="form-btn btn-toggle"
                hidden={isHidden}
                onClick={(e) => {
                  setIsChecked(true)
                  setIsHidden(true)
                }}
              >
                Edit Shoe
              </button>
              <button
                className="form-btn btn-toggle"
                hidden={!isHidden}
                onClick={(e) => {
                  setIsChecked(false)
                  setIsHidden(false)
                }}
              >
                Don't Edit
              </button>
              <button
                className="form-btn btn-toggle"
                hidden={!isHidden}
                onClick={() => {
                  deleteUserShoeFromCollection(userShoe.id).then(() =>
                    navigate(`/users/${currentUser.id}`)
                  )
                }}
              >
                Remove Shoe
              </button>
              <div className="edit-shoe-div" hidden={!isHidden}>
                <form className="edit-shoe-form">
                  <fieldset>
                    <label className="edit-label-one">
                      Edit Condition
                      <br />
                      <select
                        value={editedCondition}
                        name="condition"
                        required
                        hidden={!isChecked}
                        className="form-select edit-select"
                        onChange={(e) =>
                          setEditedCondition(parseInt(e.target.value))
                        }
                      >
                        {conditions.map((condition) => {
                          return (
                            <option value={condition.id} key={condition.id}>
                              {condition.condition}
                            </option>
                          )
                        })}
                      </select>
                    </label>
                  </fieldset>
                  <fieldset>
                    <label className="edit-label-two">
                      Edit Description:
                      <textarea
                        value={editedDescription}
                        name="description"
                        required
                        className="form-textarea edit-textarea"
                        onChange={(e) => setEditedDescription(e.target.value)}
                      ></textarea>
                    </label>
                  </fieldset>
                  <fieldset>
                    <div className="save-btn-div">
                      <button
                        type="submit"
                        className="save-btn form-btn"
                        onClick={handleSave}
                      >
                        Save Shoe
                      </button>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="shoe-details-container">
          <div className="shoe-details-div" key={count++}>
            <div className="shoe-details">
              <img
                src={userShoe.shoe?.image}
                alt="detailed view of shoe"
                className="shoe-details-img"
              />
              <div className="shoe-detail-one">{userShoe.shoe?.name}</div>
              <div className="shoe-detail-two">Size: {userShoe?.shoeSize}</div>
              <div className="shoe-detail-two">
                Condition: {userShoe.condition?.condition}
              </div>
              <div className="shoe-detail-two">
                Description: {userShoe?.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

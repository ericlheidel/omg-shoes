import "./ShoeDetails.css"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { getShoeById } from "../../services/shoesService.js"
import { getAllConditions } from "../../services/conditionsService.js"
import { sizes } from "../../utility.js"
import { addShoeToUserCollection } from "../../services/userShoeService.js"
import { isDisabled } from "@testing-library/user-event/dist/utils/index.js"

export const ShoeDetailsForm = ({ currentUser }) => {
  const [shoe, setShoe] = useState([])
  const [conditions, setAllConditions] = useState([])
  const [chosenCondition, setChosenCondition] = useState(0)
  const [chosenSize, setChosenSize] = useState("0")
  const [userShoeDescription, setUserShoeDescription] = useState("")

  const [isDisabled, setIsDisabled] = useState(true)

  const { shoeId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    getShoeById(shoeId).then((shoe) => {
      const shoeObj = shoe
      setShoe(shoeObj)
    })
  }, [shoeId])

  useEffect(() => {
    getAllConditions().then((conditionsArray) => {
      setAllConditions(conditionsArray)
    })
  }, [])

  const handleAddShoeToUserCollection = (e) => {
    e.preventDefault()

    const newShoe = {
      userId: currentUser.id,
      shoeId: parseInt(shoeId),
      shoeSize: chosenSize,
      conditionId: parseInt(chosenCondition),
      description: userShoeDescription,
    }

    addShoeToUserCollection(newShoe).then(() => {
      navigate(`/users/${currentUser.id}`)
    })
  }

  useEffect(() => {
    if (chosenCondition !== 0 && chosenSize !== "0") {
      setIsDisabled(false)
    }
  }, [chosenCondition, chosenSize])

  return (
    <div className="shoe-details-container">
      <div className="shoe-details-div">
        <div className="shoe-details">
          <img
            src={shoe.image}
            alt="shoe shown in detail"
            className="shoe-details-img"
          />
          <div className="shoe-detail-one">{shoe.name}</div>
          <div className="shoe-detail-two">Style: {shoe.style}</div>
          <div className="shoe-detail-two">{shoe.year}</div>
          <div className="shoe-detail-two">{shoe.modelNumber}</div>
          <div className="shoe-detail-two">{shoe.colorway}</div>
        </div>
        <form className="form" /* onSubmit={handleAddShoeToUserCollection} */>
          <fieldset>
            <div className="form-group">
              <select
                className="condition-dropdown form-select"
                required
                onChange={(e) => setChosenCondition(e.target.value)}
              >
                <option value={0} key={0}>
                  Select a condition
                </option>
                {conditions.map((condition) => {
                  return (
                    <option value={condition.id} key={condition.id}>
                      {condition.condition}
                    </option>
                  )
                })}
              </select>
            </div>
          </fieldset>
          <div>
            <fieldset>
              <select
                className="size-dropdown form-select"
                required
                onChange={(e) => setChosenSize(e.target.value)}
              >
                <option value={0} key={0}>
                  Select a Size...
                </option>
                {sizes.map((size) => {
                  return (
                    <option value={size.size} key={size.id}>
                      {size.size}
                    </option>
                  )
                })}
              </select>
            </fieldset>
            <fieldset>
              <div className="flex row">
                <div className="shoe-description">
                  <textarea
                    type="text"
                    className="form-textarea"
                    required
                    value={userShoeDescription}
                    placeholder="Write a short description of the condition of
                  your shoe..."
                    onChange={(e) => setUserShoeDescription(e.target.value)}
                  ></textarea>
                </div>
                <div
                  className="hidden-div"
                  onClick={() => setUserShoeDescription("Great Condition!")}
                ></div>
              </div>
            </fieldset>
            <fieldset>
              <div className="add-btn-div">
                <button
                  type="submit"
                  className="add-btn form-btn"
                  disabled={isDisabled}
                  onClick={handleAddShoeToUserCollection}
                >
                  Add Shoe to Collection
                </button>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </div>
  )
}

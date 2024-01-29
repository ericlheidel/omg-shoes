import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { getShoeById } from "../../services/shoesService.js"
import { getAllConditions } from "../../services/conditionsService.js"
import { sizes } from "../../utility.js"
import { addShoeToUserCollection } from "../../services/userShoeService.js"

export const ShoeDetailsForm = ({ currentUser }) => {
  const [shoe, setShoe] = useState([])
  const [conditions, setAllConditions] = useState([])
  const [chosenCondition, setChosenCondition] = useState("")
  const [chosenSize, setChosenSize] = useState("")
  const [userShoeDescription, setUserShoeDescription] = useState("")

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
      navigate(`/shoes`)
    })
  }

  useEffect(() => {}, [])

  return (
    <div className="shoe-details-container">
      <div className="shoe-details-img">
        <img src={shoe.image} alt="shoe shown in detail" className="shoe-img" />
        <div className="shoe-details">
          <div className="shoe-details-name">{shoe.name}</div>
          <div className="shoe-details-year">{shoe.year}</div>
          <div className="shoe-details-model-number">{shoe.modelNumber}</div>
          <div className="shoe-details-colorway">{shoe.colorway}</div>
        </div>
        <div className="add-shoe-form">
          <form onSubmit={handleAddShoeToUserCollection}>
            <fieldset>
              <select
                className="condition-dropdown"
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
            </fieldset>
            <div>
              <fieldset>
                <select
                  className="size-dropdown"
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
                <div className="shoe-description">
                  <input
                    type="text"
                    required
                    value={userShoeDescription}
                    placeholder="Write a short description of the condition of your shoe..."
                    onChange={(e) => setUserShoeDescription(e.target.value)}
                  />
                </div>
              </fieldset>
              <fieldset>
                <div className="add-btn">
                  <button type="submit">Add Shoe to Collection</button>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

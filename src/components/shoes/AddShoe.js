import "./AddShoe.css"
import { getCurrentYear } from "../../utility.js"
import { useState } from "react"
import { createShoe } from "../../services/shoesService.js"
import { useNavigate } from "react-router-dom"

export const AddShoe = () => {
  const [name, setName] = useState("")
  const [style, setStyle] = useState("")
  const [year, setYear] = useState(0)
  const [modelNumber, setModelNumber] = useState("")
  const [colorway, setColorway] = useState("")
  const [image, setImage] = useState("")

  const navigate = useNavigate()

  const addNewShoe = (e) => {
    e.preventDefault()

    const newShoe = {
      name,
      style,
      year,
      modelNumber,
      colorway,
      image,
    }
    createShoe(newShoe).then((res) => {
      navigate(`/shoes/${res.id}`)
    })
  }

  const fillOutForm = () => {
    setName("Mosquito")
    setStyle("Low")
    setYear("2008")
    setModelNumber("313170-761")
    setColorway("vanilla/vermilion red-black frost")
    setImage("/shoes/mosquito.jpg")
  }

  return (
    <div className="add-shoe">
      <form className="add-shoe-form color-four">
        <h2 onClick={fillOutForm}>Add a Shoe to the Database</h2>
        <div className="form-group">
          <fieldset>
            <label>
              Shoe Name:
              <input
                type="text"
                name="name"
                spellCheck={false}
                value={name}
                required
                autoFocus
                className="form-control"
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              Style:
              <select
                name="style"
                value={style}
                required
                autoFocus
                className="form-control"
                onChange={(e) => {
                  setStyle(e.target.value)
                }}
              >
                <option value={0} key={0}>
                  Style Type...
                </option>
                <option value={"Low"} key={1}>
                  Low
                </option>
                <option value={"High"} key={2}>
                  High
                </option>
              </select>
            </label>
          </fieldset>
          <fieldset>
            <label>
              Year:
              <input
                type="number"
                name="year"
                min="2002"
                max={getCurrentYear()}
                value={parseInt(year)}
                required
                autoFocus
                // placeholder=""
                className="form-control"
                onChange={(e) => {
                  setYear(e.target.value)
                }}
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              Model Number:
              <input
                type="text"
                name="modelNumber"
                spellCheck={false}
                value={modelNumber}
                required
                autoFocus
                className="form-control"
                onChange={(e) => {
                  setModelNumber(e.target.value)
                }}
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              Colorway:
              <input
                type="text"
                name="colorway"
                spellCheck={false}
                value={colorway}
                required
                autoFocus
                className="form-control colorway"
                onChange={(e) => {
                  setColorway(e.target.value.toUpperCase())
                }}
              />
            </label>
          </fieldset>
          <fieldset>
            <label>
              Image:
              <input
                type="text"
                name="image"
                spellCheck={false}
                value={image}
                required
                autoFocus
                className="form-control"
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button
                type="submit"
                className="btn-submit add-shoe-btn"
                onClick={addNewShoe}
              >
                Add Shoe
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  )
}

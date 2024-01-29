import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllShoes } from "../../services/shoesService.js"

export const Shoe = ({ shoeObj }) => {
  const [allShoes, setAllShoes] = useState([])

  useEffect(() => {
    getAllShoes().then((shoesArray) => {
      setAllShoes(shoesArray)
    })
  }, [])

  return (
    <div className="shoe">
      <Link to={`/shoes/shoedetails/${shoeObj.id}`}>
        <div className="shoe-img-div">
          <img
            src={shoeObj.image}
            alt="shoe shown in detail"
            className="shoe-img"
          />
        </div>
      </Link>
    </div>
  )
}

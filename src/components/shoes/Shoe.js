import "./Shoes.css"
import { Link } from "react-router-dom"
// import { getAllShoes } from "../../services/shoesService.js"

export const Shoe = ({ shoeObj }) => {
  return (
    <div className="shoe">
      <Link to={`/shoes/${shoeObj.id}`}>
        <div className="shoe-img-div">
          <img
            src={shoeObj.image}
            alt="shoe shown in detail"
            className="shoe-img"
          />
        </div>
        <div className="shoe-name">{shoeObj.name}</div>
      </Link>
    </div>
  )
}

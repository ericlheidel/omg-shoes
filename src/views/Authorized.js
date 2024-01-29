import { Navigate, useLocation } from "react-router"

export const Authorized = ({ children }) => {
  let location = useLocation()
  if (localStorage.getItem("shoes_user")) {
    return children
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />
  }
}

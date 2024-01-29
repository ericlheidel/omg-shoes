import "./App.css"
import { Route, Routes } from "react-router"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import { Authorized } from "./views/Authorized.js"
import { ApplicationViews } from "./views/ApplicationViews.js"
// import { useEffect, useState } from "react"
// import { getUserById } from "./services/usersService.js"

function App() {
  // const [loggedInUser, setLoggedInUser] = useState([])

  // useEffect(() => {
  //   const user = localStorage.getItem("shoes_user")
  //   if (user) {
  //     getUserById(JSON.parse(user).id).then(setLoggedInUser)
  //   } else {
  //     setLoggedInUser(null)
  //   }
  // }, [])

  // if (loggedInUser === undefined) {
  //   return ""
  // }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews /* loggedInUser={loggedInUser} */ />
          </Authorized>
        }
      />
    </Routes>
  )
}

export default App

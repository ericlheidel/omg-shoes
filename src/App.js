import "./App.css"
import { Route, Routes } from "react-router"
import { Login } from "./components/auth/Login.js"
import { Register } from "./components/auth/Register.js"
import { Authorized } from "./views/Authorized.js"
import { ApplicationViews } from "./views/ApplicationViews.js"

function App() {
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

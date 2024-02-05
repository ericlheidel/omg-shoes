import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router"
import { Welcome } from "../welcome/Welcome.js"
import { NavBar } from "../components/nav/NavBar.js"
import { Profile } from "../components/profile/Profile.js"
import { AllShoesList } from "../components/shoes/AllShoesList.js"
import { ShoeDetailsForm } from "../components/shoes/ShoeDetailsForm.js"
import { ProfileForm } from "../components/profile/ProfileForm.js"
import { UsersList } from "../components/users/UsersList.js"
import { UserShoeDetails } from "../components/shoes/UserShoeDetails.js"
import { AddShoe } from "../components/shoes/AddShoe.js"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localShoesUser = localStorage.getItem("shoes_user")
    const shoesUserObj = JSON.parse(localShoesUser)

    setCurrentUser(shoesUserObj)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome currentUser={currentUser} />} />
        <Route path="users">
          <Route index element={<UsersList currentUser={currentUser} />} />
          <Route
            path=":userId"
            element={<Profile currentUser={currentUser} />}
          />
          <Route
            path=":userId/edit"
            element={<ProfileForm currentUser={currentUser} />}
          />
        </Route>
        <Route path="shoes">
          <Route index element={<AllShoesList />} />
          <Route
            path=":shoeId"
            element={<ShoeDetailsForm currentUser={currentUser} />}
          />
        </Route>
        <Route path="usershoe">
          <Route
            path=":userShoeId"
            element={<UserShoeDetails currentUser={currentUser} />}
          />
        </Route>
        {currentUser.isAdmin && (
          <Route
            path="addshoe"
            element={<AddShoe currentUser={currentUser} />}
          ></Route>
        )}
      </Route>
    </Routes>
  )
}

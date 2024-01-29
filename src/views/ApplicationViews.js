import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router"
import { Welcome } from "../welcome/Welcome.js"
import { NavBar } from "../components/nav/NavBar.js"
import { Profile } from "../components/profile/Profile.js"
import { AllShoesList } from "../components/shoes/AllShoesList.js"
import { ShoeDetailsForm } from "../components/shoes/ShoeDetails.js"
import { UserShoeDetails } from "../components/shoes/UserShoeDetails.js"
import { ProfileForm } from "../components/profile/ProfileForm.js"

export const ApplicationViews = ({ loggedInUser }) => {
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
        <Route
          path="profile/:userId"
          element={<Profile currentUser={currentUser} />}
        />
        <Route
          path="profile/:userId/edit"
          element={<ProfileForm currentUser={currentUser} />}
        />
        <Route path="shoes">
          <Route index element={<AllShoesList />} />
          <Route
            path="shoedetails/:shoeId"
            element={<ShoeDetailsForm currentUser={currentUser} />}
          />
        </Route>
        <Route path="collection">
          <Route
            path="user/:userId/shoe/:shoeId"
            element={<UserShoeDetails currentUser={currentUser} />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

import { useNavigate, useParams } from "react-router-dom"
import { states } from "../../utility.js"
import { useEffect, useState } from "react"
import { getUserById, updateUserProfile } from "../../services/usersService.js"

export const ProfileForm = ({ currentUser }) => {
  const [user, setUser] = useState([])
  const [hasEmoji, setHasEmoji] = useState("")

  const { userId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    getUserById(userId).then((data) => {
      const userObj = data
      setUser(userObj)
    })
  }, [userId])

  const handleInputChange = (e) => {
    const userCopy = { ...user }
    userCopy[e.target.name] = e.target.value
    setUser(userCopy)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const editedUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      state: user.state,
      avatar: user.avatar,
      bio: user.bio,
      hasEmoji: hasEmoji,
    }

    updateUserProfile(editedUser).then(() => {
      navigate(`/users/${currentUser.id}`)
    })
  }

  return (
    <div className="profile-edit">
      <form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <fieldset>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              value={user?.firstName ? user?.firstName : ""}
              required
              autoFocus
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              value={user?.lastName ? user?.lastName : ""}
              required
              autoFocus
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              type="text"
              name="city"
              value={user?.city ? user?.city : ""}
              required
              autoFocus
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <select
              name="state"
              value={user?.state ? user?.state : ""}
              required
              autoFocus
              className="form-control"
              onChange={handleInputChange}
            >
              <option value={0} key={0}>
                Select a state...
              </option>
              {states.map((state) => {
                return (
                  <option value={state.state} key={state.id}>
                    {state.state}
                  </option>
                )
              })}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              type="text"
              name="avatar"
              value={user?.avatar ? user.avatar : ""}
              required
              autoFocus
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              type="text"
              name="email"
              value={user?.email ? user?.email : ""}
              required
              autoFocus
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              type="text"
              name="bio"
              value={user?.bio ? user?.bio : ""}
              required
              autoFocus
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>
              <input
                type="radio"
                name="hasEmoji"
                value={hasEmoji}
                // checked={user?.hasEmoji}
                className="form-control"
                onChange={(e) => {
                  setHasEmoji(JSON.parse(true))
                }}
              />
              👟
            </label>
            <label>
              <input
                type="radio"
                name="hasEmoji"
                value={hasEmoji}
                // checked={!user?.hasEmoji}
                className="form-control"
                onChange={(e) => {
                  setHasEmoji(JSON.parse(false))
                }}
              />
              🚫
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button type="submit">Save Profile</button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

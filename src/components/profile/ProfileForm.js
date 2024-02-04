import "./ProfileForm.css"
import { useNavigate, useParams } from "react-router-dom"
import { states } from "../../utility.js"
import { useEffect, useState } from "react"
import { getUserById, updateUserProfile } from "../../services/usersService.js"

export const ProfileForm = ({ currentUser }) => {
  const [user, setUser] = useState([])
  const [hasEmoji, setHasEmoji] = useState(false)

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
      name: user.name,
      city: user.city,
      state: user.state,
      avatar: user.avatar,
      bio: user.bio,
      // hasEmoji: hasEmoji,
    }

    updateUserProfile(editedUser).then(() => {
      navigate(`/users/${currentUser.id}`)
    })
  }

  return (
    <div className="profile-edit">
      <form className="edit-profile-form color-four" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <fieldset>
          <div className="form-group">
            <label>
              Name:
              <input
                type="text"
                name="name"
                spellCheck={false}
                value={user?.name ? user?.name : ""}
                required
                autoFocus
                className="form-control"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </fieldset>
        <div className="location-div flex">
          <fieldset>
            <div className="form-group">
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  spellCheck={false}
                  value={user?.city ? user?.city : ""}
                  required
                  autoFocus
                  className="form-control city"
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label>
                State:
                <select
                  name="state"
                  spellCheck={false}
                  value={user?.state ? user?.state : ""}
                  required
                  autoFocus
                  className="form-control state-select state"
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
              </label>
            </div>
          </fieldset>
        </div>
        <fieldset>
          <div className="form-group">
            <label>
              Avatar Url:
              <input
                type="text"
                name="avatar"
                spellCheck={false}
                value={user?.avatar ? user.avatar : ""}
                required
                autoFocus
                className="form-control"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>
              Email:
              <input
                type="text"
                name="email"
                spellCheck={false}
                value={user?.email ? user?.email : ""}
                required
                autoFocus
                className="form-control"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label>
              Bio:
              <input
                type="text"
                name="bio"
                value={user?.bio ? user?.bio : ""}
                required
                autoFocus
                className="form-control"
                onChange={handleInputChange}
              />
            </label>
          </div>
        </fieldset>
        {/* <fieldset>
          <div className="form-group">
            <label>
              <input
                type="radio"
                name="hasEmoji"
                value={hasEmoji}
                checked={user?.hasEmoji}
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
        </fieldset> */}
        <fieldset>
          <div className="form-group">
            <button type="submit" className="btn-submit edit-profile-btn">
              Save Profile
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

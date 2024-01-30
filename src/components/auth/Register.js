import "./Register.css"
import { useState } from "react"
import { createUser, getUserByEmail } from "../../services/usersService.js"
import { states } from "../../utility.js"
import { useNavigate } from "react-router-dom"

export const Register = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [avatar, setAvatar] = useState("")
  const [bio, setBio] = useState("")
  const [hasEmoji, setHasEmoji] = useState(false)
  // const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const registerNewUser = () => {
    const user = {
      email,
      firstName,
      lastName,
      city,
      state,
      avatar,
      bio,
      hasEmoji,
      /* password, */
    }
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "shoes_user",
          JSON.stringify({
            id: createdUser.id,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
          })
        )

        navigate("/")
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getUserByEmail(email).then((res) => {
      if (res.length > 0) {
        window.alert(
          "This email is already associated with an OMG...Shoes account"
        )
      } else {
        registerNewUser()
      }
    })
  }

  return (
    <main>
      <div className="form-background">
        <form className="form-main" onSubmit={handleSubmit}>
          <h1>OMG...Shoes</h1>
          <h2>Please Register</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                id="firstName"
                value={firstName}
                placeholder="Enter your first name..."
                required
                autoFocus
                className="form-control"
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                id="lastName"
                value={lastName}
                placeholder="Enter your last name..."
                required
                autoFocus
                className="form-control"
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                id="city"
                value={city}
                placeholder="Enter your city..."
                required
                autoFocus
                className="form-control"
                onChange={(e) => {
                  setCity(e.target.value)
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <select
                id="state"
                value={state}
                required
                className="form-control state-dropdown"
                onChange={(e) => {
                  setState(e.target.value)
                }}
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
                type="url"
                id="avatar"
                value={avatar}
                placeholder="Enter an avatar url..."
                required
                autoFocus
                className="form-control"
                onChange={(e) => {
                  setAvatar(e.target.value)
                }}
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                id="email"
                value={email}
                placeholder="enter your email..."
                required
                autoFocus
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </fieldset>
          {/* <fieldset>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter a password"
              required
              autoFocus
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </fieldset> */}
          <fieldset>
            <div className="form-group">
              <input
                type="text"
                id="bio"
                value={bio}
                placeholder="Tell us about yourself..."
                required
                autoFocus
                className="form-control"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </fieldset>
          {/* <fieldset>
            <div className="form-group radio-group">
              <h4>Would you like to add shoe emoji to your profile?</h4>
              <label>
                <input
                  type="radio"
                  id="emoji"
                  name="emoji"
                  value={hasEmoji}
                  className="form-control"
                  onChange={(e) => {
                    setHasEmoji(true)
                  }}
                />
                👟
              </label>
              <label>
                <input
                  type="radio"
                  id="emoji"
                  name="emoji"
                  value={hasEmoji}
                  className="form-control"
                  onChange={(e) => {
                    setHasEmoji(false)
                  }}
                />
                🚫
              </label>
            </div>
          </fieldset> */}
          <fieldset>
            <div className="form-group">
              <button type="submit" className="btn-submit">
                Register
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  )
}

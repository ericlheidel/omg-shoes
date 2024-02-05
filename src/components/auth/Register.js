import "./LoginAndRegister.css"
import { useState } from "react"
import { createUser, getUserByEmail } from "../../services/usersService.js"
import { states } from "../../utility.js"
import { useNavigate } from "react-router-dom"

export const Register = ({ setLoggedInUser }) => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  // const [firstName, setFirstName] = useState("")
  // const [lastName, setLastName] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [avatar, setAvatar] = useState("")
  const [bio, setBio] = useState("")
  // const [hasEmoji, setHasEmoji] = useState(false)
  // const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const registerNewUser = () => {
    const user = {
      email,
      name,
      city,
      state,
      avatar,
      bio,
      isAdmin: false,
      // hasEmoji,
      /* password, */
    }
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "shoes_user",
          JSON.stringify({
            id: createdUser.id,
            isAdmin: createdUser.isAdmin,
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
      <div>
        <form className="register-form color-four" onSubmit={handleSubmit}>
          <div className="text-div">
            <h1>OMG...Shoes</h1>
            <h2>Please Register</h2>
          </div>
          <div className="name-div">
            <fieldset>
              <div className="form-group">
                <label>
                  Name:
                  <input
                    type="text"
                    id="name"
                    value={name}
                    placeholder="Enter your name..."
                    required
                    autoFocus
                    spellCheck={false}
                    className="form-control"
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </label>
              </div>
            </fieldset>
          </div>
          <div className="location-div flex">
            <fieldset>
              <div className="form-group">
                <label>
                  City:
                  <input
                    type="text"
                    id="city"
                    value={city}
                    placeholder="Enter your city..."
                    required
                    autoFocus
                    spellCheck={false}
                    className="form-control city"
                    onChange={(e) => {
                      setCity(e.target.value)
                    }}
                  />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <label>
                  State:
                  <select
                    id="state"
                    value={state}
                    required
                    spellCheck={false}
                    className="state-dropdown form-select state-two"
                    onChange={(e) => {
                      setState(e.target.value)
                    }}
                  >
                    <option value={0} key={0}></option>
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
                  id="avatar"
                  value={avatar}
                  placeholder="Enter an avatar url..."
                  required
                  autoFocus
                  spellCheck={false}
                  className="form-control"
                  onChange={(e) => {
                    setAvatar(e.target.value)
                  }}
                />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label>
                Email:
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Enter your email..."
                  required
                  autoFocus
                  spellCheck={false}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
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
              <label>
                Bio:
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
              </label>
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
              <button type="submit" className="btn-submit form-btn">
                Register
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  )
}

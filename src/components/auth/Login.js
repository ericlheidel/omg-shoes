import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/usersService.js"
import "./Login.css"

export const Login = () => {
  const [email, setEmail] = useState("charlie@kelly.com")
  // const [password, setPassword] = useState("password")

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getUserByEmail(email).then((foundUsers) => {
      if (
        foundUsers.length === 1 /*  && foundUsers[0].password === password */
      ) {
        const user = foundUsers[0]
        localStorage.setItem(
          "shoes_user",
          JSON.stringify({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            state: user.state,
            avatar: user.avatar,
            bio: user.bio,
            hasEmoji: user.hasEmoji,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid Login")
      }
    })
  }

  return (
    <main>
      <section>
        <form className="form-main" onSubmit={handleLogin}>
          <h1>OMG...Shoes</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                placeholder="Email address"
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
                value={password}
                placeholder="Password"
                required
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </fieldset> */}
          <fieldset>
            <div className="form-group">
              <button type="submit" className="btn-submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}

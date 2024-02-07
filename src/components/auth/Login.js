import "./LoginAndRegister.css"
import { Link, useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/usersService.js"
import { useState } from "react"

export const Login = () => {
  const [email, setEmail] = useState("")
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
            isAdmin: user.isAdmin,
            // firstName: user.firstName,
            // lastName: user.lastName,
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
        <form className="login-form color-four" onSubmit={handleLogin}>
          <div className="text-div">
            <h1>
              <span onClick={() => setEmail("charlie@kelly.com")}>OMG</span>...
              <span onClick={() => setEmail("the@waitress.com")}>Shoes</span>
            </h1>
            <h2>
              <span onClick={() => setEmail("dee@reynolds.com")}>Please</span>{" "}
              <span onClick={() => setEmail("dennis@reynolds.com")}>sign</span>{" "}
              <span onClick={() => setEmail("frank@reynolds.com")}>in</span>
            </h2>
          </div>
          <fieldset>
            <div className="form-group">
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  placeholder="Email address"
                  required
                  autoFocus
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
              <button type="submit" className="btn-submit form-btn btn-login">
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

export const getAllUsers = () => {
  return fetch(`http://localhost:9999/users`).then((res) => res.json())
}

export const createUser = (user) => {
  return fetch(`http://localhost:9999/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const getUserByEmail = (email) => {
  return fetch(`http://localhost:9999/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const getUserById = async (id) => {
  return await fetch(`http://localhost:9999/users/${id}`).then((res) =>
    res.json()
  )
}

export const updateUserProfile = (user) => {
  return fetch(`http://localhost:9999/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

export const getAllFriendships = () => {
  return fetch(`http://localhost:9999/friendships`).then((res) => res.json())
}

export const getFriendsByUserId = (userId) => {
  return fetch(`http://localhost:9999/friendships?userId=${userId}`).then(
    (res) => res.json()
  )
}

export const addFriendship = (friendship) => {
  return fetch(`http://localhost:9999/friendships`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(friendship),
  })
}

export const removeFriendshipById = (id) => {
  return fetch(`http://localhost:9999/friendships/${id}`, {
    method: "DELETE",
  })
}

export const removeFriendshipByUserId = (userId) => {
  return fetch(`http://localhost:9999/friendships?_userId=${userId}`, {
    method: "DELETE",
  })
}

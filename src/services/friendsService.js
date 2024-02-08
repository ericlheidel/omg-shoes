export const getAllFriendships = () => {
  return fetch(`http://localhost:9999/friendships`).then((res) => res.json())
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

export const removeFriendship = (id) => {
  return fetch(`http://http://localhost:9999/friendships/${id}`, {
    method: "DELETE",
  })
}

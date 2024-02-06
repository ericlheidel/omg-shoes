export const getAllLikes = () => {
  return fetch(`http://localhost:9999/likes`).then((res) => res.json())
}

export const postLike = (like) => {
  return fetch(`http://localhost:9999/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  }).then((res) => res.json())
}

export const removeLikeById = (id) => {
  return fetch(`http://localhost:9999/likes/${id}`, {
    method: "DELETE",
  })
}

export const getLikesByUserShoeId = (userShoeId) => {
  return fetch(`http://localhost:9999/likes?userShoeId=${userShoeId}`).then(
    (res) => res.json()
  )
}

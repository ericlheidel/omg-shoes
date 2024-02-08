export const getCommentsByUserShoeId = (userShoeId) => {
  return fetch(
    `http://localhost:9999/comments?userShoeId=${userShoeId}&_expand=user`
  ).then((res) => res.json())
}

export const addComment = (comment) => {
  return fetch(`http://localhost:9999/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
}

export const removeCommentById = (id) => {
  return fetch(`http://localhost:9999/comments/${id}`, {
    method: "DELETE",
  })
}

export const updateComment = (comment) => {
  return fetch(`http://localhost:9999/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
}

export const addShoeToUserCollection = (userShoe) => {
  return fetch(`http://localhost:9999/userShoe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userShoe),
  }).then((res) => res.json())
}

export const deleteUserShoeFromCollection = (userShoeId) => {
  return fetch(`http://localhost:9999/userShoe/${userShoeId}`, {
    method: "DELETE",
  })
}

export const getUserShoeCollectionByUserId = (userId) => {
  return fetch(
    `http://localhost:9999/userShoe?userId=${userId}&_expand=user&_expand=shoe&_expand=condition`
  ).then((res) => res.json())
}

export const getAllUserShoes = () => {
  return fetch(
    `http://localhost:9999/userShoe?_expand=user&_expand=shoe&_expand=condition`
  ).then((res) => res.json())
}

export const getUserShoeById = (userShoeId) => {
  return fetch(
    `http://localhost:9999/userShoe?id=${userShoeId}&_expand=user&_expand=shoe&_expand=condition`
  ).then((res) => res.json())
}

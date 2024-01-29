export const getAllShoes = () => {
  return fetch(`http://localhost:9999/shoes`).then((res) => res.json())
}

export const getShoeById = (id) => {
  return fetch(`http://localhost:9999/shoes/${id}`).then((res) => res.json())
}

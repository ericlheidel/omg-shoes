export const getAllConditions = () => {
  return fetch(`http://localhost:9999/conditions`).then((res) => res.json())
}

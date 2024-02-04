import "./AllShoesList.css"
import { useEffect, useState } from "react"
import { getAllShoes } from "../../services/shoesService.js"
import { ShoesFilterBar } from "./ShoesFilterBar.js"
import { Shoe } from "./Shoe.js"

export const AllShoesList = () => {
  const [allShoes, setAllShoes] = useState([])
  const [filteredShoes, setFilteredShoes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredYear, setFilteredYear] = useState("")
  const [sortedShoes, setSortedShoes] = useState([])

  const getAndSetAllShoes = () => {
    getAllShoes().then((shoesArray) => {
      setAllShoes(shoesArray)
    })
  }

  // ! INITIAL GET ALL SHOES

  useEffect(() => {
    getAndSetAllShoes()
  }, [])

  // ! SEARCH SHOES
  useEffect(() => {
    const matchingShoes = allShoes.filter((shoe) =>
      shoe.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredShoes(matchingShoes)
  }, [allShoes, searchTerm])

  // ! SHOW POSTS WITH SPECIFIC YEAR
  useEffect(() => {
    if (filteredYear !== "") {
      const matchingShoes = allShoes.filter(
        (shoe) => shoe.year === parseInt(filteredYear)
      )
      setFilteredShoes(matchingShoes)
    }
  }, [allShoes, filteredYear])

  // ! SHOW SHOES FROM EVERY YEAR
  useEffect(() => {
    if (filteredYear === "1" || filteredYear === "0") {
      setFilteredShoes(allShoes)
    }
  }, [allShoes, filteredYear])

  //mm Here I created a useEffect to sort filtered shoes
  // prettier-ignore
  useEffect(() => {

    //mm setter function
    setSortedShoes(

      //mm take [filteredShoes] and sort through it
      filteredShoes.sort(function (a, b) {

        //mm if years don't match, return "a" year first
        if (a.year !== b.year) {
          return a.year - b.year
        }
        
        //mm return the sorted array with an additional sort by name
        return a.name.localeCompare(b.name)
      })
    )
  }, [filteredShoes])

  return (
    <div className="shoes-container">
      <h2>All Shoes</h2>
      <ShoesFilterBar
        setFilteredYear={setFilteredYear}
        setSearchTerm={setSearchTerm}
      />
      <article className="shoes">
        {sortedShoes.map((shoeObj) => {
          return <Shoe shoeObj={shoeObj} key={shoeObj.id} />
        })}
      </article>
    </div>
  )
}

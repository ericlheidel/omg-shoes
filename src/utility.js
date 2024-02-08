export const getCurrentYear = () => {
  const getYear = new Date()
  const thisYear = getYear.getFullYear()
  return thisYear
}

export const getTodaysDateAndTime = () => {
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }
  const now = new Date().toLocaleString("en-US", options)
  return now
}

export const states = [
  { id: 1, state: "AL" },
  { id: 2, state: "AK" },
  { id: 3, state: "AZ" },
  { id: 4, state: "AR" },
  { id: 5, state: "CA" },
  { id: 6, state: "CO" },
  { id: 7, state: "CT" },
  { id: 8, state: "DE" },
  { id: 9, state: "FL" },
  { id: 10, state: "GA" },
  { id: 11, state: "HI" },
  { id: 12, state: "ID" },
  { id: 13, state: "IL" },
  { id: 14, state: "IN" },
  { id: 15, state: "IA" },
  { id: 16, state: "KS" },
  { id: 17, state: "KY" },
  { id: 18, state: "LA" },
  { id: 19, state: "ME" },
  { id: 20, state: "MD" },
  { id: 21, state: "MA" },
  { id: 22, state: "MI" },
  { id: 23, state: "MN" },
  { id: 24, state: "MS" },
  { id: 25, state: "MO" },
  { id: 26, state: "MT" },
  { id: 27, state: "NE" },
  { id: 28, state: "NV" },
  { id: 29, state: "NH" },
  { id: 30, state: "NJ" },
  { id: 31, state: "NM" },
  { id: 32, state: "NY" },
  { id: 33, state: "NC" },
  { id: 34, state: "ND" },
  { id: 35, state: "OH" },
  { id: 36, state: "OK" },
  { id: 37, state: "OR" },
  { id: 38, state: "PA" },
  { id: 39, state: "RI" },
  { id: 40, state: "SC" },
  { id: 41, state: "SD" },
  { id: 42, state: "TN" },
  { id: 43, state: "TX" },
  { id: 44, state: "UT" },
  { id: 45, state: "VT" },
  { id: 46, state: "VA" },
  { id: 47, state: "WA" },
  { id: 48, state: "WV" },
  { id: 49, state: "WI" },
  { id: 50, state: "WY" },
]

export const years = [
  { id: 1, year: 2002 },
  { id: 2, year: 2003 },
  { id: 3, year: 2004 },
  { id: 4, year: 2005 },
  { id: 5, year: 2006 },
  { id: 6, year: 2007 },
  { id: 7, year: 2008 },
  { id: 8, year: 2009 },
  { id: 9, year: 2010 },
]

export const sizes = [
  { id: 1, size: 5.5 },
  { id: 2, size: 6 },
  { id: 3, size: 6.5 },
  { id: 4, size: 7 },
  { id: 5, size: 7.5 },
  { id: 6, size: 8 },
  { id: 7, size: 8.5 },
  { id: 8, size: 9 },
  { id: 9, size: 9.5 },
  { id: 10, size: 10 },
  { id: 11, size: 10.5 },
  { id: 12, size: 11 },
  { id: 13, size: 11.5 },
  { id: 14, size: 12 },
  { id: 15, size: 12.5 },
  { id: 16, size: 13 },
  { id: 17, size: 14 },
]

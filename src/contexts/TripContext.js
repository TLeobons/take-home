import {useEffect, useState, createContext} from 'react'
import {api} from 'services/httpService'

export const TripContext = createContext()

const TripProvider = ({children}) => {

  const [trips, setTrips] = useState([])

  useEffect(() => {
    const fetchData = async () => {
    const {data} = await api.get('/trip')
    console.log('fetched trips', data)
    setTrips(data)
  }
    fetchData()
  }, [])

  const addTrip = () => {

  }

  const removeTrip = async id => {
    const originalTrips = trips
    const updatedTrips = trips.filter(trip => trip.id !== id)
    setTrips(updatedTrips)
    try {
      await api.delete(`/trip/${id}`)
    } catch (error) {
      alert('Something went wrong while deleting trip')
      setTrips(originalTrips)
    }
  }

  return (
    <TripContext.Provider value={{trips, addTrip, removeTrip}}>
      {children}
    </TripContext.Provider>
  )
}

export default TripProvider
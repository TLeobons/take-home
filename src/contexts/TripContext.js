import { useEffect, createContext, useReducer } from 'react'
import { api } from 'services/httpService'

export const TripContext = createContext()

const initialState = {
  trips: [],
  form: {
    address: {
      city: '',
      country: '',
      street: '',
      street_num: '',
      zip: '',
    },
    company_name: '',
    covid: null,
    covid_test_date: '',
    end_date: '',
    start_date: '',
  },
  countries: [],
  selectedCountry: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_INITIAL':
      return {
        trips: [...state.trips],
        form: {
          address: {
            city: '',
            country: '',
            street: '',
            street_num: '',
            zip: '',
          },
          company_name: '',
          covid: null,
          covid_test_date: '',
          end_date: '',
          start_date: '',
        },
        countries: [...state.countries],
        selectedCountry: '',
      }
      break
    case 'SET_TRIPS':
      return {
        trips: action.payload,
        form: { ...state.form },
        countries: [...state.countries],
        selectedCountry: state.selectedCountry,
      }
    case 'ADD_TRIP':
      return {
        trips: [...state.trips, action.payload],
        form: { ...state.form },
        countries: [...state.countries],
        selectedCountry: state.selectedCountry,
      }
    case 'REMOVE_TRIP':
      const filter = [...state.trips.filter(trip => trip.id !== action.payload)]
      return {
        trips: filter,
        form: { ...state.form },
        countries: [...state.countries],
        selectedCountry: state.selectedCountry,
      }
    case 'SET_COUNTRIES':
      return {
        trips: [...state.trips],
        form: { ...state.form },
        countries: action.payload,
        selectedCountry: state.selectedCountry,
      }
    case 'SET_SELECTED_COUNTRY':
      return {
        trips: [...state.trips],
        form: { ...state.form },
        countries: [...state.countries],
        selectedCountry: `flag-${action.payload}`,
      }
    case 'SET_FORM':
      return {
        trips: [...state.trips],
        form: {
          ...state.form,
          ...action.payload,
          address: {
            ...state.form.address,
            ...action.payload.address,
          },
        },
        countries: [...state.countries],
        selectedCountry: state.selectedCountry,
      }
    default:
      throw new Error('Unhandled action')
  }
}

const TripProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = async () => {
    const { data } = await api.get('/trip')
    debugger
    dispatch({ type: 'SET_TRIPS', payload: data })
  }

  useEffect(() => {
    fetchData()
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    const { data } = await api.get('/country')
    const sortedData = data.sort((a, b) => (a.label > b.label ? 1 : -1))

    const countriesData = []
    sortedData.forEach(data => {
      countriesData.push({
        value: data.value,
        label: data.label,
        className: `flag-${data.value}`,
      })
    })
    dispatch({ type: 'SET_COUNTRIES', payload: countriesData })
  }

  return (
    <TripContext.Provider value={[state, dispatch]}>
      {children}
    </TripContext.Provider>
  )
}

export default TripProvider

import React, { useId } from 'react'
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import styles from "./CountriesList.module.css";


function CountriesList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking on the city on the map" />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country }]
    } else {
      return arr;
    }
  }, [])

  return (
    <ul className={styles.countriesList}>
      {countries.map((country,) => (
        <CountryItem country={country} key={useId()} />
      ))}
    </ul>
  )
}

export default CountriesList;
import React, { useState, useEffect, SyntheticEvent } from "react";
import { getBreweriesByState } from "../breweryDbClient";
import BreweriesList from "./BreweriesList";

export type Brewery = {
  id: number
  name: string
  brewery_type: string | null
  street: string
  address_2: string | null
  address_3: string | null
  city: string
  state: string
  county_province: string | null
  postal_code: string
  country: string
  longitude: string
  phone: string
  website_url: string
}

export type ListContainerProps = {
  stateInput: string
  setCities: (arg: string[]) => void
  filterType: {
    selectedCities: string[]
    selectedType: string
  }
  city: string
  brewery_type: string
  name: string
}

const parseData = (allBreweries: Brewery[]) =>
  allBreweries.filter(brewery =>
    ["micro", "regional", "brewpub"].includes(brewery["brewery_type"])
  );

const extractCities = (allBreweries: Brewery[]) =>
  allBreweries.reduce(
    (acc: any, brewery: Brewery) =>
      acc.includes(brewery.city) ? acc : [...acc, brewery.city],
    []
  );

export default function ListContainer({
  stateInput,
  setCities,
  filterType: { selectedCities, selectedType } }: ListContainerProps
) {
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const applyFilters = (allBreweries: Brewery[]) => allBreweries.filter(isSelected);

  const isSelected = ({ city, brewery_type, name }: Brewery) => {
    const lowerCasedInput = searchInput.toLowerCase();
    return (
      (selectedType ? selectedType === brewery_type : true) &&
      (selectedCities.length ? selectedCities.includes(city) : true) &&
      (searchInput
        ? city.toLowerCase().includes(lowerCasedInput) ||
        name.toLowerCase().includes(lowerCasedInput)
        : true)
    );
  };

  useEffect(() => {
    stateInput &&
      getBreweriesByState(stateInput).then(data => {
        const breweries = parseData(data);
        console.log(data)
        setBreweries(breweries);
        setCities(extractCities(breweries));
      });
  }, [stateInput]);

  return (
    <>
      <h1>List of Breweries from {breweries[0]?.state || "nowhere"}</h1>
      <header className="search-bar">
        <form id="search-breweries-form" autoComplete="off">
          <label htmlFor="search-breweries">
            <h2>Search breweries:</h2>
          </label>
          <input
            id="search-breweries"
            name="search-breweries"
            value={searchInput}
            onInput={(event: any) => setSearchInput(event.target.value)}
            type="text"
          />
        </form>
      </header>
      <BreweriesList breweries={applyFilters(breweries)} />
    </>
  );
}

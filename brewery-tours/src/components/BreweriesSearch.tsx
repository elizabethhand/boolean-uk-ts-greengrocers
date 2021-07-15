import React, { useState } from "react";

import ListContainer from "./ListContainer";
import FilterContainer from "./FilterContainer";
import { ListContainerProps } from './ListContainer'

type SearchInputProps = {
  searchInput: string
}

type EventArg = {
  target: { name: string, value: any, checked: boolean, type: string }
}

export default function BreweriesSearch({ searchInput }: SearchInputProps) {
  const [cities, setCities] = useState([]);
  const [filters, setFilters] = useState<ListContainerProps>({
    selectedCities: [],
    selectedType: "",
  });

  const updateFilters = (e: EventArg) => {
    let { name, value, checked, type } = e.target;

    if (type === "checkbox")
      value = checked
        ? [...filters.selectedCities, value]
        : filters.selectedCities.filter(c => c !== value);

    setFilters({ ...filters, [name]: value });
  };
  return (
    <main className="main-search">
      <ListContainer
        stateInput={searchInput}
        setCities={setCities}
        filters={filters}
      />
      <FilterContainer
        cities={cities}
        filterSelections={filters}
        updateFilter={updateFilters}
      />
    </main>
  );
}

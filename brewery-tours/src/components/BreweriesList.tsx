import React, { useState } from "react";
import BreweriesListItem from "./BreweriesListItem";
import { Brewery } from "./ListContainer";


type ToggleForm = (arg: number | null) => number | null

type BreweryListProps = {
  breweries: Brewery[]
  setOpenForm: (open: boolean | ToggleForm) => void
  brewery: Brewery
}

export default function BreweriesList({ breweries }: BreweryListProps) {
  const [openForm, setOpenForm] = useState(false);

  return (
    <article>
      <ul className="breweries-list">
        {breweries.map((brewery: Brewery) => (
          <BreweriesListItem
            key={brewery.id}
            brewery={brewery}
            setOpenForm={setOpenForm}
            openForm={brewery.id === openForm}
          />
        ))}
      </ul>
    </article>
  );
}

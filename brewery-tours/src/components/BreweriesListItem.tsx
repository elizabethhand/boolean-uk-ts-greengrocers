import React, { SyntheticEvent, useState } from "react";
import BookingForm from "./BookingForm";
import { postNewBooking } from "../breweryDbClient";

let initialForm = {
  firstName: "",
  lastName: "",
  date: "",
  peopleCount: "",
  time: "",
};


type Brewery = {
  name: string
  brewery_type: string | null
  phone: string | null
  website_url: string
  street: string
  city: string
  postal_code: string
  id: number
}

type ToggleForm = (arg: number | null) => number | null

type BreweriesListItemProps = {
  brewery: Brewery
  setOpenForm: (open: boolean | ToggleForm) => void
  isFormOpen: boolean
}

export default function BreweriesListItem({
  brewery: {
    name,
    brewery_type,
    phone,
    website_url,
    street,
    city,
    postal_code,
    id,
  },
  isFormOpen,
  setOpenForm,
}: BreweriesListItemProps) {
  const [form, setForm] = useState(initialForm);
  const updateForm = (e: SyntheticEvent) => {
    const { name, value } = e.target;

    setForm(form => ({ ...form, [name]: value }));
  };

  const clearForm = () => setForm(initialForm);

  return (
    <li>
      <h2>{name}</h2>
      <div className="type">{brewery_type}</div>
      <section className="address">
        <h3>Address:</h3>
        <p>{street}</p>
        <p>
          <strong>
            {city}, {postal_code}
          </strong>
        </p>
      </section>
      <section className="phone">
        <h3>Phone:</h3>
        <p>{phone || "N/A"}</p>
      </section>
      <section className="booking">
        {
          <button
            onClick={() =>
              setOpenForm(openForm => (openForm === id ? null : id))
            }
          >
            Book a tour
          </button>
        }
      </section>
      <section className="link">
        {website_url && (
          <a href={website_url} target="_blank">
            Visit Website
          </a>
        )}
      </section>
      {isFormOpen && (
        <BookingForm
          handleSubmit={() => {
            postNewBooking({ ...form, breweryId: id });
            clearForm();
          }}
          updateForm={updateForm}
          form={form}
        />
      )}
    </li>
  );
}

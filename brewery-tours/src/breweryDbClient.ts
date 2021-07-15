const API = "https://api.openbrewerydb.org/";
const SERVER = "http://localhost:4000/";

const genericFetch = (url: string, optns = {}) =>
    fetch(url, optns).then(resp => {
        if (!resp.ok) throw resp.statusText;
        return resp.json();
    });

const post = (url: string, payload: Booking) =>
    genericFetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

export const getBreweriesByState = (state: string) =>
    genericFetch(`${API} / breweries ? by_state = ${state}`)

type Booking = {
    firstName: string
    lastName: string
    date: string
    peopleCount: string
    time: string
    breweryId: number
}


export const postNewBooking = (booking: Booking) => post(SERVER + "/bookings", booking);
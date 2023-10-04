import { faker } from "@faker-js/faker";
import { UniqueEnforcer } from "enforce-unique";

const uniqueEnforcerNumber = new UniqueEnforcer();

const listOfFeatures = [
  "kitchen facilities",
  "bathroom facilities",
  "fireplace",
  "hypoallergic bedding",
  "speakers",
  "TV",
  "WiFi",
  "pet friendly",
  "kids friendly",
  "playground",
  "parking",
  "lake and mountains nearby",
  "sea nearby",
];
function generateUniqueIntegers(number, min, max) {
  const numbers = Array.from({ length: number }).map(() => {
    return uniqueEnforcerNumber.enforce(() => {
      return faker.number.int({
        min: min,
        max: max,
      });
    });
  });
  return numbers;
}

function createVenue(id) {
  const venue = {
    id: id,
    location: {
      postalCode: faker.location.zipCode("##-###"),
      name: faker.location.city(),
    },
    pricePerNightInEUR: faker.commerce.price(),
    rating: faker.number.float({ min: 0, max: 5, precision: 0.1 }),
    capacity: faker.number.int({ min: 1, max: 12 }),
    name: faker.music.songName(),
    albumId: 101 - id,
  };
  return venue;
}

function createVenueDetails(venue, id, features) {
  const venueDetails = {
    id: id,
    venueId: venue.id,
    location: venue.location,
    pricePerNightInEUR: venue.pricePerNightInEUR,
    rating: venue.rating,
    numberOfReviews: faker.number.int({ min: 0, max: 10000 }),
    capacity: venue.capacity,
    name: venue.name,
    albumId: venue.albumId,
    description: faker.lorem.sentences({min: 2 , max: 7}),
    features: faker.helpers.arrayElements(features, { min: 2, max: 4 }),
    sleepingDetails: {
      maxCapacity: venue.capacity,
      amountOfBeds: faker.number.int({
        min: venue.capacity / 2,
        max: venue.capacity,
      }),
    },
    checkInHour: "12pm",
    checkOutHour: "10am",
    distanceFromCityCenterInKM: faker.number.int({ min: 1, max: 30 }),
    contactDetails: {
      phone: faker.phone.number(),
      email: faker.internet.email({
        firstName: venue.name,
        allowSpecialCharacters: true,
      }),
    },
  };
  return venueDetails;
}
export function generateData(venuesNumber) {
  const idForDetails = generateUniqueIntegers(100, 1, 20000);
  const venues = [];
  const venuesDetails = [];
  for (let i = 1; i <= venuesNumber; i++) {
    const venue = createVenue(i);
    const venueDetails = createVenueDetails(
      venue,
      idForDetails[i],
      listOfFeatures,
    );
    venues.push(createVenue(i));
    venuesDetails.push(venueDetails);
  }
  const data = {
    venues: venues,
    venuesDetails: venuesDetails,
  };
  return data;
}

console.log(generateData(2));

import { faker } from "@faker-js/faker";
import { UniqueEnforcer } from "enforce-unique";
import { Amenity } from "./interfaces/Amenity";
import { Venue } from "./interfaces/Venue";
import { VenueDetails } from "./interfaces/VenueDetails";
import { VenuesData } from "./interfaces/VenuesData";

const uniqueEnforcerNumber = new UniqueEnforcer();

const amenities: Amenity = {
  generalAmenities: [
    "fireplace",
    "speakers",
    "WiFi",
    "restaurant",
    "bar",
    "pool",
    "jacuzzi",
    "garden",
    "fitness center",
    "24h reception",
    "karaoke",
    "outdoor music",
    "indoor music",
    "library",
    "pet friendly",
    "playground",
    "parking",
  ],
  roomAmenities: [
    "kitchen facilities",
    "bathroom facilities",
    "hypoallergic bedding",
    "TV",
    "safe",
  ],
  neighbourhoods: [
    "lake",
    "forest",
    "mountains",
    "sea",
    "national park",
    "park",
    "mall",
    "zoo",
    "church",
    "old town",
    "historical monument",
    "museum",
    "theatre",
    "cinema",
    "amusement park",
    "restaurant",
  ],
  handicapAccesibility: [
    "wheelchair friendly",
    "blind friendly",
    "deaf friendly",
    "short-grown friendly",
  ],
};

function generateUniqueIntegers(number: number, min: number, max: number) {
  return Array.from({ length: number }).map(() => {
    return uniqueEnforcerNumber.enforce(() => {
      return faker.number.int({
        min: min,
        max: max,
      });
    });
  });
}

function createVenue(id: number) {
  const venue: Venue = {
    id: id,
    location: {
      postalCode: faker.location.zipCode("##-###"),
      name: faker.location.city(),
      coordinates: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
    },
    pricePerNightInEUR: faker.commerce.price(),
    rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
    capacity: faker.number.int({ min: 1, max: 12 }),
    name: faker.music.songName(),
    albumId: 101 - id,
  };
  return venue;
}

function createVenueDetails(venue: Venue, id: number, amenities: Amenity) {
  const venueDetails: VenueDetails = {
    id: id,
    venueId: venue.id,
    location: venue.location,
    pricePerNightInEUR: venue.pricePerNightInEUR,
    rating: venue.rating,
    numberOfReviews: faker.number.int({ min: 0, max: 10000 }),
    capacity: venue.capacity,
    name: venue.name,
    albumId: venue.albumId,
    description: faker.lorem.sentences({ min: 2, max: 7 }),
    features: {
      generalAmenities: faker.helpers.arrayElements(
        amenities.generalAmenities,
        { min: 3, max: amenities.generalAmenities.length },
      ),
      roomAmenities: faker.helpers.arrayElements(amenities.roomAmenities, {
        min: 1,
        max: amenities.roomAmenities.length,
      }),
      neighbourhoods: faker.helpers.arrayElements(amenities.neighbourhoods, {
        min: 3,
        max: amenities.neighbourhoods.length,
      }),
      handicapAccesibility: faker.helpers.arrayElements(
        amenities.handicapAccesibility,
        { min: 0, max: amenities.handicapAccesibility.length },
      ),
    },
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
        lastName: venue.location.name,
        allowSpecialCharacters: true,
      }),
    },
  };
  return venueDetails;
}
export function generateData(venuesNumber: number) {
  const idForDetails: number[] = generateUniqueIntegers(100, 1, 20000);
  const venues = [];
  const venuesDetails = [];
  for (let i: number = 1; i <= venuesNumber; i++) {
    const venue = createVenue(i);
    const venueDetails = createVenueDetails(venue, idForDetails[i], amenities);
    venues.push(venue);
    venuesDetails.push(venueDetails);
  }
  const data: VenuesData = {
    venues: venues,
    venuesDetails: venuesDetails,
  };
  return data;
}

generateData(1);

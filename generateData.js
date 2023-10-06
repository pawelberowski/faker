"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateData = void 0;
var faker_1 = require("@faker-js/faker");
var enforce_unique_1 = require("enforce-unique");
var uniqueEnforcerNumber = new enforce_unique_1.UniqueEnforcer();
var amenities = {
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
function generateUniqueIntegers(number, min, max) {
  var numbers = Array.from({ length: number }).map(function () {
    return uniqueEnforcerNumber.enforce(function () {
      return faker_1.faker.number.int({
        min: min,
        max: max,
      });
    });
  });
  return numbers;
}
function createVenue(id) {
  var venue = {
    id: id,
    location: {
      postalCode: faker_1.faker.location.zipCode("##-###"),
      name: faker_1.faker.location.city(),
    },
    pricePerNightInEUR: faker_1.faker.commerce.price(),
    rating: faker_1.faker.number.float({ min: 1, max: 5, precision: 0.1 }),
    capacity: faker_1.faker.number.int({ min: 1, max: 12 }),
    name: faker_1.faker.music.songName(),
    albumId: 101 - id,
  };
  return venue;
}
function createVenueDetails(venue, id, amenities) {
  var venueDetails = {
    id: id,
    venueId: venue.id,
    location: venue.location,
    pricePerNightInEUR: venue.pricePerNightInEUR,
    rating: venue.rating,
    numberOfReviews: faker_1.faker.number.int({ min: 0, max: 10000 }),
    capacity: venue.capacity,
    name: venue.name,
    albumId: venue.albumId,
    description: faker_1.faker.lorem.sentences({ min: 2, max: 7 }),
    features: {
      generalAmenities: faker_1.faker.helpers.arrayElements(
        amenities.generalAmenities,
        { min: 3, max: amenities.generalAmenities.length },
      ),
      roomAmenities: faker_1.faker.helpers.arrayElements(
        amenities.roomAmenities,
        {
          min: 1,
          max: amenities.roomAmenities.length,
        },
      ),
      neighbourhoods: faker_1.faker.helpers.arrayElements(
        amenities.neighbourhoods,
        {
          min: 3,
          max: amenities.neighbourhoods.length,
        },
      ),
      handicapAccesibility: faker_1.faker.helpers.arrayElements(
        amenities.handicapAccesibility,
        { min: 0, max: amenities.handicapAccesibility.length },
      ),
    },
    sleepingDetails: {
      maxCapacity: venue.capacity,
      amountOfBeds: faker_1.faker.number.int({
        min: venue.capacity / 2,
        max: venue.capacity,
      }),
    },
    checkInHour: "12pm",
    checkOutHour: "10am",
    distanceFromCityCenterInKM: faker_1.faker.number.int({ min: 1, max: 30 }),
    contactDetails: {
      phone: faker_1.faker.phone.number(),
      email: faker_1.faker.internet.email({
        firstName: venue.name,
        lastName: venue.location.name,
        allowSpecialCharacters: true,
      }),
    },
  };
  return venueDetails;
}
function generateData(venuesNumber) {
  var idForDetails = generateUniqueIntegers(100, 1, 20000);
  var venues = [];
  var venuesDetails = [];
  for (var i = 1; i <= venuesNumber; i++) {
    var venue = createVenue(i);
    var venueDetails = createVenueDetails(venue, idForDetails[i], amenities);
    venues.push(venue);
    venuesDetails.push(venueDetails);
  }
  var data = {
    venues: venues,
    venuesDetails: venuesDetails,
  };
  return data;
}
exports.generateData = generateData;

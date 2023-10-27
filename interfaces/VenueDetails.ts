import { Amenity } from "./Amenity";
import { LocationDetails } from "./LocationDetails";

interface SleepingDetails {
  maxCapacity: number;
  amountOfBeds: number;
}

interface ContactDetails {
  phone: string;
  email: string;
}
export interface VenueDetails {
  id: number;
  venueId: number;
  location: LocationDetails;
  pricePerNightInEUR: string | number;
  rating: number;
  numberOfReviews: number;
  capacity: number;
  name: string;
  albumId: number;
  description: string;
  features: Amenity;
  sleepingDetails: SleepingDetails;
  checkInHour: string;
  checkOutHour: string;
  distanceFromCityCenterInKM: number;
  contactDetails: ContactDetails;
}

import { LocationDetails } from "./Location";

export interface Venue {
  id: number;
  location: LocationDetails;
  pricePerNightInEUR: number | string;
  rating: number;
  capacity: number;
  name: string;
  albumId: number;
}

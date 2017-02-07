import {CollectionObject} from "./collection-object.model";

export interface Job extends CollectionObject {
  name: string;
  description: string;
  location: Location;
  owner?: string;
  open: boolean;
  invited?: string[];
  rsvps?: RSVP[];
}

interface RSVP {
  userId: string;
  response: string;
}

interface Location {
  name: string;
  lat?: number;
  lng?: number;
}

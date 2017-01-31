import {CollectionObject} from "./collection-object.model";
export interface Task extends CollectionObject {
  name: string;
  description: string;
}
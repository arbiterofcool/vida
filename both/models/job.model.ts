import {Task} from "./task.model";
import {CollectionObject} from "./collection-object.model";

export interface Job extends CollectionObject {
  name: string;
  description: string;
  location?: string;
  tasks?: Task[];
  owner?: string;
}

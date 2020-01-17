import { User } from "./user";
import { Property } from "./property";
export class UserProfile {
  user: User;
  is_online: boolean;
  LikedProperties: Property[];
}

import {User} from "./user.model";

export class WhosIn {
  activeUsers: User[];
  inactiveUsers: User[];
}

export class WhosInResponse {
  data: WhosIn;
}

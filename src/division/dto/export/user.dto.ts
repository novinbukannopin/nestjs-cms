export class UserDto {
  id: number;
  username: string;
  display_name: string;
  email: string;
  role: {
    name: string;
  };
  division: {
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
import { Injectable } from '@nestjs/common';
import { UserModel, UserType, IUser } from './user.schema';

@Injectable()
export class UserService {
  constructor() {}

  create(user: UserType): Promise<IUser> {
    return UserModel.create(user);
  }

  findOne(email: string) {
    return UserModel.findOne({ email });
  }
}

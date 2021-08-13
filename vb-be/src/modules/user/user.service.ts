import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { UserModel, UserType, IUser } from '@modules/user/user.schema';

@Injectable()
export class UserService {
  create(user: UserType): Promise<IUser> {
    return UserModel.create(user);
  }

  findOne(email: string) {
    return UserModel.findOne({ email });
  }

  findOneById(id: string | Types.ObjectId) {
    return UserModel.findById({ _id: id });
  }
}

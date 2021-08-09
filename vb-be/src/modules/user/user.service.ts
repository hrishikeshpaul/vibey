import { Injectable } from '@nestjs/common';

import { UserModel, UserType, IUser } from '@modules/user/user.schema';
import { Types } from 'mongoose';

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

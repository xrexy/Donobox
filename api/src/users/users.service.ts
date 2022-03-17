import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../utils/graphql/models/user.model';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { LoginUserInput } from './dto/input/login-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  hashPassword = (password: string, callback: (enc: string) => string) => {
    bcrypt.hash(password, 10, (err, enc) => callback(enc));
  };

  public async createUser(createUserData: CreateUserInput): Promise<User> {
    const user: User = {
      ...createUserData,
      userId: uuidv4(),
      password: await bcrypt.hash(createUserData.password, 10),
      tokens: 0.0,
    };
    return this.userModel.create(user);
  }

  public async updateUser(updateUserData: UpdateUserInput): Promise<User> {
    const user = await this.userModel.findOne({
      userId: updateUserData.userId,
    });

    const updated = Object.assign(user, updateUserData);
    await this.userModel.updateOne({ userId: updateUserData.userId }, updated);

    return updated;
  }

  public async getUser(getUserArgs: GetUserArgs): Promise<User> {
    return this.userModel.findOne({ userId: getUserArgs.userId });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findByLogin({ email, password }: LoginUserInput): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if (!(await this.validate(email, password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return;

    return (await bcrypt.compare(password, user.password)) ? user : null;
  }

  public async getUsers(getUsersArgs: GetUsersArgs): Promise<User[]> {
    return this.userModel.find({
      userId: {
        $in: getUsersArgs.userIds,
      },
    });
  }

  public async deleteUser(deleteUserData: DeleteUserInput): Promise<User> {
    return await this.userModel.findOneAndDelete({ ...deleteUserData });
  }
}

import IUser from './dtos/user';

let _user: IUser;

export default {
  get user() {
    return _user;
  },

  async load(user: any) {
    _user = user;
  },
};

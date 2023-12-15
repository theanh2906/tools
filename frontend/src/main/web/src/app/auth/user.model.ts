export class User {
  constructor(
    public id: string,
    public email: string,
    public roles: string[],
    public username: string
  ) {}
}

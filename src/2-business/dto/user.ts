export interface ICreateUserDTO {
  email: string,
  password: string
}

export class CreateUserDTO implements ICreateUserDTO {
  public email!: string
  public password!: string

  constructor (obj: Partial<CreateUserDTO>) {
    Object.assign(this, obj)
  }
}

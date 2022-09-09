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

// ===============================

export interface IFindUserByEmailDTO {
  email: string
}

export class FindUserByEmailDTO implements IFindUserByEmailDTO {
  public email!: string

  constructor (obj: Partial<FindUserByEmailDTO>) {
    Object.assign(this, obj)
  }
}

// ==============================

export interface IUpdateUserDTO {
  userId: number
  email?: string
  password?: string
  confirmPassword?: string
}

export class UpdateUserDTO implements IUpdateUserDTO {
  public userId!: number
  public email?: string
  public password?: string
  public confirmPassword?: string

  constructor (obj: Partial<UpdateUserDTO>) {
    Object.assign(this, obj)
  }
}

// ===========================

export interface IFindUserByIdDTO {
  userId: number
}

export class FindUserByIdDTO implements IFindUserByIdDTO {
  public userId!: number

  constructor (obj: Partial<FindUserByIdDTO>) {
    Object.assign(this, obj)
  }
}

// ============================

export interface IDeleteUserDTO {
  userId: number
}

export class DeleteUserDTO implements IDeleteUserDTO {
  public userId!: number

  constructor (obj: Partial<DeleteUserDTO>) {
    Object.assign(this, obj)
  }
}

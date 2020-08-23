import { CustomError } from './'

export class AuthError extends CustomError {
  statusCode = 401
  reason = 'Auth error'

  constructor(public message: string) {
    super(message)
    Object.setPrototypeOf(this, AuthError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}

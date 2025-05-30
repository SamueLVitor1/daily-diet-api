export class UnauthorizedAccessError extends Error {
  constructor() {
    super('Usuário não autorizado a acessar este recurso.')
  }
}
export interface IInputBase<TError> {
  hasError: boolean
  validate(): Promise<TError[]>
}

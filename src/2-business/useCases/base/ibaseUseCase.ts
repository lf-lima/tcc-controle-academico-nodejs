export interface IBaseUseCase<TInput, TResponse> {
  run(input: TInput): Promise<TResponse>
}

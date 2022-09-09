export interface IDBConnection<TConfig> {
  config: TConfig
  connect(): Promise<void>
}

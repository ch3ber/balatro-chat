export interface IAiService {
  token: string // API token hardcoded for now
  sendMessage(message: string): Promise<string>
}

export default interface ApiResponse {
  data?: {
    statusCode?: number
    success?: boolean
    errorMessages?: string[]
    result?: {
      [key: string]: string
    }
  }
  error?: any
}

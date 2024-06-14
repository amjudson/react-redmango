export default interface ApiResponseBase {
  data?: {
    statusCode?: number
    success?: boolean
    errorMessages?: string[]
  }
}

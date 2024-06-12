export default interface ApiResponse {
  statusCode:    number;
  success:       boolean;
  errorMessages: string[];
  result:        any;
}

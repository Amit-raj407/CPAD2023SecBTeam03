class ApiResponse {
    constructor(responseBody, statusCode) {
        this.responseBody = responseBody;
        this.statusCode = statusCode;
    }
}

module.exports = ApiResponse;
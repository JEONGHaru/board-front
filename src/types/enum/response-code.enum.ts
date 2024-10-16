enum ResponseCode {
     // HTTP STATUS 200
      SUCCESS = "Success",

     // HTTP STATUS 400
      VALIDATION_FAILED = "Validation failed.",
      DUPLICATE_EMAIL = "Duplicate email.",
      DUPLICATE_NICKNAME = "Duplicate nickname.",
      DUPLICATE_TEL_NUMBER = "Duplicate tel number.",
      NOT_EXISTED_USER = "This user does not exist.",
      NOT_EXISTED_BOARD = "This board does not exist.",
 
     //HTTP STATUS 401
      SIGN_IN_FAIL = "Login information mismatch.",
      AUTHORIZATION_FAIL = "Authorization failed.",
 
     // HTTP STATUS 403
      NO_PERMISSION = "Do not have permission.",
 
     // HTTP STATUS 500
      DATABASE_ERROR = "Database error."
}

export default  ResponseCode;
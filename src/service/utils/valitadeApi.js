export default function valitadeApi(error, setInputError) {
  if (error.response && error.response.status === 422) {
    const bodyErrors = error.response.data.errors.body;
    if (Array.isArray(bodyErrors)) {
      bodyErrors.forEach((errMsg) => {
        if (errMsg.includes("users.email")) {
          setInputError({ email: "Email is already taken." });
        }
        if (errMsg.includes("users.username")) {
          setInputError({ username: "Username is already taken." });
        }
      });
    }
  } else {
    setInputError({ general: "An error occurred during registration." });
  }
}

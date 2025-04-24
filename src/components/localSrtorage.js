const signUpCheck = (formValues, setFormValues) => {
  const storedUserString = localStorage.getItem("user");
  if (!storedUserString) {
    return false; // Нет сохраненного пользователя, можно регистрироваться
  }

  try {
    const storedUser = JSON.parse(storedUserString);
    if (storedUser && storedUser.email === formValues.email) {
      setFormValues("");
      alert("Этот email уже зарегистрирован.");
      return true; // Email уже зарегистрирован
    }
    return false; // Email не зарегистрирован, можно регистрироваться
  } catch (error) {
    console.error("Ошибка при разборе данных пользователя:", error);
    return false; // Считаем, что можно регистрироваться
  }
};

const loginProcess = (
  formValues,
  setLogged,
  navigate,
  setFormValues,
  setInputError
) => {
  const storedUserString = localStorage.getItem("user");

  if (!storedUserString) {
    console.log("No user found in localStorage");
    return;
  }

  try {
    const storedUser = JSON.parse(storedUserString);

    if (
      storedUser &&
      storedUser.email === formValues.email &&
      storedUser.password === formValues.password
    ) {
      setLogged(true);
      navigate("/");
    } else {
      setInputError({ ...setInputError, login: "Invalid credentials" });
      setFormValues("");
    }
  } catch (error) {
    console.error("Invalid credentials");
    setInputError({ ...setInputError, login: "Invalid credentials" });
  }
};

export { signUpCheck, loginProcess };

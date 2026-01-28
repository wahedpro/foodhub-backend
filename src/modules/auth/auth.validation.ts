
export const validateRegister = (payload: any) => {
  const { name, email, password, role } = payload;

  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (!["CUSTOMER", "PROVIDER"].includes(role)) {
    throw new Error("Invalid role selection");
  }
};

export const validateLogin = (payload: any) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
};

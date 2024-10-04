interface LoginResponse {
  data: {
    username: string;
    employee_status: "terminated" | "active";
  };
}

export async function handleLogin(
  username: string,
  password: string,
): Promise<LoginResponse | undefined> {
  if (
    username === "jonathan.harker@hawkinsrealestate.co.uk" &&
    password === "mina"
  ) {
    return {
      data: {
        username: "jharker",
        employee_status: "terminated",
      },
    };
  }
}

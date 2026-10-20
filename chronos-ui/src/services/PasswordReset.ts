import axios from "axios";

export interface PasswordReset {
  initializePasswordReset: (email: string) => Promise<object>;
  resetPassword: (password: string, token: string) => Promise<object>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<object>;
}

export default function usePasswordReset(): PasswordReset {
  const initializePasswordReset = async (email: string) => {
    const payload = { email };
    return axios.post("http://localhost:8080/api/v1/auth/initiate-password-reset", payload);
  }

  const resetPassword = async (password: string, token: string) => {
    const payload = { newPassword: password, token };
    return axios.post("http://localhost:8080/api/v1/auth/reset-password", payload);
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    const payload = { oldPassword, newPassword };
    return axios.post("http://localhost:8080/api/v1/auth/change-password", payload);
  }

  return {
    initializePasswordReset,
    resetPassword,
    changePassword
  }
}

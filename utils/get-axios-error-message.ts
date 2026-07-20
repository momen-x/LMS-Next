import { AxiosError } from "axios";

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data;
    if (responseData) {
      if (responseData.message && typeof responseData.message === "string") {
        return responseData.message;
      }
      if (responseData.message && typeof responseData.message === "object") {
        return responseData.message[0];
      }
    }
  }
};
export default getErrorMessage;

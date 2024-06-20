import axios from "axios";
import { API_END_POINTS } from "./enums";
import { getRequestPath } from "./utils";

async function registerUser() {
  try {
    const response = await axios.get(
      process.env.BASE_URL + getRequestPath(API_END_POINTS.REGISTER)
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

async function loginUser() {
  try {
    const response = await axios.get(getRequestPath(API_END_POINTS.LOGIN));
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

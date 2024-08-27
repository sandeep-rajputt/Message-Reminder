import UserData from "../models/userData.model.js";

async function createUser(newUserData) {
  try {
    const createdUser = await UserData.create(newUserData);
    if (createdUser) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

export default createUser;

import { supabase } from "../../config/supabase";
import { User } from "./user.types";

export class UserService {
  public async getAllUsers() {
    const { data, error } = await supabase.from("users").select("userName");

    console.log("🚀 ~ :7 ~ UserService ~ getAllUsers ~ data:", data);
    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data;
  }

  public async createUser(userData: User): Promise<User> {
    // Validate user data
    if (!userData.userName || !userData.password) {
      throw new Error("Username and password are required");
    }

    // Validate password length
    if (userData.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .insert(userData)
        .select()
        .single();

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      if (!data) {
        throw new Error("Failed to create user");
      }

      return data as User;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred while creating user");
    }
  }

  public async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select()
      .eq("id", id)
      .single();

    if (findError || !existingUser) {
      throw new Error("User not found");
    }

    // Validate password length if it's being updated
    if (userData.password && userData.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .update(userData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      if (!data) {
        throw new Error("Failed to update user");
      }

      return data as User;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred while updating user");
    }
  }

  public async deleteUser(id: string): Promise<void> {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred while deleting user");
    }
  }
}

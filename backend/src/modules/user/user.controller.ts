import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving users",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      console.log("Headers:", req.headers);
      console.log("Raw Body:", req.body);

      const result = await this.userService.createUser(userData);
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: userData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: userData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: { id: userId },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}

// Export a single instance to be used in routes
export const userController = new UserController();

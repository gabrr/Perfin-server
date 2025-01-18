import { IUser } from "domain/entities/user.interface";

export interface IUserRepository {
	getUsers(): Promise<IUser[]>;
	getUserById(id: string): Promise<IUser>;
}

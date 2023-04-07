export class UserModel {
public constructor(
    public _id?:string,
    public id?: string,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public password?: string,
    public city?: string,
    public address?: string,
    public isAdmin?: boolean
) { }
}
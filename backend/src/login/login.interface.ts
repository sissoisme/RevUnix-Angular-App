export interface Login {
    email:string;
    password:string;
    managerPermission: boolean;
    admin: boolean;

}
export interface Register {
    email:string;
    password:string;
    fullName:string;
    managerPermission: boolean;
    admin: boolean;

}
export interface Menu {
  route: string;
  title: string;
  icon?: string;
  isConnected?:boolean
  managerPermission?:boolean
  admin?: boolean;

}

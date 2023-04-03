interface menuI {
  id: number;
  name: string;
  url: string;
  children?: menuI;
}

export interface UserInfoState {
  allow_uid: number;
  is_admin: boolean;
  menus: menuI[];
}

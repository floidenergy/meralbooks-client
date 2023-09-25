export interface User {
  id: string,
  name: {
    fName: string,
    lName: string
  },
  username: string,
  email: string,
  info?: string, // TODO: MAKE AN ENTERFACE FOR THIS PROPERTY
  isAdmin?: boolean,
  dob: string,
  profilPic: string,
  order_history?: string[] // TODO: MAKE AN ENTERFACE FOR THIS PROPERTY
}

export interface UserInfo {
  isConnected: boolean,
  user: User | null;
}

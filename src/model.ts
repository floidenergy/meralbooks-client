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

export interface suggestionsInterface {
  id: string;
  name: string;
}

export interface InputError {
  name: string,
  title: string
}


export interface bannerInterface {
  id: string;
  img: string;
}

export interface categoriesInterface {
  // icon: string
  id: string
  name: string
  count: number
}

export interface bookInterface {
  _id: string
  img: string
  thumb: string
  name: string
  description: string
  price: number
  category: [{
    _id: string
    name: string
    description?: string
  }]
}

export interface authorInterface {
  _id: string
  name: string
  img: string
  thumb: string
}
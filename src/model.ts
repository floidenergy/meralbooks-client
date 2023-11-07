export interface User {
  _id: string,
  name: {
    fName: string,
    lName: string
  },
  username: string,
  gender: 'male' | 'femal'
  dob: string,
  profilPic: string,
  thumb: string,
  email: string,
  confirmedEmail: boolean
  shipping_info?: shippingInfoInterface[] | string[]
  orderHistory?: ordersInterface[] | string[]
  isAdmin?: boolean,
}

export interface bookInterface {
  _id: string
  img: string
  thumb: string
  name: string
  description: string
  author?: authorInterface
  price: number
  quantity: number
  language: ['Frabic', 'Arabic', 'English']
  genre: genreInterface[]
  review: reviewInterface[]
  rating: number
}

export interface authorInterface {
  _id: string
  img: string
  thumb: string
  name: string
  bio: string
  dob: Date
  books: bookInterface[] | string[]
}

export interface shippingInfoInterface {
  address: addressInterface
  phone: string
}

export interface addressInterface {
  _id: string
  street: string
  city: string
  state: string
  postalCode: string
}

export interface ordersInterface {
  _id: string
  user: User
  totalAmount: number
  items: orderItemsInterface[]
  status: ['Preparing', 'Whent To Shipping', 'Delivered', "Done"]
  shippingAgency: ['Yalidin', 'Coyot']
  shippingInfo: shippingInfoInterface
}

export interface orderItemsInterface {
  _id: string
  order: ordersInterface
  book: bookInterface
  quantity: number
}

export interface UserInfo {
  isConnected: boolean,
  user: User | null;
}

export interface suggestionsInterface {
  _id: string;
  name: string;
}

export interface InputError {
  name: string,
  title: string
}

export interface genreInterface {
  _id: string
  name: string
  description?: string
  count?: number
}

export interface reviewInterface {
  _id: string
  user: User
  review: string
  rate: number
  book: bookInterface | string
}

export interface bannerInterface {
  _id: string
  img: string;
}

export interface cartItemsInterface {
  item: bookInterface,
  quantity: number
}
type User = {
  _id?: string;
  name: string;
  email?: string;
  image: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  isAdmin: boolean;
};

export default User;
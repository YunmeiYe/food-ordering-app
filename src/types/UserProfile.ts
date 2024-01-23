type UserProfile = {
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
  createdAt?: string;
  updatedAt?: string;
};

export default UserProfile;
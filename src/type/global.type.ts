export type TCar = {
  _id: string;
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  features: string[];
  isDelete: boolean;
  pricePerHour: number;
  status: string;
  carImgUrl: string[];
  vehicleSpecification: string[];
  maxSeats: number;
  ratings: number;
  gearType: string;
  fuelType: string;
  carType: string;
  location: string;
};
export type TCarBooking = {
  _id: string;
  user: TUser;
  car: TCar;
  dropOffDate: string;
  totalCost: number;
  status: string;
  identity: string;
  identityNo: string;
  drivingLicenseNo: string;
  isDeleted: boolean;
  pickUpDate: string;
  createdAt: string;
  updatedAt: string;
};
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

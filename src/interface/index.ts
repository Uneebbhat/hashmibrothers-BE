import { Types } from "mongoose";

export enum Category {
  Medicine = "Medicine",
  PersonalCare = "Personal Care",
  BabyCare = "Baby Care",
  LifestyleFitness = "Lifestyle & Fitness",
  Organic = "Organic",
  HealthDevices = "Health Devices",
  VitaminsSupplements = "Vitamins & Supplements",
  SexualWellness = "Sexual Wellness",
  WomensHealth = "Women's Health",
  MensGrooming = "Men's Grooming",
  Skincare = "Skincare",
  HairCare = "Hair Care",
  AyurvedicHerbal = "Ayurvedic & Herbal",
  DentalCare = "Dental Care",
  EyeCare = "Eye Care",
  PetCare = "Pet Care",
  HomeEssentials = "Home Essentials",
  MedicalEquipment = "Medical Equipment",
  ElderlyCare = "Elderly Care",
}

// User Interface
export enum Role {
  user = "user",
  admin = "admin",
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface IUserDTO {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  role: Role;
}

export interface IProduct {
  productName: string;
  productDescription: string;
  category: Category;
  quantity: string;
  inStock: string;
  price: string;
  productImage: string;
}

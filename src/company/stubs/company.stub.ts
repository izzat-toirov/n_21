import { Company } from "../models/company.model";

export const CompanyStub = (): Partial<Company> => {
  return {
    id: 1,
    name: "Nest Company",
    phone: "998901234567",
    email: "test@Company.com",
    address: "Tashkent, Uzbekistan",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-01T00:00:00.000Z"),
    builders: [],
    machine: [],
  }
};

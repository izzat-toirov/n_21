import { Test, TestingModule } from "@nestjs/testing";
import { CompanyController } from "../company.controller";
import { CompanyService } from "../company.service";
import { Company } from "../models/company.model";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { UpdateCompanyDto } from "../dto/update-company.dto";
import { CompanyStub } from "../stubs/company.stub";

// const CompanyStub = (): Company => ({
//   id: 1,
//   name: "Nest Company",
//   phone: "998901234567",
//   email: "test@company.com",
//   address: "Tashkent, Uzbekistan",
// //   createdAt: new Date(),
// //   updatedAt: new Date(),
// //   builders: [],
// //   machine: [],
// });

describe("CompanyController", () => {
  let companyController: CompanyController;
  let companyService: CompanyService;

  const mockCompanyService = {
    createCompany: jest.fn().mockResolvedValue(CompanyStub()),
    getAllCompanies: jest.fn().mockResolvedValue([CompanyStub()]),
    getCompanyById: jest.fn().mockResolvedValue(CompanyStub()),
    deleteCompanyById: jest.fn().mockResolvedValue("1 - kompaniya o'chirildi"),
    updateCompanyById: jest.fn().mockResolvedValue(CompanyStub()),
    findCompanyByName: jest.fn().mockResolvedValue(CompanyStub()),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
      ],
    }).compile();

    companyController = module.get<CompanyController>(CompanyController);
    companyService = module.get<CompanyService>(CompanyService);
  });

  it("should be defined", () => {
    expect(companyController).toBeDefined();
  });

  describe("createCompany", () => {
    it("should create a company", async () => {
      const dto: CreateCompanyDto = {
        name: CompanyStub().name!,
        phone: CompanyStub().phone!,
        email: CompanyStub().email!,
        address: CompanyStub().address!,
      };
      expect(await companyController.createCompany(dto)).toEqual(CompanyStub());
    });
  });

  describe("getAllCompanies", () => {
    it("should return array of companies", async () => {
      expect(await companyController.getAllCompanies()).toEqual([CompanyStub()]);
    });
  });

  describe("getCompanyById", () => {
    it("should return a company by ID", async () => {
      expect(await companyController.getCompanyById(1)).toEqual(CompanyStub());
    });
  });

  describe("deleteCompanyById", () => {
    it("should delete a company", async () => {
      expect(await companyController.deleteCompanyById(1)).toBe("1 - kompaniya o'chirildi");
    });
  });

  describe("updateCompanyByID", () => {
    it("should update and return a company", async () => {
      const dto: UpdateCompanyDto = {
        name: "Updated Name",
        phone: "998909999999",
        email: "newemail@company.com",
        address: "New Address",
      };
      expect(await companyController.updateCompanyByID(dto, 1)).toEqual(CompanyStub());
    });
  });

  describe("findCompanyByName", () => {
    it("should return a company by name", async () => {
      expect(await companyController.findCompanyByName("Nest Company")).toEqual(CompanyStub());
    });
  });
});

import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { DatabaseService } from '../database/database.service';
import { Connection } from 'mongoose';
import { ProductStub} from "./stubs/product.stub";
import * as request from 'supertest';
import { CreateProductDto } from './dto/create.dto';

describe('ProductController', () =>{
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dbConnection.collection('products').deleteMany({});
  });

  describe('getProduct', () => {
    it('should return a array of product', async () => {
      await dbConnection.collection('products').insertOne(ProductStub());
      const response = await request(httpServer).get('/product/all');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject([ProductStub()]);
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const createProductRequest: CreateProductDto = {
        name: ProductStub().name,
        price: ProductStub().price,
        weight: ProductStub().weight,
        origin: ProductStub().origin,
        barcode: ProductStub().barcode,
        description: ProductStub().description,
        type: ProductStub().type,
        dimension: ProductStub().dimension,
        taxe: ProductStub().taxe,
      };
      const response = await request(httpServer)
        .post('/product/create')
        .send(createProductRequest);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createProductRequest);

      const product = await dbConnection
        .collection('products')
        .findOne({ name: createProductRequest.name });
      expect(product).toMatchObject(createProductRequest);
    });
  });
});

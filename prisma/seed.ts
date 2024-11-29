import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function asyncProvinceCodes() {
  try {
    const provinceCodes = JSON.parse(
      fs.readFileSync('./prisma/seed.json', 'utf8'),
    );
    await prisma.provinceCode.createMany({
      data: provinceCodes.map((item) => ({
        code: Number(item.code),
        provinceId: Number(item.provinceId),
      })),
    });

    console.log('Seeding province code completed!');
  } catch (error) {
    await prisma.province.deleteMany();
    console.log('Seeding province code fall!', error);
  }
}

async function main() {
  const response = await axios.get(
    'https://open.oapi.vn/location/provinces?page=0&size=100',
  );
  const provincesRes = response.data.data;
  if (provincesRes.length > 0) {
    const provinces = provincesRes.map((province) => {
      return {
        id: parseInt(province.id),
        name: province.name,
      };
    });

    const provinceCreate = await prisma.province.createMany({
      data: provinces,
      skipDuplicates: true,
    });

    if (provinceCreate.count === response.data.total) {
      console.log('Seed provinces success');
      asyncProvinceCodes();
    } else {
      console.log('Seed data fail');
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

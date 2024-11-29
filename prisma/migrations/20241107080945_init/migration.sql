-- CreateTable
CREATE TABLE "provinces" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "province_codes" (
    "id" SERIAL NOT NULL,
    "provinceId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "province_codes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "province_codes" ADD CONSTRAINT "province_codes_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "full_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "access" INTEGER NOT NULL DEFAULT 0,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keywords" (
    "movieId" INTEGER NOT NULL,
    "words" TEXT,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("movieId")
);

-- CreateIndex
CREATE UNIQUE INDEX "keywords_movieId_key" ON "keywords"("movieId");

-- AddForeignKey
ALTER TABLE "keywords" ADD CONSTRAINT "keywords_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

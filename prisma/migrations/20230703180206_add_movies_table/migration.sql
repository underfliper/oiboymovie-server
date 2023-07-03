-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "adult" BOOLEAN NOT NULL DEFAULT false,
    "imdb_id" TEXT,
    "original_language" TEXT NOT NULL,
    "original_title" TEXT,
    "overview" TEXT NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "poster_path" TEXT NOT NULL,
    "production_companies" JSONB,
    "production_countries" JSONB,
    "release_date" TIMESTAMP(3) NOT NULL,
    "runtime" INTEGER NOT NULL,
    "spoken_languages" JSONB,
    "status" TEXT NOT NULL,
    "tagline" TEXT,
    "title" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

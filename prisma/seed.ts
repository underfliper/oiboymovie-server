import { Gender, PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import usersDB from '../data/users.json';
import genresDB from '../data/genres.json';
import moviesDB from '../data/movies.json';
import ratingsDB from '../data/ratings.json';
import keywordsDB from '../data/keywords.json';

const prisma = new PrismaClient();

async function hashPassword(password) {
  try {
    const hash = await argon.hash(password);
    return hash;
  } catch {
    console.log('Error');
  }
}

const getUsers = async () => {
  const users = await Promise.all(
    usersDB.map(async (user) => {
      const reviews = getUserRatings(user.id);

      return {
        ...user,
        gender: user.gender === 'male' ? Gender.MALE : Gender.FEMALE,
        password: await hashPassword(user.password),
        reviews: {
          create: reviews.map((item) => ({
            rating: item.rating,
            text: item.text,
            publishDate: item.publishDate,
            movie: {
              connect: {
                id: item.movieId,
              },
            },
          })),
        },
      };
    }),
  );

  return users;
};

const getGenres = () => {
  return genresDB.map((genre) => ({
    name: genre.name,
    key: genre.name.replace(' ', '').toLowerCase(),
  }));
};

const getMovies = () => {
  const movies = moviesDB.map((movie) => {
    const movieGenres = movie.genres;
    const date = movie.release_date.split('-');
    const keywords = keywordsDB.find((item) => item.movieId === movie.id);

    delete movie.genres;
    delete movie.backdrop_path;

    if (movie.production_companies.length === 0)
      movie.production_companies = undefined;

    if (movie.production_countries.length === 0)
      movie.production_countries = undefined;

    if (movie.spoken_languages.length === 0) movie.spoken_languages = undefined;

    if (movie.original_title.length === 0) movie.original_title = undefined;

    if (movie.tagline.length === 0) movie.tagline = undefined;

    return {
      ...movie,
      release_date: new Date(+date[0], +date[1], +date[2]),
      genres: {
        create: movieGenres.map((item) => ({
          genre: { connect: { id: item.id } },
        })),
      },
      keywords: {
        create: { words: keywords.keywords },
      },
    };
  });

  return movies;
};

const getUserRatings = (userId) => {
  return ratingsDB[userId];
};

async function main() {
  const users = await getUsers();
  const genres = getGenres();
  const movies = getMovies();

  await prisma.genre.createMany({ data: genres });

  await prisma.movie.createMany({
    data: movies.map((movie) => {
      const { id, genres, keywords, ...rest } = movie;

      return { ...rest };
    }),
  });

  movies.forEach(async (movie) => {
    await prisma.movie.update({
      where: { id: movie.id },
      data: { genres: movie.genres, keywords: movie.keywords },
    });
  });

  await prisma.user.createMany({
    data: users.map((user) => {
      const { id, reviews, ...rest } = user;

      return { ...rest };
    }),
  });

  users.forEach(async (user) => {
    await prisma.user.update({
      where: { id: user.id },
      data: { reviews: user.reviews },
    });
  });
}

main()
  .then(async () => {
    console.log('[SEED] Success.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log('[SEED] Error.');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

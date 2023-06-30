import { Gender, PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();
const usersDB = require('./users.json');

async function hashPassword(password) {
  try {
    const hash = await argon.hash(password);
    return hash;
  } catch {
    console.log('Error');
  }
}

async function main() {
  const users = await Promise.all(
    usersDB.map(async (user) => ({
      ...user,
      gender: user.gender === 'male' ? Gender.MALE : Gender.FEMALE,
      password: await hashPassword(user.password),
    })),
  );

  await prisma.user.createMany({ data: users });
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

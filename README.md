# Oiboymovie server

## Installation

To get started, clone this repository on your machine using the following command:

```bash
git clone https://github.com/underfliper/oiboymovie-server.git
```

Afterward, install the required packages:

```bash
npm install
```

Then you need to create an empty postgresql database and create an .env file and paste the following into it:

```bash
DATABASE_URL='postgresql://[username]:[password]@localhost:[port]/[database_name]'
```

Also add these lines to .env file where RECOMMENDATIONS_BASE_URL is the address of the [recommendation service](https://github.com/underfliper/oiboymovie-recommendation) and BASE_APP_URL is the address of the [client part](https://github.com/underfliper/oiboymovie-frontend) of the system.

```bash
AT_SECRET='your_super_secret_at_key'
RT_SECRET='your_super_secret_rt_key'
AT_EXPIRES='15m'
RT_EXPIRES='7d'
RECOMMENDATIONS_BASE_URL='recommendation_service_url'
BASE_APP_URL='client_part_url'
```

After the file has been created and all the necessary variables have been inserted into it, enter the following command in the terminal and wait for the "[SEED] success" message:

```bash
npx prisma migrate reset
```

## Usage

Start the application:

```bash
npm run start
```

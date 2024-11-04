## How-to-Install

### NextJS & Packages Install
npx create-next-app@14.2.4 .

npm i @mui/x-data-grid@7.9.0 @mui/material@5.16.0 @emotion/react@11.11.4 @emotion/styled@11.11.5 lucide-react@0.407.0 numeral@2.0.6 recharts@2.12.7 uuid@10.0.0 axios@1.7.2 --force

npm i -D @types/node@20.14.10 @types/uuid@10.0.0 @types/numeral@2.0.5

npm i -D tw-colors

### Redux Installations

npm i react-redux@9.1.2 @reduxjs/toolkit@2.2.6 dotenv@16.4.5 redux-persist@6.0.0

### Data Modeling

http://drawsql.com/teams/team-3023/diagrams/56-inventorymanagement

### Local DB installations (neon.db)

mkdir server
cd server
npm init -y

npm i prisma@5.16.2 @prisma/client@5.16.2
npm i -D ts-node@10.9.2 typescript@5.5.3 @types/node@20.14.10

npx prisma init

change .env DATABASE_URL to neon.db path

[download assets files]
https://github.com/ed-roh/inventory-management/tree/master/server/assets

[download seed data & seed.ts]
https://github.com/ed-roh/inventory-management/tree/master/server/prisma

npx tsc --init

tsconfig.json
```
"module": "NodeNext",
"moduleResolution": "NodeNext",
"resolveJsonModule": true,
"outDir": "./dist",
```

npx prisma generate
npx prisma migrate dev --name init
npm run seed

### Backend & Packages Installations

npm i rimraf@6.0.1 express@4.19.2 body-parser@1.20.2 cors@2.8.5 dotenv@16.4.5 helmet@7.1.0 morgan@1.10.0 concurrently@8.2.2
npm i -D nodemon@3.1.4 @types/cors@2.8.17 @types/express@4.17.21 @types/morgan@1.9.9

npm run dev
curl http://localhost:8000/hello
[returns Hello World!]
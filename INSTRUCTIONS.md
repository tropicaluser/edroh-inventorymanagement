# INSTRUCTIONS

## How-to-Install

### NextJS & Packages Install

npx create-next-app@14.2.4 .

npm i @mui/x-data-grid@7.9.0 @mui/material@5.16.0 @emotion/react@11.11.4 @emotion/styled@11.11.5 lucide-react@0.407.0 numeral@2.0.6 recharts@2.12.7 uuid@10.0.0 axios@1.7.2 --force

npm i -D @types/node@20.14.10 @types/uuid@10.0.0 @types/numeral@2.0.5

npm i -D tw-colors

### Redux Installations

npm i react-redux@9.1.2 @reduxjs/toolkit@2.2.6 dotenv@16.4.5 redux-persist@6.0.0

### Data Modeling

<http://drawsql.com/teams/team-3023/diagrams/56-inventorymanagement>

### Local DB installations (neon.db)

mkdir server
cd server
npm init -y

npm i prisma@5.16.2 @prisma/client@5.16.2
npm i -D ts-node@10.9.2 typescript@5.5.3 @types/node@20.14.10

npx prisma init

change .env DATABASE_URL to neon.db path

[download assets files]
<https://github.com/ed-roh/inventory-management/tree/master/server/assets>

[download seed data & seed.ts]
<https://github.com/ed-roh/inventory-management/tree/master/server/prisma>

npx tsc --init

tsconfig.json

```bash
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
curl <http://localhost:8000/hello>
[returns Hello World!]

### Dashboard Page

curl <http://localhost:8000/dashboard>

### AWS Networking

Login

1. Create VPC (network setup) - Isolated Cloud Resources

Tab - Your VPCs - Create VPC

```bash
VPC Only
IPv4 CIDR: 10.0.0.0/16
```

Create VPC

Tab - Sunets - Create Subnets

```bash
VPC ID: (new vpc)
Subnet name: public-subnet
Availability Zone: eu-north-1a
IPv4 subnet CIDR block: 10.0.1.0/24
```

Add new subnet

```bash
Subnet name: private-subnet
Availability Zone: eu-north-1b
IPv4 subnet CIDR block: 10.0.2.0/24
```

Create subnet

Tab - Internet gateways - Create Internet gateway

```bash
name tag: vpc-internet-gateway
```

Create Internet gateway

Actions - Attach to VPC - (new vpc) - Attach internet gateway

Tab - Route tables - Create Route table

```bash
name: public-route-table
VPC: (new vpc)
```

Create Route table

Tab - Route tables - Create Route table

```bash
name: private-route-table
VPC: (new vpc)
```

Tab - Route tables - tick "public-route-table"

- Subnet associations - Edit subnet associations
- tick "public-subnet" - Save associations

Tab - Route tables - tick "private-route-table"

- Subnet associations - Edit subnet associations
- tick "private-subnet" - Save associations

Tab - Route tables - tick "public-route-table"

- Routes - Edit routes - Add route

```bash
Destination: 0.0.0.0/0
Target: (internet gateway) - click below - select vpc-internet-gateway
```

Save changes

INFO ONLY:
VPC-NACL (Network Access Control List) - use as firewall between subnets
EC2-Security Groups - Block access

### AWS EC2

#### Create Amazon EC2 (backend - Virtual Servers in the Cloud)

Tab - Instances - Launch instances

```bash
name: ec2-inventorymanagement-backend
key pair: create new key pair
...
name: standard-key, RSA, .pem - Create key pair
...

tick "Allow HTTPS traffic from the internet"
tick "Allow HTTP traffic from the internet"

Edit Network settings
...
VPC: (new vpc)
Subnet: public-subnet
Auto-assign public IP: Enabled
Security group name: sg_public_ec2
Description: sg_public_ec2 created ...
...

```

Launch instance

Tab - Instances (reload) - one entity
tick "entity" - Connect - Connect - (should show bird ascii Amazon Linux 2023)

Complete!

#### 1. Add Setup in Project

- add .gitignore
- add server/ecosystem.config.js
- create repo on github

#### 2. EC2 Pre-requirements

- Install Node via NVM

- Install Git
- With Git upload codebase to Github
- Pull github repo to EC2 instance
- PM2 (Keep running in the background)

Credits to: <https://github.com/yeshwanthlm/nodejs-on-ec2>
In AWS EC2: (can copy lines from repo above)

```bash
sudo su - ## switch to root
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash ## install nvm

. ~/.nvm/nvm.sh ## activate nvm
nvm install node ## install node
node -v ## check node version
npm -v ## check npm version

sudo yum update -y ## update yum
sudo yum install git -y ## install git
git --version ## check git version
git clone <https-repo> ## clone repo

[root@ip-10-0-1-62 ~]# ls ## list files
edroh-inventorymanagement

cd <dir>

[root@ip-10-0-1-62 edroh-inventorymanagement]# ls
INSTRUCTIONS.md  client  server

cd server
npm i
npm run dev
```

#### 3. Check ports in AWS Instance

In AWS - EC2 - Tab - Instances - "select entity" -  Security - port range: "80"

#### 4. Run Server

In AWS EC2 (server folder):

```bash
ctrl + c ## exit server
echo "PORT=80" > .env ## set port
npm run dev
"Server running on port 80"
```

#### 5. Check Server

In AWS - EC2 - Tab - Instances - "select entity" - Details

- Public IPv4 address - "copy address" - change to http://(address)
- paste in browser - show "Cannot GET /"

In AWS EC2:

```bash
Show ""GET / HTTP/1.1" 404 139"
```

#### 6. Install PM2 in EC2

In AWS EC2 (server folder):

```bash
ctrl + c ## exit server
npm i pm2 -g
sudo env PATH=$PATH:$(which node) $(which pm2) startup systemd -u $USER --hp $(eval echo ~$USER) ## config pm2
pm2 start ecosystem.config.js ## start pm2
pm2 status ## check pm2
pm2 monit ## advanced pm2 status
```

In Browser: reload to validate server up

In AWS EC2 (server folder):

```bash
pm2 delete all ## delete all pm2 instances
```

In Browser: reload to validate server down

In AWS EC2 (server folder):

```bash
pm2 start ecosystem.config.js ## start pm2
```

### AWS RDS (Managed Relational Database Service)

#### Create another private subnet

Subnet (VPC feature) - Create subnet

```bash
VPC ID: <new vpc>
subnet name: private-subnet-2
Availability Zone: eu-north-1c
UPv4 subnet CIDR block: 10.0.3.0/24
```

Create subnet

Tab - Databases - "create new database"

Tab - Subnets - tick "private-subnet-2" - Rooute table

- "Edit route table association" -

```bash
Route table ID: private-route-table
```

Save

#### Create RDS Subnet group

RDS (Managed Relational Database Service - Subnet groups - Create DB subnet group

```bash
name: rds-subnet-group
description: rds-subnet-group
VPC: (new vpc)
Availability Zone: eu-north-1b, eu-north-1c
Subnets: eu-north-1b, eu-north-1c
```

#### Create Database

RDS (Managed Relational Database Service - Databases - Create database

```bash
Standard create
Engine type: PostgreSQL
Templates: Free tier

- Settings
DB instance identifier: rds-inventorymanagement
master password: hellomyfriend
confirm password: hellomyfriend
- Storage
click Storage autoscaling
untick "Enable storage autoscaling"

- Connectivity
Virtual private cloud (VPC): (new vpc)
DB subnet group: rds-subnet-group
Public access: No
VPC security group: Create new
...
new VPC security group name: sg_private_rds
Availability Zone: eu-north-1b
...

- Monitoring 
untick "Turn on Performance Insights"

- Database options
initial database name: rds_inventorymanagement_initial
untick "Enable automated backups"
untick "Enable encryption"
```

Create database

#### Get inbound traffic from EC2 to Security group

Tab - Databases - click entity - Connectivity & Security - Security

- VPC security groups - click sg_private_rds

- tick entity (sg_private_rds) - Inbound rules - Edit inbound rules - Add rule

```bash
Type: PostgreSQL
Source: Custom
Search: sg_public_ec2
```

Save rules

#### Validate Security Group in RDS

RDS (Managed Relational Database Service)
Tab - Databases - click entity - scroll to Secutity group rules -
validate "EC2 Security Group - Inbound"

#### Copy RDS value Endpoint & DB Name

Tab - Databases - click entity - scroll to Connectivity & security -
copy Endpoint

Tab - Databases - click entity - click Configuration - copy DB name

#### Connect to EC2 & Add DATABASE_URL

AWS EC2 - Instances - tick entity - Connect - Connect

In AWS EC2:

```bash
sudo su - ## switch to root
ls
cd dir
cd server
nano .env
...
PORT=80
DATABASE_URL="postgresql://postgres:hellomyfriend@<endpoint>:5432/<dbname>?schema=public"
...
pm2 status
pm2 delete all
...
npx prisma generate
npx prisma migrate dev --name init ## validates DATABASE_URL
npm run seed
pm2 start ecosystem.config.js
pm2 monit
```

In Browser: reload to validate server up

add "/dashboard" ## show lots of data

### AWS Amplify (AWS Amplify offers web hosting and app backend services for fullstack developers. - frontend)

AWS Amplify - create new app - Github - next

- add repo - tick "my app is monorepo" - Monorepo root directory: client -  next
- advanced settings - "+ add new" -

Get API Base URL:
AWS EC2 - instances - select entity - copy Public IPv4 address

```bash
NEXT_PUBLIC_API_BASE_URL=http://(ipv4)
```

next - save and deploy - wait (deploying) - open domain in browser (cannot fetch data due to https)

AWS API Gateway (Build, Deploy and Manage APIs)

HTTP API - Build - add integration - HTTP

```bash
GET - http://(ipv4)/dashboard
GET - http://(ipv4)/users
GET - http://(ipv4)/expenses
ANY - http://(ipv4)/products
```

API name: api-inventorymanagement

- Next
- Next - Add stage - stage name: prod - tick auto-deploy
- Next - Create

AWS API Gateway - Tab - Deploy - Stages - select prod - open "Invoke URL"
{
  "message": "Not Found"
}

- add "/products" to view data - - copy url

AWS Amplify - open app - Tab - hosting - environment variables - manage variables

```bash
NEXT_PUBLIC_API_BASE_URL=(paste url)
```

Save - Tab - Overview - click app - redeploy this version

Tab - Overview - open domain in browser (working fine!)

### AWS S3 (Scalable Storage in the Cloud)

click Create bucket 

```bash
bucket name: s3-inventorymanagement-template
untick "Block all public access"
- tick "I acknowledge that current settings"
```

Create bucket

AWS S3 - Buckets - click newly bucket - Upload - select server/assets/all images 
- drag into S3 - Upload - Close
- Permissions - Bucket policy - Edit - 

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::s3-inventorymanagement-template/*"
        }
    ]
}
```

Save Changes

- Objects - click product1.png - open Object URL - image visible (accessable)

#### Edit Client - next.config.mjs

copy Object URL minus "https://" & "/product1.png"
example s3-inventorymanagement-template.s3.eu-north-1.amazonaws.com

```bash
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "paste AWS - Object URL",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

Edit all "images" in src code

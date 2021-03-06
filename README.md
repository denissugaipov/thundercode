## Thundercode

One of projects in my portfolio. Web-application, which quickly generate QR-code with link to info-card. 

Stack: `NextJS / TailwindCSS + SCSS / Prisma + PostgreSQL`

[Demo](https://thundercode-dolsowsky.vercel.app/)

## Usage

Configure .env file: (.env.example exist)

`DATABASE_URL` - path for prisma connection with database
`postgresql://user@localhost:port/database`

`NEXT_PUBLIC_HOST` - URL for 'go' and 'qr' routes, default: [http://localhost:3000](http://localhost:3000)

``NEXT_PASSWORD_SALT`` - Salt for argon2 passsword encryption & descryption
[argon2 hash generator](https://argon2.online/)

Migrate schema to your database:
```bash
yarn prisma migrate dev
#or
npx prisma migrate dev
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


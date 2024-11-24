# Auth.jsの開発テスト

## 概要
django+djoserのば空エンドに対応した仕様で開発

## インストール&セットアップ
基本的に公式のドキュメント通りでいける<a href="https://authjs.dev/getting-started/installation">Installing Auth.js</a>

Installing Auth.js
Start by installing the appropriate package for your framework.

```
npm install next-auth@beta
```

Installing @auth/core is not necessary, as a user you should never have to interact with @auth/core.

Setup Environment
The only environment variable that is mandatory is the AUTH_SECRET. This is a random value used by the library to encrypt tokens and email verification hashes. (See Deployment to learn more). You can generate one via the official Auth.js CLI running:

```
npx auth secret
```
※sudo npx auth secretにしないとできなかった

This will also add it to your .env file, respecting the framework conventions (eg.: Next.js’ .env.local).

Configure
Next, create the Auth.js config file and object. This is where you can control the behaviour of the library and specify custom authentication logic, adapters, etc. We recommend all frameworks to create an auth.ts file in the project. In this file we’ll pass in all the options to the framework specific initalization function and then export the route handler(s), signin and signout methods, and more.

You can name this file whatever you want and place it wherever you like, these are just conventions we’ve come up with.

Start by creating a new auth.ts file at the root of your app with the following content.

./auth.ts(auth.tsはappディレクトリ直下につくること)
```
import NextAuth from "next-auth"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
})
```

Add a Route Handler under /app/api/auth/[...nextauth]/route.ts.
This file must be an App Router Route Handler, however, the rest of your app can stay under page/ if you’d like.

./app/api/auth/[...nextauth]/route.ts
```
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
Add optional Middleware to keep the session alive, this will update the session expiry every time its called.
```


./middleware.ts
```
export { auth as middleware } from "@/auth"
```
Setup Authentication Methods
With that, the basic setup is complete! Next we’ll setup the first authentication methods and fill out that providers array.



## セッションデータカスタム
セッションで扱えるユーザーの値を追加するには以下の手順で

### STEP.1
appディレクトリ直下に"types"ディレクトリを作り、その中に"next-auth.d.ts"ファイルを作る。
その中で、型を定義する






## セッションデータの取り出し
公式Docの"Next.js(Client)"を参照
公式Doc:<a href="https://authjs.dev/getting-started/session-management/get-session">Get Session</a>
//sessionにパラメータを追加する拡張のカスタマイズ
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
 
 
declare module 'next-auth' {
  interface User {
    access_token: string,
    user_id: number
  }
}
 
declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string,
    user_id: number
  }
}
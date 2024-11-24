
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"


//ログイン関数
const login = async ({ email, password }: { email: any; password: any }) => {

  // ログインしてレスポンスからトークンを取得
  const response = await fetch("http://127.0.0.1:8000/api/auth/jwt/create/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    // APIのレスポンスが200番台でない場合、エラーをスロー
    throw new Error("Failed to log in. Please check your credentials.");
  }
  const data = await response.json();

  //トークンを使ってユーザー情報を取得
  const userResponse = await fetch("http://127.0.0.1:8000/api/auth/users/me/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${data.access}`,
    },
  });

  const userdata = await userResponse.json();

  return {
    id: data.user_id,
    email: userdata.email,
    image: "https://cdn.pixabay.com/photo/2018/08/12/16/59/parrot-3601194_1280.jpg",
    name: userdata.name,
    access_token: data.access,//カスタムで追加
    user_id: userdata.id,//カスタムで追加
    refreshToken: data.refresh,
  };
};

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {

        // ログイン関数(自作のログイン処理関数に、emailとパスワードを渡してログインの検証)
        const user = await login({
          email: credentials.email,
          password: credentials.password,
        });
       
        //ユーザー認証失敗
        if (!user) {
          throw new Error("Invalid credentials.")
        }
 
        // ログイン成功した時にsessionで返す値
        return user
      },
    }),
  ],

  //セッションで使えるユーザーのパラメーターを追加するカスタマイズ
  //next-auth.d.tsで追加のパラメーターの型を定義している
  callbacks: {
    async jwt({ token, user }) {
      // userが存在する場合、保存するJWTにcompanyIdを追加する
      if (user) {
        token.user_id = user.user_id
        token.access_token = user.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.user.user_id = token.user_id
      session.user.access_token = token.access_token
      return session
    },
  },


})







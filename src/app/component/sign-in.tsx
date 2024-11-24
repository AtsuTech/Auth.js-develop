// import { signIn } from "@/app/auth"
 
// export function SignInForm() {
//   return (
//     <form
//       action={async (formData) => {
//         "use server"
//         await signIn("credentials", formData,{callbackUrl: "/dashboard"})
//       }}
//       className="w-full space-y-2 p-4 bg-purple-300"
//     >
//         <div className="w-full">
//             <label className="block w-full" htmlFor="">Email</label>
//             <input name="email" type="email" className="w-full p-2" />
//         </div>
//         <div className="w-full">
//             <label className="block w-full" htmlFor="">Password</label>
//             <input name="password" type="password" className="w-full p-2" />
//         </div>
//         <button className="p-5 bg-stone-950 text-slate-50">
//             Sign In
//         </button>
//     </form>
//   )
// }



/////
"use client";

import { signIn } from "next-auth/react";

const SignInForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Credentials providerを使ったサインイン
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard", // ログイン後のリダイレクト先
    });

    if (!result?.ok) {
      console.error("Login failed:", result?.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-2 p-4 bg-purple-300"
    >
      <div className="w-full">
        <label className="block w-full" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full p-2"
          required
        />
      </div>
      <div className="w-full">
        <label className="block w-full" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="p-5 bg-stone-950 text-slate-50"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;

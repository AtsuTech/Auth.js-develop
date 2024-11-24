//import { SignInForm } from "../component/sign-in";
import SignInForm from "../component/sign-in";
import { auth } from "../auth"

export default async function Home() {
    const session = await auth()
 
    //if (!session?.user) return null
    console.log(session)
    
    return (
        <div className="flex items-center justify-center h-[calc(100vh-80px)] px-10">
            {/* <h1>ログイン{session.user.email}/{session.user.image}</h1> */}
            <div className="w-96">
                <SignInForm />    
            </div>         
        </div>
    );
}

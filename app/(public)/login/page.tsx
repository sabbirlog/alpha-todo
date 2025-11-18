import AuthBanner from "@/components/ui/AuthBanner";
import LoginForm from "@/forms/LoginForm";
import generateDynamicMetadata from "@/utils/metaDataUtils";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> =>
    await generateDynamicMetadata({ title: "Login" });

const Login = () => {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-5">
                <AuthBanner 
                image="/login-image.png"
                />
            </div>
            <div className="col-span-7">
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;
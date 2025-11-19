import AuthBanner from "@/components/ui/AuthBanner";
import SignUpForm from "@/forms/SignUpForm";
import generateDynamicMetadata from "@/utils/metaDataUtils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ title: "Sign Up" });
}

const SignUp = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-5">
        <AuthBanner
          image="/sign-up-image.png"
        />
      </div>
      <div className="col-span-7">
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUp;

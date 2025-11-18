import { redirect } from "next/navigation";

const Page = () => {
  redirect("/dashboard");
  return null;
};

export default Page;

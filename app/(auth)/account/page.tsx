import generateDynamicMetadata from "@/utils/metaDataUtils";
import { Metadata } from "next";
import AccountInfoWrapper from "./AccountInfoWrapper";

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ title: "Account Information" });
}

const AccountInformation = () => {
  return (
    <AccountInfoWrapper />
  )
}

export default AccountInformation;

import generateDynamicMetadata from "@/utils/metaDataUtils";
import { Metadata } from "next";
import AccountInfoWrapper from "./AccountInfoWrapper";

export const generateMetadata = async (): Promise<Metadata> =>
    await generateDynamicMetadata({ title: "Account Information" });

const AccountInformation = () => {
  return (
    <AccountInfoWrapper />
  )
}

export default AccountInformation
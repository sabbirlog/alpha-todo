import generateDynamicMetadata from "@/utils/metaDataUtils";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> =>
    await generateDynamicMetadata({ title: "Dashboard" });

const Dashboard = () => {
    return (
        <div>Welcome to dashboard</div>
    )
}

export default Dashboard
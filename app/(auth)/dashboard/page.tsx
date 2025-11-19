import generateDynamicMetadata from "@/utils/metaDataUtils";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata({ title: "Dashboard" });
}

const Dashboard = () => {
    return (
        <div>Welcome to dashboard</div>
    )
}

export default Dashboard;

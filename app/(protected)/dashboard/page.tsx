import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
  title:
    "HLS Group | Dashboard",
};

export default function DashboardPage() {
  return (
    <>
      <DefaultLayout>
        <Dashboard/> 
      </DefaultLayout>
    </>
  );
}

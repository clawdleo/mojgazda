import { getAllCompanies } from "@/lib/demo-data";
import CompanyContent from "./CompanyContent";

export function generateStaticParams() {
  return getAllCompanies().map((c) => ({ slug: c.slug }));
}

export default function CompanyPage() {
  return <CompanyContent />;
}

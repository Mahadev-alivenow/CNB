import TruthAboutDrugs from "./TruthAboutDrugs";
import { fetchDrugPosts } from "@/actions/wp.action";

export const revalidate = 3600; // Revalidate every hour

export default async function TruthAboutDrugsPage() {
  try {
    const drugPosts = await fetchDrugPosts();
    if (drugPosts.length === 0) {
      console.warn(
        "No drug posts fetched. This might be due to an error or empty response."
      );
    }
    return <TruthAboutDrugs drugPosts={drugPosts} />;
  } catch (error) {
    console.error("Error in TruthAboutDrugsPage:", error);
    // You might want to render an error component here
    return (
      <div>
        An error occurred while fetching drug posts. Please try again later.
      </div>
    );
  }
}

// This file will export all the components that show stats
import { UserCount, AuthorCount } from "@/components/pages/dashboardPage";

export default function dashboardStats() {
  return (
    <>
      <h1>Stats for today</h1>
      <UserCount />
      <AuthorCount />
    </>
  );
}

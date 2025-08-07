import { Button } from "@/components/ui/button"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Narrative Nexus`,
  description : `Your go to library for Romance Novels`
}

export default function Home() {
  return (
    <>
      <h1>Narrative Nexus</h1>
      <Button variant={"secondary"} size={"lg"} >Hello Narratives</Button>
    </>);
}

import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectsExplorer } from "@/components/map/ProjectsExplorer";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Project Map",
  description:
    "An interactive map of Petron's builds nationwide: fuel and service stations, retail centers, and government work. Click any pin for the case study.",
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const [projects, sp] = await Promise.all([getProjects(), searchParams]);

  return (
    <>
      <PageHero
        compact
        image="/images/civil.png"
        alt="Heavy civil infrastructure work on a Petron federal project"
        eyebrow="The proof is on the map"
        title={<>Building across <span className="text-amber">the U.S.</span></>}
      >
        Every pin is a real Petron build. Filter by type or client, then open any project for
        its scope, client, and photos. National reach, in one glance.
      </PageHero>
      <ProjectsExplorer projects={projects} initialSlug={sp.project} />
    </>
  );
}

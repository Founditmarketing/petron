import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectsExplorer } from "@/components/map/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Project Map — Building Across the U.S.",
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
      <section className="relative overflow-hidden border-b border-line-soft px-5 pb-8 pt-24 sm:px-8">
        <div className="bp-grid absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow mb-3">The proof is on the map</p>
          <h1 className="font-display text-5xl uppercase leading-[0.9] text-text sm:text-7xl">
            Building across <span className="text-amber">the U.S.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-dim sm:text-base">
            Every pin is a real Petron build. Filter by type or client, then open any project for
            its scope, client, and photos. National reach, in one glance.
          </p>
        </div>
      </section>
      <ProjectsExplorer projects={projects} initialSlug={sp.project} />
    </>
  );
}

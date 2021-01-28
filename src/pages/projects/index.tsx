import Page from "@/components/Page";
import projects from "@/data/projects.json";
import Link from "next/link";
import React from "react";

const ProjectsIndex: React.FC = () => {
  return (
    <>
      <Page title="Projects" description="List of personal development projects">
        <div className="space-y-6 flex flex-col">
          <h1 className="flex justify-center font-bold text-2xl">Projects</h1>
          <div className="space-y-2 flex flex-col">
            {projects.map((project, index) => (
              <Link key={index} href={`/projects/${project.name}`}>
                <a className="flex justify-center mx-auto sm:transform sm:transition-transform sm:ease-in-out sm:duration-500 sm:hover:scale-125">
                  {project.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </Page>
    </>
  );
};

export default ProjectsIndex;

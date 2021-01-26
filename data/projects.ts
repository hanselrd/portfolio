export interface Project {
  title: string;
  slug: string;
  description: string;
  language: string;
}

const projects: Project[] = [
  {
    title: "Portfolio",
    slug: "portfolio",
    description: "Personal website rewritten using React",
    language: "TypeScript",
  },
  {
    title: "Phansar",
    slug: "phansar",
    description: "3D Multiplayer RPG with a modern stack",
    language: "C++",
  },
];

export default projects;

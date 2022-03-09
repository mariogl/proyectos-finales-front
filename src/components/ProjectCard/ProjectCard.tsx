import Project from "../../types/project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({
  project: { id, name, repo, student },
}: ProjectCardProps): JSX.Element => {
  return (
    <div className="project-card">
      <h3>{name}</h3> <span className="student">{student}</span>
    </div>
  );
};

export default ProjectCard;

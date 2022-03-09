import axios from "axios";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import Project from "../../types/project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({
  project: { id, name, repo, student },
}: ProjectCardProps): JSX.Element => {
  const githubApiUrl = process.env.REACT_APP_GITHUB_API as string;

  const [infoRepos, setInfoRepos] = useState<{
    front: any;
    back: any;
  }>({ front: null, back: null });

  useEffect(() => {
    (async () => {
      const promiseFront = axios.get(
        `${githubApiUrl}repos/isdi-coders-2022/${repo.front}`
      );
      const promiseBack = axios.get(
        `${githubApiUrl}repos/isdi-coders-2022/${repo.back}`
      );
      const [{ data: repoFront }, { data: repoBack }] = await Promise.all([
        promiseFront,
        promiseBack,
      ]);
      setInfoRepos({ front: repoFront, back: repoBack });
    })();
  }, [githubApiUrl, repo.back, repo.front]);

  return (
    <div className="project-card">
      <h3>{name}</h3> <span className="student">{student}</span>
      <h4>Front</h4>
      <p>
        Último commit:{" "}
        {infoRepos.front && (
          <ReactTimeAgo
            date={new Date(infoRepos.front.pushed_at)}
            locale="es"
          />
        )}
      </p>
      <h4>Back</h4>
      <p>
        Último commit:{" "}
        {infoRepos.back && (
          <ReactTimeAgo date={new Date(infoRepos.back.pushed_at)} locale="es" />
        )}
      </p>
    </div>
  );
};

export default ProjectCard;

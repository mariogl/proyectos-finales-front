import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import Project from "../../types/project";
import { Octokit } from "octokit";

const StyledArticle = styled.article<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: #fff;
  padding: 10px;
  font-size: 12px;
  position: relative;
`;

const StyledStudent = styled.span`
  font-size: 1.1em;
`;

const StyledTitle = styled.h3`
  font-size: 1.2em;
`;

const StyledTutor = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
  border: 1px solid #fff;
  border-radius: 50%;
  display: inline-block;
  width: 20px;
  text-align: center;
`;
interface ProjectCardProps {
  project: Project;
  backgroundColor: string;
}

const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });

const ProjectCard = ({
  project: { id, name, repo, tutor, student },
  backgroundColor,
}: ProjectCardProps): JSX.Element => {
  const [infoRepoFront, setInfoRepoFront] = useState<any>();
  const [infoRepoBack, setInfoRepoBack] = useState<any>();

  useEffect(() => {
    (async () => {
      const lastCommitFrontPromise = octokit.request(
        `GET /repos/{owner}/{repo}/commits`,
        {
          owner: process.env.REACT_APP_GITHUB_OWNER as string,
          repo: repo.front,
          per_page: 1,
        }
      );
      const lastCommitBackPromise = octokit.request(
        `GET /repos/{owner}/{repo}/commits`,
        {
          owner: process.env.REACT_APP_GITHUB_OWNER as string,
          repo: repo.back,
          per_page: 1,
        }
      );

      const [
        {
          data: [repoFront],
        },
        {
          data: [repoBack],
        },
      ] = await Promise.all([lastCommitFrontPromise, lastCommitBackPromise]);
      setInfoRepoFront(repoFront);
      setInfoRepoBack(repoBack);
    })();
  }, [repo.back, repo.front]);

  return (
    <StyledArticle backgroundColor={backgroundColor}>
      <StyledStudent>{student}</StyledStudent>
      <StyledTitle>{name}</StyledTitle>
      <h4>Front</h4>
      <p>
        Último commit:{" "}
        {infoRepoFront && (
          <ReactTimeAgo
            date={new Date(infoRepoFront.commit.author?.date)}
            locale="es"
          />
        )}
      </p>
      <h4>Back</h4>
      <p>
        Último commit:{" "}
        {infoRepoBack && (
          <ReactTimeAgo
            date={new Date(infoRepoBack.commit.author?.date)}
            locale="es"
          />
        )}
      </p>
      <StyledTutor>{tutor.name.charAt(0).toUpperCase()}</StyledTutor>
    </StyledArticle>
  );
};

export default ProjectCard;

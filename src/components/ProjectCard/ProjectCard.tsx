import { useEffect, useState } from "react";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import Project from "../../types/project";
import trelloLogo from "../../img/trello.svg";
import { Octokit } from "@octokit/rest";
import axios from "axios";

const StyledArticle = styled.article<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: #fff;
  padding: 10px;
  font-size: 12px;
  position: relative;
  .danger {
    background-color: red;
  }
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

const StyledLogo = styled.span`
  position: absolute;
  right: 10px;
  top: 40px;
`;

interface ProjectCardProps {
  project: Project;
  backgroundColor: string;
}

const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });

const ProjectCard = ({
  project: { id, name, repo, tutor, student, trello, sonarqubeKey },
  backgroundColor,
}: ProjectCardProps): JSX.Element => {
  const [infoRepoFront, setInfoRepoFront] = useState<any>(null);
  const [infoRepoBack, setInfoRepoBack] = useState<any>(null);
  const [infoSonarFront, setInfoSonarFront] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const lastCommitFrontPromise = octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: process.env.REACT_APP_GITHUB_OWNER as string,
          repo: repo.front,
          per_page: 1,
        }
      );
      const lastCommitBackPromise = octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: process.env.REACT_APP_GITHUB_OWNER as string,
          repo: repo.back,
          per_page: 1,
        }
      );
      const lastPullRequestFrontPromise = octokit.request(
        "GET /repos/{owner}/{repo}/pulls",
        {
          owner: process.env.REACT_APP_GITHUB_OWNER as string,
          repo: repo.front,
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
        {
          data: [pullRequestsFront],
        },
      ] = await Promise.all([
        lastCommitFrontPromise,
        lastCommitBackPromise,
        lastPullRequestFrontPromise,
      ]);
      setInfoRepoFront({ commits: repoFront, pullRequests: pullRequestsFront });
      setInfoRepoBack({ commits: repoBack, pullRequests: pullRequestsFront });
    })();
  }, [repo.back, repo.front]);

  useEffect(() => {
    if (sonarqubeKey) {
      (async () => {
        const {
          data: { codeSmells, coverage },
        } = await axios.get(
          `${process.env.REACT_APP_API_URL}sonardata?projectKey=${sonarqubeKey}`,
          {
            headers: {
              authorization: `Bearer ${process.env.REACT_APP_TEMPORARY_JWT}`,
            },
          }
        );
        setInfoSonarFront({ codeSmells: +codeSmells, coverage: +coverage });
      })();
    }
  }, [sonarqubeKey]);

  return (
    <StyledArticle backgroundColor={backgroundColor}>
      <StyledStudent>{student}</StyledStudent>
      <StyledTitle>{name}</StyledTitle>
      <h4>Front</h4>
      <p>
        Último commit:{" "}
        {infoRepoFront && infoRepoFront.commits && (
          <ReactTimeAgo
            date={new Date(infoRepoFront.commits.commit.author?.date)}
            locale="es"
          />
        )}
      </p>
      <p>
        Última PR abierta:{" "}
        {infoRepoFront &&
          infoRepoFront.pullRequests &&
          infoRepoFront.pullRequests.updated_at && (
            <ReactTimeAgo
              date={new Date(infoRepoFront.pullRequests.updated_at)}
              locale="es"
              className={`${
                new Date().getTime() -
                  new Date(infoRepoFront.pullRequests.updated_at).getTime() >
                60 * 60 * 1000
                  ? "danger"
                  : ""
              }`}
            />
          )}
      </p>
      {infoSonarFront && (
        <>
          <p>Code smells: {infoSonarFront.codeSmells}</p>
          <p>Coverage: {infoSonarFront.coverage}%</p>
        </>
      )}
      <h4>Back</h4>
      <p>
        Último commit:{" "}
        {infoRepoBack && (
          <ReactTimeAgo
            date={new Date(infoRepoBack.commits.commit.author?.date)}
            locale="es"
          />
        )}
      </p>
      <StyledLogo>
        <a href={trello} target="_blank" rel="noreferrer">
          <img src={trelloLogo} alt="Trello" height="20" />
        </a>
      </StyledLogo>
      <StyledTutor>{tutor.name.charAt(0).toUpperCase()}</StyledTutor>
    </StyledArticle>
  );
};

export default ProjectCard;

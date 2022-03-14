import { SyntheticEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrash, FaSatelliteDish, FaRedoAlt } from "react-icons/fa";
import ReactTimeAgo from "react-time-ago";
import Project from "../../types/project";
import trelloLogo from "../../img/trello.svg";
import githubLogo from "../../img/github-icon.svg";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteProjectThunk } from "../../redux/thunks/projectsThunks";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const StyledArticle = styled.article<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: #fff;
  padding: 10px;
  padding-bottom: 0;
  font-size: 12px;
  position: relative;
  .danger {
    background-color: red;
  }
`;

const StyledFooter = styled.div`
  background-color: #0002;
  height: 40px;
  padding: 0 10px;
  margin-left: -10px;
  margin-right: -10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  a {
    color: inherit;
    margin-left: 10px;
  }
  a:hover {
    opacity: 0.8;
  }
  svg {
    font-size: 20px;
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
  const [infoSonarBack, setInfoSonarBack] = useState<any>(null);

  const [loadingSonar, setLoadingSonar] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (sonarqubeKey.front) {
      (async () => {
        const {
          data: { codeSmells, coverage },
        } = await axios.get(
          `${process.env.REACT_APP_API_URL}projects/sonardata?projectKey=${sonarqubeKey.front}`,
          {
            headers: {
              authorization: `Bearer ${process.env.REACT_APP_TEMPORARY_JWT}`,
            },
          }
        );
        setInfoSonarFront({ codeSmells: +codeSmells, coverage: +coverage });
      })();
    }
  }, [sonarqubeKey.front]);

  useEffect(() => {
    if (sonarqubeKey.back) {
      (async () => {
        const {
          data: { codeSmells, coverage },
        } = await axios.get(
          `${process.env.REACT_APP_API_URL}projects/sonardata?projectKey=${sonarqubeKey.back}`,
          {
            headers: {
              authorization: `Bearer ${process.env.REACT_APP_TEMPORARY_JWT}`,
            },
          }
        );
        setInfoSonarBack({ codeSmells: +codeSmells, coverage: +coverage });
      })();
    }
  }, [sonarqubeKey.back]);

  const onDelete = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(deleteProjectThunk(id, navigate));
  };

  const onScan = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoadingSonar(true);
    await axios.post(
      `${process.env.REACT_APP_API_URL}projects/sonarscanner`,
      {
        projectId: id,
      },
      {
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_TEMPORARY_JWT}`,
        },
      }
    );
    setLoadingSonar(false);
  };

  return (
    <StyledArticle backgroundColor={backgroundColor}>
      <StyledStudent>{student}</StyledStudent>
      <StyledTitle>{name}</StyledTitle>
      <h4>
        Front{" "}
        <a
          href={`${process.env.REACT_APP_GIT_REPO_PREFIX}${repo.front}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubLogo} alt="GitHub" height="20" />
        </a>
      </h4>
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
      <h4>
        Back{" "}
        <a
          href={`${process.env.REACT_APP_GIT_REPO_PREFIX}${repo.back}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={githubLogo} alt="GitHub" height="20" />
        </a>
      </h4>
      <p>
        Último commit:{" "}
        {infoRepoBack && (
          <ReactTimeAgo
            date={new Date(infoRepoBack.commits.commit.author?.date)}
            locale="es"
          />
        )}
      </p>
      {infoSonarBack && (
        <>
          <p>Code smells: {infoSonarBack.codeSmells}</p>
          <p>Coverage: {infoSonarBack.coverage}%</p>
        </>
      )}
      <StyledLogo>
        <a href={trello} target="_blank" rel="noreferrer">
          <img src={trelloLogo} alt="Trello" height="20" />
        </a>
      </StyledLogo>
      <StyledTutor>{tutor.name.charAt(0).toUpperCase()}</StyledTutor>
      <StyledFooter>
        {loadingSonar ? (
          <Loading />
        ) : (
          <a href="sonarscanner" onClick={onScan}>
            <FaSatelliteDish />
          </a>
        )}
        <a href="pull">
          <FaRedoAlt />
        </a>
        <a href="delete" onClick={onDelete}>
          <FaTrash />
        </a>
      </StyledFooter>
    </StyledArticle>
  );
};

export default ProjectCard;

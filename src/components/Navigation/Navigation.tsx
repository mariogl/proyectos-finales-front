import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { filterProjectsAction } from "../../redux/actions/projectsActionCreators";
import RootState from "../../types/store";

const StyledButtonGroup = styled(ButtonGroup)`
  margin-bottom: 20px;
  button {
    background-color: #444;
    border-color: #444;
    &.active {
      background-color: #111;
      border-color: #111;
    }
  }
`;

const Navigation = (): JSX.Element => {
  const dispatch = useDispatch();
  const actualFilter = useSelector(
    (state: RootState) => state.projects.filterBy
  );

  const filter = (tutorName: string, event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(filterProjectsAction(tutorName));
  };

  return (
    <nav>
      <StyledButtonGroup size="sm">
        <Button
          onClick={(event) => filter("Pia", event)}
          active={actualFilter === "Pia"}
        >
          Pia
        </Button>
        <Button
          onClick={(event) => filter("Menchu", event)}
          active={actualFilter === "Menchu"}
        >
          Menchu
        </Button>
        <Button
          onClick={(event) => filter("Oleguer", event)}
          active={actualFilter === "Oleguer"}
        >
          Oleguer
        </Button>
        <Button
          onClick={(event) => filter("", event)}
          active={actualFilter === ""}
        >
          Todos
        </Button>
      </StyledButtonGroup>
    </nav>
  );
};

export default Navigation;

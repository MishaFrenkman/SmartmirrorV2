import React from "react";
import styled from "styled-components";
import DateTime from "./DateTime";
import Departures from "./Departures";

const StyledApp = styled.div`
  padding: 5px;
  display: flex;
  flex-flow: column nowrap;

  .middle {
    display: flex;
  }

  .dummy {
    width: 100%;
    flex: 1;
  }
`;

function App() {
  return (
    <StyledApp id="Main">
      <DateTime />
      <div className="middle">
        <div className="dummy" />
        <Departures />
      </div>
    </StyledApp>
  );
}

export default App;

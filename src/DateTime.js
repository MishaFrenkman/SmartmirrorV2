import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledDateTime = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
`;

function DateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const date = now.toLocaleDateString().replace(/\//g, ".");
  const time = now.toLocaleTimeString().substr(0, 5);

  return (
    <StyledDateTime>
      <span>{time}</span>
      <span>{date}</span>
    </StyledDateTime>
  );
}

export default DateTime;

import React from "react";
import styled from "styled-components";

const Time = ({ timeInterval }) => {
  return (
    <TimeBlock>
      <span className="time">
        {timeInterval.time}
        {timeInterval.unit} 전
      </span>
    </TimeBlock>
  );
};

const TimeBlock = styled.section`
  padding: 0 16px;
  font-size: 10px;
  color: lightgrey;
  margin-top: 4px;
`;

export default Time;

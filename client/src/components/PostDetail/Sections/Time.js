import React from "react";
import styled from "styled-components";
import palette from "../../../utils/palette";

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
  color: ${palette.gray[6]};
  margin: 4px 0;
`;

export default Time;

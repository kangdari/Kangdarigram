import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Tag = ({ tag }) => {
  return <TagLink to={`/explore/tag/${tag}`}>#{tag}</TagLink>;
};

const TagLink = styled(Link)`
  color: #00376b;
  padding: 2px;
`;
export default Tag;

import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface FilterComponentProps {
  filterText: string;
  onFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const Input = styled.input.attrs((props: { small?: boolean }) => ({
  type: "text",
  size: props.small ? 5 : undefined
}))`
  height: 38px;
  width: 300px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  box-shadow: 2px 2px 5px grey;
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 38px;
  width: 40px;
  border-color: transparent;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 5px grey;
`;

const SearchComponent: React.FC<FilterComponentProps> = ({
  filterText,
  onFilter,
  onClear
}) => (
  <>
  <div style={{  display:"flex", margin:"15px" }}>
    <Input
      id="search"
      type="text"
      placeholder="Search table data..."
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton onClick={onClear}>X</ClearButton>
    </div>
  </>
);

export default SearchComponent;

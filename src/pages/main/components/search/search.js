import PropTypes from 'prop-types';
import { Input, Icon } from "../../../../components";
import styled from "styled-components"

const SearchContainer = ({ className, searchPharase, onChange }) => {
  return (
    <div className={className}>
      <Input
        value={searchPharase}
        placeholder="Поиск по заголовкам..."
        onChange={onChange} />

      <Icon
        inactive={true}
        id="fa-search"
        margin="0 7px 0 0"
        size="21px"
      />
    </div>
  )
}

export const Search = styled(SearchContainer)`
  display: flex;
  position: relative;
  width: 340px;
  height: 40px;
  margin: 40px auto 0;

  & > div {
    position: absolute;
    right: 9px;
    top: 3px;
  }

  & > input {
    padding: 10px 35px 10px 10px;
  }
`;

Search.propTypes = {
  searchPharase: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
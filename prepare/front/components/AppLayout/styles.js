import styled, { createGlobalStyle } from 'styled-components';
import { Input } from 'antd';

export const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

export const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left:0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-left: 0 !important;
  }
`;

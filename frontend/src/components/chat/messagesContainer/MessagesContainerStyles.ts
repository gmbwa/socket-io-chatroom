import styled from 'styled-components';

export const Container = styled.div`
  max-height: 100vh;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: inline-flex;
  flex-flow: column;
  align-items: flex-start;
`;

export const MessageBox = styled.div`
  background-color: #e0f7fa;
  border-radius: 8px;
  padding: 10px;
  margin: 5px 0;
  word-wrap: break-word;
  display: inline-block;
  border:1px solid gray;
`;

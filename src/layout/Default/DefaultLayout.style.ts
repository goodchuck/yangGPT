import styled from 'styled-components';

const StyledDefaultLayout = styled.div`
  display: flex;
  flex-direction: column;

  .defaultlayout__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 10px;
    padding: 20px;
  }
`;

export default StyledDefaultLayout;

import styled from "styled-components";

export const StyledConverSationRow = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    p {
        max-width: 90%;
    }
    &.me {
        justify-content: flex-end;
    }
`;

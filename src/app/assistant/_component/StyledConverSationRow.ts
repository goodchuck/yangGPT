import styled from "styled-components";

export const StyledConverSationRow = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    p {
        max-width: 90%;
    }
    &.me {
        justify-content: flex-end;
    }
`;

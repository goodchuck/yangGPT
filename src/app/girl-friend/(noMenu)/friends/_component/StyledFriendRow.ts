import styled from "styled-components";

export const StyledFriendRow = styled.li`
    > div {
        width: 100%;
        display: flex;
    }
    .value-wrapper {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
        & .left {
        }
        & .right {
            display: flex;
        }
    }
`;

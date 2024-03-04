import styled from "styled-components";

export const StyledMainContainer = styled.div`
    /* position: absolute; */
    /* top: 100px;
    bottom: 5px;
    left: 0px; */
    width: 100%;
    overflow: auto;
    border: 1px solid gray;

    .division {
        border: 1px solid gray;
        /* height:1px; */
    }

    .friends {
        padding: 20px;
        > p {
            padding-left: 20px;
            margin: 0;
        }
    }

    & ul {
        list-style: none;
        padding: 0;
    }

    & li {
        position: relative;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-top: 20px;
        padding-right: 500px;
        /* padding: 0px 100px 0px 0px; */
        & div {
            display: flex;
            justify-content: center;
            /* align-items: center; */
            /* gap: 20px; */
            & div {
                display: flex;
                flex-direction: column;
                padding-left: 10px;
            }
        }

        & img {
            /* position: absolute; */
            top: 18px;
            /* left: 120px; */
            width: 45px;
            height: 45px;
            border-radius: 15px;
            cursor: pointer;
        }
        & p {
            color: #707070;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            min-height: 19px;
            font-size: 12px;
            margin: 0;
            & b {
                color: #000;
                font-weight: bold;
                font-size: 14px;
            }
        }
        &:hover {
            background-color: #eaeaeb;
        }
    }
`;

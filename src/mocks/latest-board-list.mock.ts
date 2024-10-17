import { BoardListItem } from "types/interface";
import hani from 'assets/image/hani.jpeg'
import hani2 from 'assets/image/hani2.jpg'
import newJeans from 'assets/image/newjeans.jpeg'

const latestBoardListMock: BoardListItem[] = [
    {
        boardNumber: 1,
        title: "이것은 제목입니다 -- 1",
        content: "이것은 내용입니다 --1",
        boardTitleImage: newJeans,
        favoriteCount: 0,
        commentCount: 0,
        viewCount: 0,
        writeDatetime: "2024.10.17 15:22:28",
        writerNickname: "나는하루",
        writerProfileImage: hani,
    },
    {
        boardNumber: 1,
        title: "이것은 제목입니다 -- 2",
        content: "이것은 내용입니다 --2",
        boardTitleImage: null,
        favoriteCount: 0,
        commentCount: 0,
        viewCount: 0,
        writeDatetime: "2024.10.17 15:22:28",
        writerNickname: "나는하루",
        writerProfileImage: null,
    },
    {
        boardNumber: 1,
        title: "이것은 제목입니다 -- 3",
        content: "이것은 내용입니다 --3",
        boardTitleImage: null,
        favoriteCount: 0,
        commentCount: 0,
        viewCount: 0,
        writeDatetime: "2024.10.17 15:22:28",
        writerNickname: "나는하루",
        writerProfileImage: null,
    },
    {
        boardNumber: 1,
        title: "이것은 제목입니다 -- 4",
        content: "이것은 내용입니다 --4",
        boardTitleImage: null,
        favoriteCount: 0,
        commentCount: 0,
        viewCount: 0,
        writeDatetime: "2024.10.17 15:22:28",
        writerNickname: "나는하루",
        writerProfileImage: null,
    }
];

export default latestBoardListMock;
import hani from 'assets/image/hani.jpeg';
import { CommentListItem } from 'types/interface';

const commentListMock: CommentListItem[] = [
    {
        nickname: "나는하루",
        profileImage: hani,
        writeDatetime: "5분전",
        content: '이것은 내용입니다이것은 내용입니다이것은 내용입니다이것은 내용입니다이것은 내용입니다'
    },
    {
        nickname: "나는하루",
        profileImage: null,
        writeDatetime: "5분전",
        content: '이것은 내용입니다이것은 내용입니다이것은 내용입니다이것은 내용입니다이것은 내용입니다'
    },
    {
        nickname: "나는하루",
        profileImage: null,
        writeDatetime: "5분전",
        content: '이것은 내용입니다이것은 내용입니다이것은 내용입니다이것은 내용입니다이것은 내용입니다'
    }
]

export default commentListMock;
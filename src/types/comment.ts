export interface Author {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  cardId: number;
  author: Author;
}

export interface GetCommentsResponse {
  comments: Comment[];
  cursorId: number;
}

export interface GetCommentsRequestParams {
  cardId: number;
  size: number;
  cursorId?: number;
}

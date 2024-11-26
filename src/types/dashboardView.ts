import { DebouncedFunc } from 'lodash';

export interface CardAssignee {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: CardAssignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetCardsResponse {
  cursorId: number;
  totalCount: number;
  cards: Card[];
}

export interface Columns {
  title: string;
  color: string;
  totalCount: number;
  id: number;
  items: Card[];
  loadMoreData: DebouncedFunc<(columnId: number) => Promise<void>>;
}

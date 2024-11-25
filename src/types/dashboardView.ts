import { DebouncedFunc } from 'lodash';

export interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface CardData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardResponse {
  cursorId: number;
  totalCount: number;
  cards: CardData[];
}

export interface ColumnData {
  title: string;
  color: string;
  totalCount: number;
  id: number;
  items: CardData[];
  loadMoreData: DebouncedFunc<(columnId: number) => Promise<void>>;
}

import { DebouncedFunc } from 'lodash';

export interface CardAssignee {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

export interface Cards {
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
  cards: Cards[];
}

export interface Columns {
  id: number;
  title: 'string';
}

export interface DashboardColumn extends Columns {
  items: Cards[];
  loadMoreData: DebouncedFunc<(columnId: number) => Promise<void>>;
  color: string;
  totalCount: number;
}

export interface PostColumnRequest {
  title: string;
}

export interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

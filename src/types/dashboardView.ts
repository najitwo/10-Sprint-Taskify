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

export interface GetCardResponse {
  cursorId: number;
  totalCount: number;
  card: Card[];
}

export interface ColumnFormValue {
  id: number;
  title: string;
}

export interface DashboardColumn extends ColumnFormValue {
  items: Card[];
  loadMoreData: DebouncedFunc<(columnId: number) => Promise<void>>;
  color: string;
  totalCount: number;
}

export interface Column {
  id: number;
  title: string;
  teamId: string;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

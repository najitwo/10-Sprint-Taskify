import axiosInstance from './axiosInstance';
import { GetDashboardsRequestParams } from '../_types/dashboards';

export const dashboardsApi = {
  // getMyDashboards: (params: GetDashboardsRequestParams) =>
  //   axiosInstance.get('/dashboards'),
  // upcoming: () => axiosInstance.get('movie/upcoming'),

  getMyDashboards: (params: GetDashboardsRequestParams) =>
    axiosInstance.get('/dashboards', {
      params,
    }),

  // 첫번째 인자 url 두번째에 쿼리 prams를 넘겨준다.
  // searchMovie: (terms) =>
  //   axiosInstance.get(`search/movie`, {
  //     params: {
  //       query: terms,
  //     },
  //   }),
};

import { get } from "../request";
import type { PageResultSet } from "../request";
import { getUserInfo } from "../auth/user";

export type BangumiProps = Record<string, any>;
export const getView = async (id?: string | number): Promise<Record<string, any>> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const data = await get<Record<string, any>, any>(`/video/bangumi/view/${id}`);
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export const getRecords = async (keyword: string, pageNum: number, pageSize: number): Promise<PageResultSet> => {
  try {
    const { id: uid } = await getUserInfo();
    const { total, records } = await get<PageResultSet, any>('/video/bangumi/page', {
      params: {
        key: keyword,
        page_num: pageNum,
        page_size: pageSize,
        uid,
      }
    });
    return Promise.resolve({total, records});
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getRecordsWithCustomParams = async (queryParams: Record<string, any>): Promise<{total: number, records: object[]}> => {
  try {
    const { id: uid } = await getUserInfo();
    const { total, records } = await get<{total: number, records: object[]}, any>('/video/bangumi/page', {
      params: {uid, ...queryParams}
    });
    return Promise.resolve({total, records});
  } catch (err: any) {
    return Promise.reject(err);
  }
}
// Bangumi Type
export const getTypeList = async (channel_id: string): Promise<Record<string, any>[]> => {
  try {
    const { id: uid } = await getUserInfo();
    const data = await get(`/video/bangumi_type`, { params: { uid, channel_id } });
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
// Bangumi Grade
export const getGradeList = async (channel_id: string): Promise<Record<string, any>[]> => {
  try {
    const { id: uid } = await getUserInfo();
    const data = await get(`/video/bangumi_grade`, { params: { uid, channel_id } });
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
// Bangumi Tag
export declare type BangumiTagProps = Record<string, any>;
export const getTagList = async (channel_id: string): Promise<BangumiTagProps[]> => {
  try {
    const data = await get<BangumiTagProps[], any>(`/video/bangumi_tag`, {params: {channel_id}});
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
// Bangumi Status
export declare type BangumiStatusProps = {label: string, value: number};
export const getStatusList = async (): Promise<BangumiStatusProps[]> => {
  try {
    return Promise.resolve([
      {label: "即将上线", value: 0},
      {label: "连载中", value: 1},
      {label: "已完结", value: 2},
    ]);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getStatus = (statusValue: number): BangumiStatusProps => {
  switch (statusValue) {
    case 0:
      return {label: "即将上线", value: 0};
    case 1:
      return {label: "连载中", value: 1};
    case 2:
      return {label: "已完结", value: 2};
    default:
      return {label: "未知状态", value: statusValue};
  }
}
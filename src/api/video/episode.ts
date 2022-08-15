import { get } from "../request";
export declare type EpisodeProps = Record<string, any>;
export const getView = async (id?: string): Promise<EpisodeProps> => {
  try {
    if (id === undefined) return Promise.reject("The id is underfine");
    const data = await get<EpisodeProps, any>(`/video/episode/view/${id}`);
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
export const getList = async (bangumi_id?: string): Promise<EpisodeProps[]> => {
  try {
    const data = await get<EpisodeProps[], any>(`/video/episode/list/form?bangumi_id=${bangumi_id}`);
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
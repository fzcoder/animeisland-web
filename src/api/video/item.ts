import { get } from "../request";
export const getVideoItemWithPlayList = async (id?: string | number): Promise<Record<string, any>> => {
  try {
    if (id === undefined) { return Promise.reject("The 'id' is undefined"); }
    const form = await get<Record<string, any>, any>(`/video/item/play/${id}`);
    return Promise.resolve(form);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
import { get } from "../request";
import { getUserInfo } from "../auth/user";
export declare type ChannelProps = Record<string, any>;
export const getChannelList = async (): Promise<ChannelProps[]> => {
  try {
    const {id: uid} = await getUserInfo();
    const data = await get('/video/channel', {
      params: { uid }
    });
    return Promise.resolve(data);
  } catch (err: any) {
    return Promise.reject(err);
  }
}
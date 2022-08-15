export declare type UserInfo = {
  id: string,
  email: string,
  nickname?: string,
  avatar?: string,
};
export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    // const userInfo = JSON.parse(localStorage.getItem('userInfo') || "");
    const userInfo = {sub: "", email: "", nickname: "", picture: ""}
    return Promise.resolve({
      id: userInfo['sub'] || "",
      email: userInfo['email'] || "",
      nickname: userInfo['nickname'] || "",
      avatar: userInfo['picture'] || "",
    });
  } catch (err: any) {
    return Promise.reject(err);
  }
}
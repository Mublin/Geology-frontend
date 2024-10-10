import api from "./apiHelper";
import { User } from "../types/types";
import { toast } from "react-toastify";

export async function getDropboxToken(code: string, path: string, user: User) {
     const {data} = await api.post("/files/token?code=" + code, {redirect: path})
     if(data && user){
       user.dropboxAccessToken = data.accessToken
       localStorage.removeItem("userDetail")
       localStorage.setItem("userDetail", JSON.stringify(user))
     }
     return
    } 
    export async function getDropboxCode(userId: number, path: string) {
        const {data} = await api.post(`/users/dropbox/refresh-token/${userId}`, {redirect: path});
        if(data){
          return data
        }
        return "";
       }
       
       
export const getTokens = async (code: string = "", userDetails: User) => {
        try {
          if (!userDetails.dropboxAccessToken && !code) {
            let redirectUri = await getDropboxCode(userDetails.id, window.location.href);
            if (redirectUri) {
              window.location.href = redirectUri
            }
          } else if (code && userDetails) {
            let length = window.location.href.length - code.length - 6;
            await getDropboxToken(code, window.location.href.slice(0, length), userDetails);
          }
        } catch (error) {
          toast.error("Unable to get token")
          throw Error("Unable to get token")
        }
      };
import axios from "axios";
import { baseUrl, endpoints } from "./index.services";
import { NoteForm } from "@utils/interface/form.interface";
import Cookies from "js-cookie";


export const getOptions = () : any => {
    const accessToken = Cookies.get("token");
    return (
   {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          content_id : Cookies.get("content_id")
        },
      }
    );
  };

const getLogin = async ({
  fdata,
}: {
  fdata: { email: string; password: string };
}) => {
  try {
    const { data, status } = await axios.post(
      baseUrl + "/" + endpoints.user.login,
      fdata
    );
    return { data, status };
  } catch (err: any) {
    console.error(`Error : ${err}`);
  }
};

const getSignUp = async ({
  fdata,
}: {
  fdata: { email: string; password: string };
}) => {
  try {
    const { data, status } = await axios.post(
      baseUrl + "/" + endpoints.me,
      fdata
    );
    return { data, status };
  } catch (err: any) {
    console.error(`Error : ${err}`);
  }
};

const getNoteAdd = async ({ fdata }: { fdata: NoteForm }) => {
  try {
    
    const { data, status } = await axios.post(
    baseUrl + "/" + (Cookies.get("token") ?  endpoints.user.note :  endpoints.note ),
      fdata , getOptions()
    );
    return { data, status };
  } catch (err: any) {
    console.error(`Error : ${err}`);
  }
};

const getNoteUpdate = async ({ fdata }: { fdata: NoteForm }) => {
    try {
      const { data, status } = await axios.put( baseUrl + "/" + (Cookies.get("token") ?  endpoints.user.note :  endpoints.note) , fdata , getOptions() );
      return { data, status };
    } catch (err: any) {
      console.error(`Error : ${err}`);
    }
  };

const getNoteBySlug = async ({ fdata }: { fdata: string }) => {
  try {
    const { data, status } = await axios.get(
      baseUrl + "/" + endpoints.note + `/${fdata}` , getOptions()
    );
    return { data, status };
  } catch (err: any) {
    console.error(`Error : ${err}`);
  }
};

export { getLogin, getSignUp, getNoteAdd, getNoteBySlug,getNoteUpdate };

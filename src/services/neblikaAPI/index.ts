import { anys } from "@/types";
import axios from "axios";


interface IconUrlProps {
  name:string;
  iconCfg?: {
    fill?:number;
    wght?:number;
    opsz?:number;
    type?:string;
  };
}


class NeblikaAPI {
  private isDevENV:boolean;
  private DevDomain:string;
  private ProdDomain:string;
  public baseUrl:string;


  constructor() {
    this.isDevENV = process.env.NODE_ENV === 'development';
    this.DevDomain = `http://localhost:3000`;
    this.ProdDomain = 'https://www.neblika.com';
    this.baseUrl = this.isDevENV ? this.DevDomain : this.ProdDomain;
  }

  iconUrl({ name, iconCfg }:IconUrlProps):string {
    const { fill=0, wght=400, opsz=48, type="svg" } = iconCfg || {};
    const folder = "/icons";
    return folder + `/${name}_FILL${fill}_wght${wght}_GRAD0_opsz${opsz}.${type}`;
  }

  async getFavicon(url:string, fallback?:string):Promise<string> {
    return axios.get(`${this.baseUrl}/api/get-favicon?url=${url}`)
      .then(r => r.data)
      .catch(err => fallback || "")
  }
}


const neblikaAPI = new NeblikaAPI();
export default neblikaAPI;

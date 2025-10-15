export class DataStorage {
  private tokenSlotKey:string;
  
  constructor() {
    this.tokenSlotKey = "USER_ACCESS_TK";
  }

  init(key:string, data:any, replace:boolean=false) {
    const slotData:any = localStorage.getItem(key);
    if (!replace && slotData) return;
    if (replace) this.set(key, data);
  }

  set(key:string, data:any=''):void {
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key:string):any {
    if (typeof window !== 'undefined') {
      const data:any = localStorage.getItem(key);
      return JSON.parse(data);
    }
    return false;
  }

  del(key:string):void {
    localStorage.removeItem(key);
  }

  async update(
    key:string,
    func:(s:any) => Promise<any>,
    init:any=null
  ):Promise<void> {
    const data:any = localStorage.getItem(key);
    const parsedData = JSON.parse(data);
    const updatedData = await func(parsedData || init);
    if (updatedData) this.set(key, updatedData);
  }

  reset():void {
    localStorage.clear();
  }

  getLength():number {
    return localStorage.length;
  }

  setToken(token:string):void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenSlotKey, JSON.stringify(token));
    }
  }

  hasToken():boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(this.tokenSlotKey);
    }
    return false;
  }

  getToken():string {
    if (typeof window !== 'undefined') {
      const data:any = localStorage.getItem(this.tokenSlotKey);
      return JSON.parse(data);
    }
    return '';
  }
}

const dataStorage = new DataStorage();
export default dataStorage;

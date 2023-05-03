


export class Config {
  apiUrl(){
    const API_URL = 'http://localhost:3000/api/v1';
    return API_URL;
    }
    setItem(key: string, value: any): void {
      //localStorage.setItem(key, JSON.stringify(value));
      localStorage.setItem(key,value);
    }
    getToken(){
      let token=localStorage.getItem('tokenKeys');

      return token;
    }
    deleteToken(){
      localStorage.removeItem('tokenKeys');
      return true;
    }
}



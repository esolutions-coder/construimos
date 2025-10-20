async function fetchData(url: string, token: string) {
    const URL = url;
    const HEADERS = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    const myInit = {
      method: "GET",
      headers: HEADERS,
    };
  
    try {
      const apiAnswer = await fetch(URL, myInit);
      // const apiResponse = await apiAnswer.json()
      return apiAnswer
    } catch (err) {
      throw err
    }
  }

  async function postDataWithoutPayload(url: string, token: string){
    const URL = url;
    const HEADERS = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
    const myInit = {
      method: "POST",
      headers: HEADERS,
    };
  
    try {
      const apiAnswer = await fetch(URL, myInit);
      return apiAnswer
    } catch (err) {
      throw err
    }
  }

  async function deleteData(url: string, token: string){
    const URL = url;
    const HEADERS = new Headers({
      "Authorization": `Bearer ${token}`
    });
    const myInit = {
      method: "DELETE",
      headers: HEADERS,
    };
  
    try {
      const apiAnswer = await fetch(URL, myInit);
      return apiAnswer
    } catch (err) {
      throw err
    }
  }

  async function postDataWithPayLoad(url: string, data:FormData, token: string){
    const URL = url;
    const HEADERS = new Headers({
      "Authorization": `Bearer ${token}`
    });
    const myInit = {
      method: "POST",
      body: data,
      headers: HEADERS,
    };
  
    try {
      const apiAnswer = await fetch(URL, myInit);
      return apiAnswer
    } catch (err) {
      throw err
    }
  }

  async function postDataNoToken(url: string, data:FormData){
    const URL = url;
    const HEADERS = new Headers({
      'Content-Type': "multipart/form-data",
    });
    const myInit = {
      method: "POST",
      body: data
    };
  
    try {
      const apiAnswer = await fetch(URL, myInit);
      return apiAnswer
    } catch (err) {
      throw err
    }
  }

  async function patchData(url: string) {
    const URL = url;
    const HEADERS = new Headers({
      "Content-Type": "application/json",
    });
    const myInit = {
      method: "PATCH",
      headers: HEADERS,
    };
  
    try {
      const apiAnswer = await fetch(URL, myInit);
      return apiAnswer
    } catch (err) {
      throw err
    }
  }

  async function putData(url: string, data:FormData, token: string){
    const URL = url;
    const HEADERS = new Headers({
      "Authorization": `Bearer ${token}`
    });
    const newfor = new FormData()
    
    const myInit = {
      method: "PUT",
      headers: HEADERS,
      body: data
    };
    
    try {
      const apiAnswer = await fetch(URL, myInit);
      return apiAnswer
    } catch (err) {
      throw err
    }

  }
  export {fetchData, patchData, postDataWithoutPayload, postDataWithPayLoad, deleteData, putData, postDataNoToken};
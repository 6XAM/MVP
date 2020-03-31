import axios from 'axios';

export const signInRequest = async (info, setRedirect) =>{
    let response = await axios.post("/api/signin", info);
    if (response.status === 200) {
      setRedirect(true);
    }
}

export const getUserInfo = async(setData) =>{
  let response = await axios.get("/api/getUserInfo");
  if(response.status === 200){
    setData(response.data)
  }
}
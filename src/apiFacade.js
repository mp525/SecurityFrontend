import {
    mainURL,
    userInfoEndpoint,
    adminInfoEndpoint,
    defaultEndpoint,
    loginEndpoint,
    userCount,
    
    profile,
    allPosts,
    allprofile,
    userposts,
    deletePost,
    editPost,
    allPostsAdmin,deletePostU,editPostU,
    info
    } from "./settings";

 
function handleHttpErrors(res) {
 if (!res.ok) {
   return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}
 
function apiFacade() {
 /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/
 
 const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
const getToken = () => {
  return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
}
const logout = () => {
  localStorage.removeItem("jwtToken");
}


const login = (user, password) => {
    const options = makeOptions("POST", true,{username: user, password: password });
    return fetch(mainURL + loginEndpoint, options)
      .then(handleHttpErrors)
      .then(res => {setToken(res.token) })
      
      
}

const register = (user, setMsg) =>{
  const options = makeOptions("POST", false, user);
  return fetch(mainURL + info, options)
  .then(handleHttpErrors)
  .then(data=>{
    setMsg(data);
  })
}

const isAdmin = () => {
  const jwtData = getToken().split(".")[1];
  const decodedJwtJsonData = window.atob(jwtData);
  const decodedJwtData = JSON.parse(decodedJwtJsonData);
  const isAdmin = decodedJwtData.roles;
  return isAdmin;
}

const fetchDataUser = () => {
    const options = makeOptions("GET",true); //True add's the token
   return fetch(mainURL + userInfoEndpoint, options).then(handleHttpErrors);
}
const fetchDataAdmin = () => {
    const options = makeOptions("GET",true); //True add's the token
   return fetch(mainURL + adminInfoEndpoint, options).then(handleHttpErrors);
}

// Will not be used
const fetchDefault = (callback) => {
    const options = makeOptions("GET"); 
   return fetch(mainURL + defaultEndpoint, options)
   .then(handleHttpErrors)
   .then(data => {callback(data)})
   
}

// Will be deleted!
const fetchCount = (callback) => {
  const options = makeOptions("GET");
  return fetch(mainURL + userCount, options)
  .then(handleHttpErrors)
  .then(data => {callback(data)})
}







const addPosten = async (postDTO) => {
  const options = makeOptions("POST", true, postDTO);
  const URL = mainURL + "/api/info/addPost";
  const newPost = await fetch(URL, options)
  .then(handleHttpErrors)
  .then((data) => {
    console.log(data);
  });
  return newPost;
}

const deletePosten = (id) => {
  const options = makeOptions("DELETE", true);
  let deleteUrl=mainURL + deletePost + id;
  return fetch(deleteUrl, options)
  .then((data) => {
    console.log(data)
  });
};
const editPosten = async (postDTO) => {
  const options = makeOptions("PUT", true,postDTO);
  console.log(mainURL+editPost);
  const data = await fetch(mainURL + editPost, options);
  console.log(data);
};
const deletePostenU = (id) => {
  const options = makeOptions("DELETE", true);
  let deleteUrl=mainURL + deletePostU + id;
  return fetch(deleteUrl, options)
  .then((data) => {
    console.log(data)
  });
};
const editPostenU = async (postDTO) => {
  const options = makeOptions("PUT", true,postDTO);
  console.log(mainURL+editPostU);
  const data = await fetch(mainURL + editPostU, options);
  console.log(data);
};

const fetchProfileInfo=(callback)=>{
  const options = makeOptions("GET", true);
  return fetch(mainURL + profile, options)
  .then(handleHttpErrors)
  .then((data) => {
    callback(data);
  });
}

const fetchAllPosts = (callback) => {
  const options = makeOptions("GET", true);
  return fetch(mainURL + allPosts, options)
  .then(handleHttpErrors)
  .then((data) => {
    callback(data);
  });
};

const fetchAllPostsAdmin = (callback) => {
  const options = makeOptions("GET", true);
  return fetch(mainURL + allPostsAdmin, options)
  .then(handleHttpErrors)
  .then((data) => {
    callback(data);
  });
};


const fetchAllProfile=(callback)=>{
  const options = makeOptions("GET", true);
  return fetch(mainURL + allprofile, options)
  .then(handleHttpErrors)
      .then((data) => {
        callback(data);
      });
}
const fetchAllUserPosts=(name1,callback)=>{
  const options = makeOptions("GET", true);
  return fetch(mainURL + userposts+name1, options)
  .then(handleHttpErrors)
      .then((data) => {
        callback(data);
        console.log(mainURL + userposts+name1);
      });
}
const makeOptions= (method,addToken,body) =>{
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && loggedIn()) {
     opts.headers["x-access-token"] = getToken();
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
 }
 return {
     makeOptions,
     setToken,
     getToken,
     loggedIn,
     login,
     logout,
     fetchDataUser,
     fetchDataAdmin,
     fetchDefault,
     fetchCount, 
     isAdmin, 
     deletePosten,
     addPosten,
     fetchProfileInfo,
     fetchAllPosts,
     fetchAllProfile,
     fetchAllUserPosts,
     editPosten,
     fetchAllPostsAdmin,
     editPostenU,
     deletePostenU,
     register
     
 }
}
const facade = apiFacade();
export default facade;

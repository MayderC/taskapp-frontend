
const deleteLocalStorage = ()=>{
  localStorage.removeItem('uid');
  localStorage.removeItem('isLogin');
}


module.exports = {
  deleteLocalStorage
}
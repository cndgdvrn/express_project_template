const handleServerError = (err) => {
  if(err){
    console.log("server başlatılırken hata")
    return
  }
  console.log("server çalışıyor !!!!!!!!!")
}


const parseAPIError = (err) => {
  let msg = {};
  let k = 1;
  for (let i in err.errors) {
    if (err.errors.hasOwnProperty(i)) {
      msg[`msg${k}`] = err.errors[i].message;
      k++;
    }
  }
  return msg;
};

module.exports = {handleServerError,parseAPIError};
export class MedicalQuery {
  getDoctor(name,keyword) {
    return new Promise(function(resolve,reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${exports.apikey}&query=${keyword}&limit=100`;
      request.onload =function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET",url,true);
      request.send();
    });
  }
}


// for loop can run to this.meta.total
//&name=${name}

export class MedicalQuery {
  getDoctor(name,keyword) {
    return new Promise(function(resolve,reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}&query=${keyword}&name=${name}&limit=100&location=or-portland`;
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
//${exports.apiKey}

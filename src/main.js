import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { MedicalQuery } from './script.js';

$(document).ready(function() {
  //Form submission
  $('#medical-query').submit(function(event) {
    event.preventDefault();
    //Collect user input and store in variables
    let keyword = $("#keyword-input").val();
    let name = $("#name-input").val();

    //Clear user input fields and return data after storing and displaying
    $("#keyword-input").text("");
    $("#name-input").text("");
    $("#num-results").text("");
    $("#keyword-results").text("");
    $("#name-results").text("");
    $("#populate").text("");

    //Run api query and store results
    let medicalQuery = new MedicalQuery();
    let promise = medicalQuery.getDoctor(name,keyword);

    //Promise
    promise.then(function(response) {
      let body = JSON.parse(response);
      //text number of results and search parameters back to user
      $("#num-results").text(body.meta.count);
      $("#keyword-results").text(keyword);
      $("#name-results").text(name);
      $("#results").show();
      for (var i = 0; i < body.meta.count; i++) {
        //create cards for doctor information to be displayed
        $("#populate").append(
          `<div id="accordion">
          <div class="card bg-light mb-3">
          <div class="card-header" id="heading${i}" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapseOne"><span id=first-name${i}></span> <span id=last-name${i}></span></div>
          <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordion">
          <div class="card-body">
          <div id=address${i}>
          <p><span class='strong'>Address: </span><span id=streetpt2${i}></span> <span id=streetpt1${i}></span>; <span id=city${i}></span>, <span id=state${i}>; </span> ;<span id=zip${i}></span>.</p>
          </div>
          <div id=contact${i}></div>
          <p><span class ="strong">Phone:</span><ul id=phones${i}></ul></p>
          <div id=patients${i}></div>
          <div id=url${i}></div>
          <div id=bio${i}></div>
          </div>
          </div>
          </div>
          </div>`
        );
        console.log(body.data [i].practices[0].website);
        //Fill in newly created doctor cards
        $(`#first-name${i}`).html(body.data[i].profile.first_name);
        $(`#last-name${i}`).html(body.data[i].profile.last_name);
        $(`#streetpt2${i}`).html(body.data[i].practices[0].visit_address.street2);
        $(`#streetpt1${i}`).html(body.data[i].practices[0].visit_address.street);
        $(`#city${i}`).html(body.data[i].practices[0].visit_address.city);
        $(`#state${i}`).html(body.data[i].practices[0].visit_address.state);
        $(`#zip${i}`).html(body.data[i].practices[0].visit_address.zip);
        if (body.data [i].practices[0].website === undefined) {
        $(`#url${i}`).html(`<p><span class='strong'>No url listed.</span></p>`);
        } else {
        $(`#url${i}`).html(`<p><span class='strong'>Website: </span><a href=${body.data[i].practices[0].website}>${body.data[i].practices[0].website}</a></p>`);
        }
        $(`#bio${i}`).html(`<p><span class='strong'>Doctor bio: </span>${body.data[i].profile.bio}</p>`);
        if (!body.data [i].practices[0].accepts_new_patients) {
          $(`#patients${i}`).html(`<p class='strong'>Not accepting new patients at this time.</p>`);
        } else if (body.data [i].practices[0].accepts_new_patients) {
          $(`#patients${i}`).html(`<p class='strong'>Accepting new patients at this time.</p>`);
        }
        body.data[i].practices[0].phones.forEach(function(phone) {
          $(`#phones${i}`).append(`<li>${phone.type}: ${phone.number}</li>`);
        });

        }
      }, function(error) {
        $('#show-errors').text(`There was an error processing your request: ${error.message}`);
      });
    });
  });

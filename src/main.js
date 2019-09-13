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

    //run api query and store results
    let medicalQuery = new MedicalQuery();
    let promise = medicalQuery.getDoctor(name,keyword);

    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
      $("#num-results").text();
      $("#keyword-results").text(keyword);
      $("#name-results").text(name);
      $("#results").show();
    }, function(error) {
      $('#show-errors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});

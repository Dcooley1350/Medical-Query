import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { MedicalQuery } from './script.js';

$(document).ready(function() {
  //Form submission
  $('medical-query').submit(function(event) {
    event.preventDefault();
    //Collect user input and store in variables
    let keyword = $("#keyword-input").val();
    let name = $("#name-input").val();
    //Clear user input fields after storing user input
    $("#keyword-input").text("");
    $("#name-input").text("");

    //run api query and store results
    let medicalQuery = new MedicalQuery();
    let promise = medicalQuery.getDoctor(name,keyword);

    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
    }, function(error) {
      $('#show-errors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});

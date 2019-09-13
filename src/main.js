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

  });
});

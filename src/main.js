import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import { MedicalQuery } from './script.js';

$(document).ready(function() {
  $('medical-query').submit(function(event) {
      event.preventDefault();
  });
});

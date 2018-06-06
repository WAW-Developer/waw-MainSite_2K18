"use strict";

// Import the html helper
import {html} from '../../thirds/polymer/polymer-element.js';


class Templates {
  
  static get fragmentFor_CSS() {
    
    return html`
      <!-- Boostrap -->
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
      
      <!-- Font awesome -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />      
    `;
    
  }
  
}


export default Templates;



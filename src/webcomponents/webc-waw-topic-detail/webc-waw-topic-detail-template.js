"use strict";

// Import the html helper
import {html} from '../../thirds/polymer/polymer-element.js';


class Template {
  
  static get fragment() {
    return html`
    
    <!-- Boostrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    
    <!-- Font awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />      

    
    <style>
    /* local styles go here */
    /*       :host { */
    /*         display: block; */
    /*       } */
    </style>
   
    <!-- local DOM goes here -->
    <div class="card">
      <div class="card-header">
        <h3 class="panel-title">What about {{data.topic.name}}?</h3>
      </div>
      <div class="card-block">
        
        <div>
          <div class="img-thumbnail w-25 float-left" data-name="image">
            <img alt="..." class="img-fluid" style="max-height: 172px"
              src$="./resources/images/{{data.topic.iconImage}}">
          </div>
        
          <h3>{{data.topic.name}}</h3>
          <p id="description">
          </p>
          
          <a class="btn btn-outline-primary" href$="{{data.topic.url_blog}}" data-name="blog">
            <span class="fa fa-hand-o-right" aria-hidden="true"></span>
            Go to blog
          </a>
          
          <a class="btn btn-secondary" href$="{{data.topic.url_main}}" data-name="information">
            <span class="fa fa-info-circle" aria-hidden="true"></span>
            more information
          </a>
          
        </div>
        
      </div>
    </div>
      
    `;
  }
   
}

export default Template;


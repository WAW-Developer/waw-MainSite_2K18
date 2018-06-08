"use strict";

// Import the html helper
import {html} from '../../thirds/polymer/polymer-element.js';

// Import common templates
import _commonTemplates from '../webc-waw-common/webc-waw-common-templates.js';


class Template {
  
  static get fragment() {
    return html`
    
    <!-- Common templates -->
    ${_commonTemplates.fragmentFor_CSS}

    
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


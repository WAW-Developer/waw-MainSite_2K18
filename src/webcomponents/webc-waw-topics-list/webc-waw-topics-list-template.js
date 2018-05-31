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


    <div class="list-group card">
      <div class="card-header">
        <h3 class="panel-title">Topics list</h3>
      </div>
      
      <div class="card-body">
      <template id="topics_list" is="dom-repeat" items="{{topics}}" as="_topic">
        
        <a href="javascript:void(null);" 
            class$="card-block list-group-item {{_topic_Class(_topic._model.selected)}}"
            data-target$="[[_topic.id]]"
            on-click="_itemclicked">
          
            <div>
              <div class="img-thumbnail w-25 float-right" 
                style="max-height: 172px;">
                <img alt="..." class$="img-fluid {{_topicImage_Class(_topic._model.selected)}}"
                  style="max-height: 53pt;" 
                  src$="resources/images/{{_topic.iconImage}}">
              </div>
            
              <h4 class="list-group-item-heading">{{_topic.name}}</h4> 
              <p class="list-group-item-text">{{_topic.description}}</p>
            </div>
            
        </a>
        
      </template>
      </div>  
      
    </div>    
    `;
  }
  
}

export default Template;


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
      div[data-name="image"] {
        text-align: center;
        max-height: 61pt;
      }
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
                data-name="image">
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


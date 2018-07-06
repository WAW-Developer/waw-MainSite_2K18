"use strict";

// Import the html helper
import {html} from '../../thirds/polymer/polymer-element.js';

// Import common templates
import _commonTemplates from '../webc-waw-common/webc-waw-common-templates.js?v=/* @echo version */';

class Template {
  
  static get fragment() {
    
    return html`
    
      <!-- Common templates -->
      ${_commonTemplates.fragmentFor_CSS}
            
      <style>
        /* local styles go here */
        :host {
          display: block;
        }
        
        
        div[data-name="sources-list"] div[data-name="list"]{
         max-height: 400pt;
         overflow-y: auto;
        }
        
      </style>

      <div class="container-fluid row" style="padding: 0px;">
        
        <div class="col-xs-12 col-sm-12 col-md-4">
          <div class="card">
            <div class="card-header">
              <h3 class="panel-title">Sources used</h3>
            </div>
            <div class="card-block waw-chart">
              <div class="card-text" data-name="loading" style="display: none; float: left;">
                Loading <span class="fa fa-cog fa-spin fa-fw" aria-hidden="true"></span>
              </div>
              <div class="card-text" data-name="content">
                  <canvas width="90%" height="90%" data-type="chart" data-name="chart_SourcesUsed">
                  </canvas>            
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-xs-12 col-sm-12 col-md-8">
        
          <div class="card" data-name="sources-list">
            <div class="card-header">
              <h3 class="panel-title">Sources list</h3>
            </div>
            <div class="card-body">
              <div class="card-text" data-name="loading" style="display: none; float: left;">
                Loading <span class="fa fa-cog fa-spin fa-fw" aria-hidden="true"></span>
              </div>
              
              <div class="card-text" data-name="content">
                <div class="card-text">
                  <i class="fa fa-file-text-o" aria-hidden="true"></i> Sources: <span class="badge badge-pill badge-secondary">{{sources.length}}</span> <br>
                </div>
                
                <div class="card-text" data-name="list">
	                <template is="dom-repeat" items="{{sources}}" as="_source" index-as="_source_no" mutable-data>
	                  <div class="card">
	                    <div class="card-header">
	                      <h5 class="panel-title"> {{_source.host}} 
	                       <span class="badge badge-pill badge-info">{{_source.count}}</span>
	                          <a href="{{_source.link}}" target="_blank" class="badge badge-pill badge-dark">
	                          <i class="fa fa-external-link" aria-hidden="true"></i>
	                        </a>
	                      </h5>
	                    </div>
	                  </div>
	                </template>
                </div>  <!-- EndOf "list" -->
                
              </div> <!-- EndOf "content" -->
              
            </div>  <!-- EndOf "body" -->
          </div>
        
        </div>
           
      </div>
      
    `;
    
  }
  
}

export default Template;

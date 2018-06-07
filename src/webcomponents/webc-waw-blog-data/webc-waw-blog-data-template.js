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
      :host {
        display: block;
      }
      
      
      /* need resize using javascript
      canvas[data-type="chart"] {
        height: 90%;
        width: 90%;
      }
      */
         
      @media (max-width: 575px) { 
      
/*        div.card, div.card-block { */
/*         padding: 2px; */
/*        } */


          .waw-chart {
            min-height: none;
            max-height: none;
          }
          
          .waw-chart canvas {
            
            height: auto;
            width: auto;
          }
            
      }
      
      /* Small devices (landscape phones, less than 768px) */
      @media (max-width: 767px) {
       
       
      }
      
      /* Medium devices (tablets, less than 992px) */
      @media (max-width: 991px) { 
  
          .waw-chart {
/*             min-height: 400px !important; */
              max-height: none  ;
          }
  
      }
      
      
      .waw-chart {
        max-height: 470px !important;
      }
      
    </style>
    
    
    <div class="container-fluid row" style="padding: 0px;">
    
      <div class="col-xs-12 col-sm-12 col-md-4">
        <div class="card">
          <div class="card-header">
            <h3 class="panel-title">Categories used</h3>
          </div>
          <div class="card-block waw-chart">
            <div class="card-text" data-name="loading" style="display: none; float: left;">
              Loading <span class="fa fa-cog fa-spin fa-fw" aria-hidden="true"></span>
            </div>
            <div class="card-text" data-name="content">
                <canvas width="90%" height="90%" data-type="chart" data-name="chart_CategoriesUsed">
                </canvas>            
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-xs-12 col-sm-12 col-md-4">
        <div class="card">
          <div class="card-header">
            <h3 class="panel-title">Categories linked</h3>
          </div>
          <div class="card-block waw-chart">
            <div class="card-text" data-name="loading" style="display: none; float: left;">
              Loading <span class="fa fa-cog fa-spin fa-fw" aria-hidden="true"></span>
            </div>
            <div class="card-text" data-name="content">
                <canvas width="90%" height="90%" data-type="chart" data-name="chart_CategoriesLinked">
                </canvas>            
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-xs-12 col-sm-12 col-md-4">
        <div class="card">
          <div class="card-header">
            <h3 class="panel-title">Posts over time</h3>
          </div>
          <div class="card-block waw-chart">
            <div class="card-text" data-name="loading" style="display: none; float: left;">
              Loading <span class="fa fa-cog fa-spin fa-fw" aria-hidden="true"></span>
            </div>
            <div class="card-text" data-name="content">
                <canvas width="90%" height="90%" data-type="chart" data-name="chart_PostsOverTime">
                </canvas>            
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
    `;
  }
  
}

export default Template;

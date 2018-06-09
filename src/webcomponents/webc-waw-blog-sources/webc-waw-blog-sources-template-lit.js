import { html} from '../../thirds/lit-element/lit-element.js';

// Import common templates
// import _commonTemplates from '../webc-waw-common/webc-waw-common-templates.js';

class Template {
  
  static get fragment() {
    
    return html`
    
      
      <style>
        /* local styles go here */
        :host {
          display: block;
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
        
          <div class="card">
            <div class="card-header">
              <h3 class="panel-title">Sources list</h3>
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
           
      </div>
      
    `;
    
  }
  
}

export default Template;

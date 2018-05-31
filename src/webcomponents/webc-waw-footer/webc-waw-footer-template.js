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
         
    @media (max-width: 575px) {
    
     div.card, div.card-block, div.card-body {
      padding: 2px;
     }
          
    }

    </style>
    
    <div class="card">
      
      <div class="card-header">
        <h3>How it was made...</h3>
      </div>
      
      <div class="card-body">
      
        <div class="card-block d-block d-sm-none">
            <div class="card-text">
                <span class="fa fa-html5"></span> HTML5: Polymer <br />
                <span class="fa fa-css3"></span> CSS3: Bootstrap <br />
                <span class="fa fa-rss"></span> RSS: Blogger
            </div>
        </div>

      
        <div class="row card-block d-none d-sm-flex">
      
            <div class="col-xs-4 col-sm-4 col-md-4 col-xs-4">
                <div class="img-thumbnail">
                  <img alt="..." class="img-fluid" 
                    src="resources/images/html5_Logo.png">
                  <div class="caption" style="text-align:center">
                    <h4><small>HTML5</small></h4>
                  </div>
                </div>
            </div>
        
            <div class="col-xs-4 col-sm-4 col-md-4 col-xs-4">
                <div class="img-thumbnail">
                  <img alt="..." class="img-fluid" 
                    src="resources/images/html5_Styling_512.png">
                  <div class="caption" style="text-align:center">
                    <h4><small>CSS3</small></h4>
                  </div>
                </div>
            </div>
            
            <div class="col-xs-4 col-sm-4 col-md-4 col-xs-4">
                <div class="img-thumbnail">
                  <img alt="..." class="img-fluid" 
                    src="resources/images/RSS_button_1021.png">
                  <div class="caption" style="text-align:center">
                    <h4><small>RSS</small></h4>
                  </div>
                </div>
            </div>

        </div>
      
      
        <div class="row card-block d-none d-sm-flex">
            <div class="col-xs-4 col-sm-4 col-md-4 col-xs-4">
                <div class="img-thumbnail">
                  <img alt="..." class="img-fluid" 
                    src="resources/images/polymer_logo.png">
                  <div class="caption" style="text-align:center">
                    <h4><small>Polymer</small></h4>
                  </div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-xs-4">
                <div class="img-thumbnail">
                  <img alt="..." class="img-fluid" 
                    src="resources/images/bootstrap_Logo.png">
                  <div class="caption" style="text-align:center">
                    <h4><small>Bootstrap</small></h4>
                  </div>
                </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-xs-4">
                <div class="img-thumbnail">
                  <img alt="..." class="img-fluid"  
                    src="resources/images/blogger_Logo.png">
                  <div class="caption" style="text-align:center">
                    <h4><small>Blogger</small></h4>
                  </div>
                </div>
            </div>

        </div>
        
        
      </div>
      
      
      <div class="card-footer">
        <small class="float-right">WAW 2018</small>
      </div>
      
    </div>
    `;
  }
  
}

export default Template;


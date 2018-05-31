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

      /* Show the dropdown menu on hover */
			/*
			div.dropdown:hover div.dropdown-menu {
			    display: block;
			}
      */

      div.dropdown div.dropdown-menu[data-state="closed"] {
         display: none;
      }
      
      div.dropdown div.dropdown-menu[data-state="open"] {
        display: block;
      }

    </style>
    
    <!-- local DOM goes here -->
<!--     <span>Not much here yet.</span> -->
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="javascript:void(null);">WAW</a>
      
      <button class="navbar-toggler navbar-toggler-right" type="button" 
        data-toggle="collapse" data-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" aria-expanded="false" 
        aria-label="Toggle navigation"
        data-name="buttonMenuToggle"
        on-click="_click_buttonMenuToggle">
        <span class="navbar-toggler-icon">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </span>
      </button>
      
      
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent" data-name="menuCollapsable">
        <ul class="navbar-nav mr-auto">
         
<!--           <li class="nav-item active"> -->
<!--             <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
<!--           </li> -->
<!--           <li class="nav-item"> -->
<!--             <a class="nav-link" href="#">Link</a> -->
<!--           </li> -->
          
<!--           <li class="nav-item"> -->
<!--             <a class="nav-link disabled" href="#">Disabled</a> -->
<!--           </li> -->
          
          <template id="topics_list" is="dom-repeat" items="{{topics}}" as="_topic">
              <li class$="nav-item {{_topic_Class(_topic)}}">
                  <a href="javascript:void(null);" 
                      class="nav-link"
                      on-click="_itemclicked" 
                      data-target$="{{_topic.id}}">{{_topic.name}}</a>
              </li>
          </template>
          
        </ul>
        
<!--         <form class="form-inline my-2 my-lg-0 justify-content-end"> -->
<!--           <input class="form-control mr-sm-2" type="text" placeholder="Search"> -->
<!--           <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
<!--         </form> -->
        <ul class="navbar-nav justify-content-right">
          <li class="nav-item justify-content-end">
            
            <div class="nav-item dropdown nav-item dropdown" style="display: block;">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="javascript:void(null);"
                  id="dropdownMenuButton"
                  on-click="_click_dropdown"
                  role="button" aria-haspopup="true" aria-expanded="false">
                  <span class="fa fa-ellipsis-v" aria-hidden="true"></span> Settings
              </a>
              <div class="dropdown-menu dropdown-menu-right"
                data-state="closed" 
                aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="javascript:void(null);" 
                    on-click="_show_modal_aboutweb">
                      <span class="fa fa-info-circle" aria-hidden="true" data-name="icon"></span>
                      About this web
                </a>
                <a class="dropdown-item" href="javascript:void(null);" 
                    on-click="_show_modal_aboutwaw">
                      <span class="fa fa-info-circle" aria-hidden="true" data-name="icon"></span>
                      About WAW
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="javascript:void(null);"
                    on-click="_download_config">
                      <span class="fa fa-cog" aria-hidden="true" data-name="icon"></span>
                      Get config (JSON)
                </a>
              </div>
            </div>
          </li>
        </ul>
        
      </div>
    </nav>
    
      <div class="modal fade" tabindex="-1" role="dialog"
        data-name="aboutweb" 
        aria-hidden="true" style="display: none;">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLiveLabel">About this web</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                  </button>
              </div>
              <div class="modal-body">
                  <p> This web is a HTML5 application prototype.</p>
                  <p> 
                    All the information is stored on remote servers. This application only has a configuration file for access all the data by the client browser. 
                    <br/>
                    <a href="https://github.com/WAW-Developer/waw-MainSite_2K18" class="btn btn-outline-primary">
                        <span class="fa fa-code" aria-hidden="true"></span> go to code
                        <span class="fa fa-github" aria-hidden="true"></span>
                    </a>
                    <span class="fa fa-code-fork" aria-hidden="true"></span> version: {{data.version}} 
                  </p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
<!--                   <button type="button" class="btn btn-primary">Save changes</button> -->
              </div>
            </div>
          </div>
      </div>
      
      
      <div class="modal fade" tabindex="-1" role="dialog"
        data-name="aboutwaw" 
        aria-hidden="true" style="display: none;">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLiveLabel">About WAW</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                  </button>
              </div>
              <div class="modal-body">
                  <p>What about World? (WAW).</p>
                  <p>Is a project that unifies information technologies and the mosts importants topics in life. Of course is only a point of view.</p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
<!--                   <button type="button" class="btn btn-primary">Save changes</button> -->
              </div>
            </div>
          </div>
      </div>
            
    `;
  }
  
  
}


export default Template;


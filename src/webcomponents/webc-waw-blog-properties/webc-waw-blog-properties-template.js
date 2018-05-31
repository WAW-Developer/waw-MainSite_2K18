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
      :host {
        display: block;
      }
      
      
         
      @media (max-width: 575px) { 
      
       div.card, div.card-block {
        padding: 2px;
       }
            
      }
      
      div[role="tabpanel"][data-name="categories"] div[data-name="content"] {
        overflow-y: auto;
        max-height: 453pt;
      }
      
    </style>
   
    <!-- local DOM goes here -->
    <div class="card">
      <div class="card-header">
        <h3 class="panel-title">Blog properties</h3>
      </div>
      <div class="card-block">
  
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist" data-name="tabs">
          <li class="nav-item">
            <a href="javascript:void(null);" aria-controls="categories"
                id="categories-tab"
                class="nav-link active"
                data-toggle="tab"
                on-click="_click_tab"
                data-name="categories"
                role="tab">Categories
            </a>
          </li>
          <li class="nav-item" hidden="true">
            <a href="javascript:void(null);" aria-controls="search"
                id="search-tab"
                class="nav-link"
                data-toggle="tab"
                data-name="search"
                role="tab">Search
            </a>
          </li>
          <li class="nav-item">
            <a href="javascript:void(null);" aria-controls="properties"
                id="properties-tab"
                class="nav-link"
                data-toggle="tab"
                on-click="_click_tab"
                data-name="properties"
                role="tab">Properties
            </a>
          </li>
        </ul>
      
        <!-- Tab panes -->
        <div class="tab-content card-text">
          
          <div role="tabpanel" id="categories" data-name="categories"
            class="tab-pane card-text active"
            style="padding: 3px;" 
            data-name="categories" 
            aria-labelledby="categories-tab">
          
          <!-- Panel Toolbar -->
          <div class="card-text">
              <span class="glyphicon glyphicon-tags" aria-hidden="true" style="margin-right: 6px;">
                <span class="fa fa-tags" aria-hidden="true"></span> 
              </span>
              <span>Categories <span class="badge badge-pill badge-default small">{{data.topic._model._rss.categories.length}}</span></span>
              
              
            <button type="button" 
              class="btn btn-outline-primary navbar-btn"
              on-click="_orderCategories"
              data-order="name">
              <span class="fa fa-sort-alpha-asc" aria-hidden="true"></span>
            </button>
  
            <button type="button" 
              class="btn btn-outline-primary navbar-btn"
              on-click="_orderCategories"
              data-order="count">
              <span class="fa fa-sort-amount-desc" aria-hidden="true"></span>
            </button>
            
          </div>
          <!-- EnfOf Panel Toolbar -->
  
          <div class="card-text" data-name="loading" style="display: none; float: left;">
            Loading <span class="fa fa-cog fa-spin fa-fw" aria-hidden="true"></span>
          </div>
          
          <div class="card-text" data-name="content">
	          <template id="categories_list" is="dom-repeat" items="{{categories}}" as="_category" index-as="_catagory_no">
	            
	  <!--             <a href="javascript:void(null);"> -->
	  <!--             <span class="label label-default">{{_category.name}}<span class="badge">{{_category.posts.length}}</span></span> -->
	  <!--             </a> -->
	            
	            <a class$="btn {{_category_Class(_category._model._selected)}}"
	                href="javascript:void(null);"
	                style="margin: 2px;"
	                on-click="_clickcategory">
	              {{_category.name}} 
	              <span class="badge badge-pill badge-default small" 
	                style="color: black; background-color: #F1F1F1;">{{_category.posts.length}}</span>
	            </a>
	            
	          </template>
          </div>
          
          
          </div>
          <div role="tabpanel" class="tab-pane card-text" id="search" data-name="search" aria-labelledby="search-tab">... Search</div>
          
          <div role="tabpanel" class="tab-pane card-text" id="properties" data-name="properties" aria-labelledby="properties-tab">
            <ul class="list-group">
              <li class="list-group-item">
                <div>
                    <span class="fa fa-leaf" aria-hidden="true"></span>
                    <strong>Name</strong> <br /> 
                    {{data.topic.name}}
                </div> 
              </li>
              <li class="list-group-item">
                <div>
                    <span class="fa fa-info-circle" aria-hidden="true"></span>
                    <strong>Description:</strong> <br /> 
                    {{data.topic.description}}
                </div>
              </li>
              <li class="list-group-item">
                <div>
                    <span class="fa fa-link" aria-hidden="true"></span>
                    <strong>URL main:</strong> <br />
                    <a href$="{{data.topic.url_main}}">
                    {{data.topic.url_main}}
                    </a>
                </div>
              </li>
              <li class="list-group-item">
                <div>
                    <span class="fa fa-hand-o-right" aria-hidden="true"></span>
                    <strong>URL blog:</strong> <br /> 
                    <a href$="{{data.topic.url_blog}}">
                    {{data.topic.url_blog}}
                    </a>
                </div>
              </li>
            </ul>
  
          </div>
        </div>
        
        
      </div>
    </div>    
    `;
  }
  
}



export default Template;
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
         
        @media (max-width: 575px) { 
        
         div.card, div.card-block {
          padding: 2px;
         }
              
        }

       :host { 
        /*          display: block; */
        /* local styles go here */
          
       } 
    </style>
    
    
    <div class="card">
      
      <div class="card-header" data-name="header">
        <h3>Posts list</h3>
      </div>
      
      
      <div class="card-block">
        
        <!-- Toolbar -->
        <nav class="card" data-name="toolbar">
            
            <!-- Number of Posts -->
            <div class="card-block" data-name="posts_count">
              <span class="fa fa-inbox" aria-hidden="true" 
                  style="margin-right: 6px; display: none;">
              </span>
  
              <span class="fa fa-file" aria-hidden="true"></span>
              <span class="nav-text">Posts: 
                
                <span data-name="filtered" style="display: none;">
                    <span class="badge badge-pill badge-default small">{{posts_filtered.length}}</span> of 
                </span>
                <span class="badge badge-pill badge-default small">{{posts.length}}</span> 
              </span>
  
              <span class="glyphicon glyphicon-cog cogLoading"
                  style="display:none;" 
                  aria-hidden="true">
              </span>
            </div>
            
            <!-- Loading layer -->
            <div class="card-text" data-name="loading" style="display: none; float: right;">
              Loading <span class="fa fa-cog fa-spin fa-fw" aria-hidden="true"></span>
            </div>
            
            
            <!-- Filter by Categories -->
            <div class="card-block" data-name="categories" style="display: none;">
            
                <div class="card-text">
                
                    <button type="button" 
                      class$="btn btn-outline-secondary {_class_forButtonFilterByCategories()}"
                      on-click="_clickButton_Filter"
                      data-name="filterby_Categories">
                        <span class="fa fa-inbox" aria-hidden="true"></span>
                        <span class="fa fa-filter" aria-hidden="true"></span>
                    </button>                
                
                    <span class="fa fa-tags" aria-hidden="true" style="margin-right: 6px;"> </span>
                    <span>Categories <span class="badge badge-pill badge-default small">{{categories_selected.length}}</span></span>
                    <span>of <span class="badge badge-pill badge-default small">{{categories.length}}</span></span>
                    
                    <button type="button" 
                      class="btn btn-default navbar-btn btn-outline-danger"
                      on-click="_categoriesSelected_Reset">
                      <span class="fa fa-remove" aria-hidden="true"></span>
                    </button>                
                
                </div>
                
                <div class="card-text" aria-label="...">
                    
                    <template is="dom-repeat" items="{{categories_selected}}" as="_catagory_selected" index-as="_catagory_no">
                    
                          <a type="button"
                              on-click="_clickcategoryselected"
                              href="javascript:void(null);"
                              class="btn btn-outline-secondary text-primary">
                              {{_catagory_selected.name}} <span class="badge badge-pill badge-default small">{{_catagory_selected.count}}</span>
                          </a>
                        
                    </template>
                    
                </div>
                
            </div>
            <!-- EndOf Filter by Categories -->

        </nav>
        <!-- EndOf Toolbar -->


        <!-- Pagination -->
        <div class="card-block" data-name="pagination">
                
                <a href="javascript:void(null);"
                    data-name="previous"
                    class="btn btn-outline-primary disabled"
                    on-click="_clickButton_pagination_Previous">
                    Previous
                 </a>
                   
                <template id="pages_top" is="dom-repeat" items="{{data.pagination._items}}" as="_page" index-as="_page_no">
              
                    <a href="javascript:void(null);"
                        class$="btn btn-outline-primary {{_class_forPagination(_page)}}"
                        on-click="_clickButton_pagination_GotoPage">
                        {{_page.pageNum}}
                     </a>
              
                </template>
            
                <a href="javascript:void(null);"
                    class="btn btn-outline-primary disabled"
                    data-name="next"
                    on-click="_clickButton_pagination_Next">
                    Next
               </a>

        </div>
        <!-- EndOf Pagination -->
        
        
        <br />
      
        <!-- Post Items -->
        <div class="list-group" data-name="posts_list">
        
          <template id="posts_list" is="dom-repeat" items="{{posts_paginated}}" as="_post">
            
            <div class="list-group-item card w-100" data-target$="{{_post.id}}" data-name="post_item">
            
              <h3 class="card-block w-100">
                  <span class="fa fa-chevron-right" aria-hidden="true"></span> {{_post.title}}
              </h3>
              
              <div class="card-text w-100">
                  <span class="h3"><small><span class="fa fa-calendar" aria-hidden="true"></span> {{_post.published}} </small></span>
              </div>
            
              <!-- Layer for Post options... -->
              <div data-name="post-options" class="card-text w-100">

                <!-- Button for show/hidde postProperties -->
                <button type="button" class="btn btn-info" data-name="properties"
                    on-click="_showHideProperties">
                    <span class="fa fa-eye" aria-hidden="true" data-name="icon"></span> 
                    Properties
                    <span class="fa fa-info-circle" aria-hidden="true">
                        </span>
                </button> 
              
                <!-- Layer for postProperties -->
                <div hidden="true" class="card card-text card-outline-info"
                    style="padding: 3px;" 
                    data-name="properties">
                
<!--                   <ul class="list-group card-block"> -->
                    
<!--                     <li class="list-group-item"> -->
<!--                       <span class="fa fa-hand-o-right" aria-hidden="true">&nbsp;</span> -->
<!--                       <span class="h4">URL blog: </span> -->
<!--                       <span class="h5"><a href="{{_post.link}}" target="_blank">{{_post.link}}</a></span> -->
<!--                     </li> -->
                  
<!--                     <li class="list-group-item"> -->
<!--                       <div class="btn-group-sm text-justify card-block" role="group" aria-label="..."> -->
<!--                         <p> -->
<!--                         <span class="fa fa-tags" aria-hidden="true">&nbsp;</span> -->
<!--                         <span class="h4"> Categories: </span> -->
<!--                         </p> -->
                      
<!--                         <template is="dom-repeat" items="{{_post.categories}}" as="_catagory" index-as="_catagory_no"> -->
<!--                           <button class="btn btn-sm btn-link" type="button"> -->
<!--                               {{_catagory}} -->
<!--                           </button>                     -->
<!--                         </template> -->
<!--                       </div> -->
<!--                     </li> -->
                    
<!--                   </ul> -->
                  
                    <div class="card-text">
                      <span class="fa fa-hand-o-right" aria-hidden="true">&nbsp;</span>
                      <span class="h4">URL blog: </span> <br/>
                      <span class="h5 small"><a href="{{_post.link}}" target="_blank">{{_post.link}}</a></span>
                    </div>
                    
                    <div class="card-text">
                       <p>
                        <span class="fa fa-tags" aria-hidden="true">&nbsp;</span>
                        <span class="h4"> Categories: </span>
                      </p>
                    
                      <div class="btn-group-sm text-justify" role="group" aria-label="...">
                      
                        <template is="dom-repeat" items="{{_post.categories}}" as="_catagory" index-as="_catagory_no">
                          <button class="btn btn-sm btn-link" type="button">
                              {{_catagory}}
                          </button>                    
                        </template>
                      </div>
                    </div>
                    
                  
                </div>
              
              
                <!-- Button for show/hidde postDetail -->
                <button type="button" class="btn btn-success" data-name="detail"
                    on-click="_showHideDetail">
                    <span class="fa fa-eye" aria-hidden="true" data-name="icon">
                        </span>
                    Content
                    <span class="fa fa-file" aria-hidden="true">
                        </span>
                </button>            
                
                <!-- Layer for postDetail -->
                <div hidden="true" class="card card-text card-outline-success"
                    style="padding: 3px" 
                    data-name="detail" 
                    data-loaded="false">
                  <div class="card-text" data-name="content">
                  </div>
                </div>            
            
              </div>    <!-- EndOf post-options -->
            
            </div>
            
          </template>
          
        </div>   <!-- EndOf Post Items -->
      

        <br />

        <!-- Pagination -->
        <div class="card-block" data-name="pagination">
                
                <a href="javascript:void(null);"
                    data-name="previous"
                    class="btn btn-outline-primary disabled"
                    on-click="_clickButton_pagination_Previous">
                    Previous
                 </a>
                   
                <template id="pages_down" is="dom-repeat" items="{{data.pagination._items}}" as="_page" index-as="_page_no">
              
                    <a href="javascript:void(null);"
                        class$="btn btn-outline-primary {{_class_forPagination(_page)}}"
                        on-click="_clickButton_pagination_GotoPage">
                        {{_page.pageNum}}
                     </a>
              
                </template>
            
                <a href="javascript:void(null);"
                    class="btn btn-outline-primary disabled"
                    data-name="next"
                    on-click="_clickButton_pagination_Next">
                    Next
               </a>

        </div>
        <!-- EndOf Pagination -->
      
      
      </div>
    </div>
    
    `;
  }
  
}

export default Template;


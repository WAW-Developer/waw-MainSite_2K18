"use strict";

// Import the PolymerElement base class and html helper
import {PolymerElement, html} from '../../thirds/polymer/polymer-element.js';

// Import function 'afterNextRender'
import {afterNextRender} from '../../thirds/polymer/lib/utils/render-status.js';

// Import template repeater
import '../../thirds/polymer/lib/elements/dom-repeat.js';

// Import template
import _template from './webc-waw-posts-list-template.js?v=/* @echo version */';

class WAW_PostsList extends PolymerElement {
  
  static get is() { return "webc-waw-posts-list"; }
  
  static get properties() {
    return {
        mode: {
          type: String,
          value: 'auto'
        },

        posts: {
          type: Array,
          reflectToAttribute: true,
          notify: true,
          value: function() { return []; }

        },
        
        posts_filtered: {
          type: Array,
          reflectToAttribute: true,
          notify: true,
          value: function() { return []; }

        },
        
        posts_paginated: {
          type: Array,
          reflectToAttribute: true,
          notify: true,
          value: function() { return []; }
        },
        
        categories: {
          type: Array,
          reflectToAttribute: true,
          notify: true,
          value: function() { return []; }

        },
        
        categories_selected: {
          type: Array,
          reflectToAttribute: true,
          notify: true,
          value: function() { return []; }

        },
        
        data: {
          type: Object,
          reflectToAttribute: true,
          notify: true,
          value: function() { return {}; }
        }
      }
  }

  
  constructor() {
    super();
  }
  
  
  connectedCallback() {
    super.connectedCallback();
  }
  
  static get template() {
    return _template.fragment;
  }

  ready() {
    super.ready();

    let _this = this;
    
    afterNextRender(this, function() {
        
        _this.set('data.initialized', false);
        
        _this.initialize();
        
    });
    
  }
  
  initialize() {
    
    let _this = this;
    let _JQ = jQuery;
    
    let _initialized = _this.get('data.initialized');
    
    if (_initialized !== false) {
        return;
    }
    
    _this.set('data.initialized', true);
    
    let _shadowRoot = _this.shadowRoot;
    
    // this.set('data._tabs', _shadowRoot.querySelectorAll('ul[role="tablist"] li.nav-item a.nav-link'));
    // this.set('data._tabs_contents', _shadowRoot.querySelectorAll('div.tab-content div[role="tabpanel"]'));
    
    this.set('data._button_filterby_Categories', _shadowRoot.querySelector('button[data-name="filterby_Categories"]'));
    this.set('data._layer_filtered', _shadowRoot.querySelector('div[data-name="posts_count"] span[data-name="filtered"]'));

    this.set('data._layer_loading', _shadowRoot.querySelector('div[data-name="loading"]'));
    this.set('data._layer_pagination', _shadowRoot.querySelector('div[data-name="pagination"]'));
    this.set('data._layer_posts_list', _shadowRoot.querySelector('div[data-name="posts_list"]'));
    
    this.set('data._buttons_prev', _shadowRoot.querySelectorAll('div[data-name="pagination"] a[data-name="previous"]'));
    this.set('data._buttons_next', _shadowRoot.querySelectorAll('div[data-name="pagination"] a[data-name="next"]'));
    
  }
  
  _init_pagination(_options) {
      var _this = this;
      
      // Check options
      _options = (_options === undefined) ? {} : _options;

      // Check options.data
      var _data = (_options.data !== undefined) ? _options.data : _this.get('data');
      // var _data = _this.get('data');
      
      // Init pagination properties
      _data.pagination = {
        'enabled': false,
        'currentPage': 1,
        'itemsForPage': 5,
        '_pages': [],
        '_page': {},
        '_items': []
      };
      
      _this.set('data.pagination', _data.pagination);
      
  }   // EndOF _init_pagination
  
  
  _init_filter(_options) {
      var _this = this;
      
      // Check options
      _options = (_options === undefined) ? {} : _options;

      // Check options.data
      var _data = (_options.data !== undefined) ? _options.data : _this.get('data');
      
      // Init filter properties
      _data.filter = {
        'enabled': false,
        'type': 'categories'
      };
      
      _this.set('data.filter', _data.filter);
      
  }   // EndOF _init_filter

  
  
  _update_list() {
      
      var _this = this;
      var _JQ = jQuery;

      _this._filter();
      _this._paginate();
      _this._paginate_gotoPage();
      
      var _filter = _this.get('data.filter');
      
      // var _button = _JQ(_this.shadowRoot).find('button[data-name="filterby_Categories"]');
      // var _layer_filtered = _JQ(_this.shadowRoot).find('div[data-name="posts_count"] span[data-name="filtered"]');
      
      let _button = this.get('data._button_filterby_Categories');
      let _layer_filtered = this.get('data._layer_filtered');

      _JQ(_button).toggleClass( 'btn-success', _filter.enabled );
      _JQ(_button).toggleClass( 'active', _filter.enabled );

      _JQ(_layer_filtered).toggle( _filter.enabled );

      
  }   // EndOF _update_list
  
  
  _loading(_options) {
      var _this = this;
      var _JQ = jQuery;
      
      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Check options.loading
      var _loading = (_options.loading !== undefined) ? _options.loading : false;

      // var _layer_loading = _JQ(_this.shadowRoot).find('div[data-name="loading"]');
      // var _layer_pagination = _JQ(_this.shadowRoot).find('div[data-name="pagination"]');
      // var _layer_posts_list = _JQ(_this.shadowRoot).find('div[data-name="posts_list"]');
      
      let _layer_loading = this.get('data._layer_loading');
      let _layer_pagination = this.get('data._layer_pagination');
      let _layer_posts_list = this.get('data._layer_posts_list');
      
      _JQ(_layer_loading).toggle(_loading);
      _JQ(_layer_pagination).toggle(!_loading);
      _JQ(_layer_posts_list).toggle(!_loading);

  }   // EndOF _loading
  
  
  set_topic(_options) {
      
      var _this = this;
      var _JQ = jQuery;

      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Check options.topic
      var _topic = (_options.topic !== undefined) ? _options.topic : _this.get('data.topic');
      
      // Check options.loading
      var _loading = (_options.loading !== undefined) ? _options.loading : false;
      _this._loading({
          'loading': _loading
      });
      
      if (_topic === undefined) {
          return;
      }
      
      // Check post list properties
      if (_topic._model._rss._posts_list === undefined) {
         
          _topic._model._rss._posts_list = {};
          
          _this._init_pagination({
              'data': _topic._model._rss._posts_list
          });
          
          _this._init_filter({
              'data': _topic._model._rss._posts_list
          });
      }
      
      // Apply post list properties
      _this.set('data.pagination', _topic._model._rss._posts_list.pagination);
      _this.set('data.filter', _topic._model._rss._posts_list.filter);
      

      _this.set('data.topic', {});
      _this.set('data.topic', _topic);

      
      // Refresh posts
      _this.set_posts({
          'posts': _topic._model._rss.feed.entries
      });

      // Refresh categories
      _this.set_categories({
          'categories': _topic._model._rss.categories
      });
      
      
  }  // EndOf set_topic
  
  
  set_posts(_options) {
      
      var _this = this;
      
      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Check options.posts
      var _posts = (_options.posts !== undefined) ? _options.posts : _this.get('posts');
          
      // clear an array and add new values
      _this.set('posts', []);  
      _posts.forEach(function(_item, _id) {
          
          _item._model = (_item._model !== undefined) ? _item._model : {};
          
          if (_item._model._posts_list === undefined) {
              _item._model._posts_list = {
                'show_details': false,
                'show_content': false
              };
          }
          
          _this.push('posts', _item);
      });
      

  }   // EndOf set_posts
  
  
  set_categories(_options) {
      
      var _this = this;
      
      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Check options.categories
      var _categories = (_options.categories !== undefined) ? _options.categories : _this.get('categories');
      
      // clear an array and add new values
      _this.set('categories', []);
      _categories.forEach(function(_item, _i) {
          _this.push('categories', _item);
      });
      
      _this._get_categories_selected();
      
      var _cat_selected =  this.get('categories_selected');
      if (_cat_selected.length === 0) {
          _this.data.filter.enabled = false;
      }
      
      _this._update_list();
      
  }   // EndOf set_categories


  _get_categories_selected(_options) {
      
      var _this = this;
      // var _dom = Polymer.dom(_this).node.root;
      let _shadowRoot = _this.shadowRoot;
      var _categories = _this.categories;

      var _JQ = jQuery;
      
      
      var _categories_selected = _categories.filter(function(_category, _i) {
         
          if (_category._model !== undefined &&
                  _category._model._selected === true) {
              return true;
          }
      });
      
      
      // clear an array and add new values
      _this.set('categories_selected', []);
      _categories_selected.forEach(function(_item, _i) {
          _this.push('categories_selected', _item);
      });
      
      
      // Show or hide categories layer
      // var _layer_categories = _JQ(_dom).find('nav[data-name="toolbar"] div[data-name="categories"]');
      var _layer_categories = _shadowRoot.querySelectorAll('nav[data-name="toolbar"] div[data-name="categories"]');
      
      if (_categories_selected.length > 0) {
          _JQ(_layer_categories).show();
      } else {
          _JQ(_layer_categories).hide();
      }
      
  }   // EnfOf _get_categories_selected
  
  
  _categoriesSelected_Reset(_event) {
      
      var _this = this;

      var _categories = _this.get('categories');
      
      _categories.forEach(function(_category, _i) {
          
          if (_category._model !== undefined) {
              _category._model._selected = false;
          }
      });
      
      
      _this.set_categories(
              { 'categories': _categories });
      
      _this.dispatchEvent(new CustomEvent('selectedcategoriesreset', {
          'detail': {}
      }));


  }   // EndOf categoriesSelected_Reset
  
  
  
  _clickcategoryselected(_event) {
      
      var _this = this;

      var _category = _event.model.__data._catagory_selected;

      _category._model._selected = false;
      _this.set_categories();
      
      _this.dispatchEvent(new CustomEvent('categoryclicked', {
          'detail': {
              'category': _category
          }
      }));

      
  }   // EndOf _clickcategoryselected
  
  
  _showHideProperties(_event) {
      
      var _JQ = jQuery;
      
      var _event_source = (_event.srcElement !== undefined) ? _event.srcElement : _event.originalTarget;
      
      var _div_properties = _JQ(_event_source).closest('div.list-group-item').find('div[data-name="properties"]');
      var _hidden = _JQ(_div_properties).attr('hidden');
      
      var _div_button = _JQ(_event_source).closest('div.list-group-item').find('button[data-name="properties"]');
      var _span_button = _JQ(_div_button).find('span[data-name="icon"]');


      if (_hidden === 'hidden') {
          
        _JQ(_div_properties).removeAttr( 'hidden' );
        _JQ(_div_button).addClass( 'active' );
        _JQ(_span_button).removeClass( 'fa-eye' );
        _JQ(_span_button).addClass( 'fa-eye-slash' );
          
      } else {
          _JQ(_div_properties).attr('hidden', "true");
          _JQ(_div_button).removeClass( 'active' );
          _JQ(_span_button).removeClass( 'fa-eye-slash' );
          _JQ(_span_button).addClass( 'fa-eye' );

      }
      
      
  }   // EndOf _showHideProperties
  
  
  _showHideDetail(_event) {
      
      var _JQ = jQuery;
      
      var _event_source = (_event.srcElement !== undefined) ? _event.srcElement : _event.originalTarget;
      
      var _div_detail = _JQ(_event_source).closest('div.list-group-item').find('div[data-name="detail"]');
      var _hidden = _JQ(_div_detail).attr('hidden');
      
      var _div_button = _JQ(_event_source).closest('div.list-group-item').find('button[data-name="detail"]');
      var _span_button = _JQ(_div_button).find('span[data-name="icon"]');
      
      // Paint detail content
      if (_JQ(_div_detail).attr('data-loaded') === 'false') {
          
          var _post = _event.model.__data._post;
          _JQ(_div_detail).find('div[data-name="content"]').html(_post.content);
          _JQ(_div_detail).attr('data-loaded', "true");
      } 
      
      
      if (_hidden === 'hidden') {
          
          _JQ(_div_detail).removeAttr( 'hidden' );
          _JQ(_div_button).addClass( 'active' );
          _JQ(_span_button).removeClass( 'fa-eye' );
          _JQ(_span_button).addClass( 'fa-eye-slash' );
            
      } else {
          _JQ(_div_detail).attr('hidden', "true");
          _JQ(_div_button).removeClass( 'active' );
          _JQ(_span_button).removeClass( 'fa-eye-slash' );
          _JQ(_span_button).addClass( 'fa-eye' );

      }

      
  }   // EndOf _showHideDetail
  
  
  _class_forPagination(_page) {
      return _page.selected === true ? 'active' : '';
  }   // EndOf _class_forPagination
  
  
  _class_forButtonFilterByCategories() {
      
      var _this = this;
      var _filter = _this.get('data.filter');

      return _filter.enabled === true ? 'btn-success active' : '';
  }   // EndOf _class_forButtonFilterByCategories
  
  
  _filter(_options) {
      
      var _this = this;
      var _JQ = jQuery;

      var _filter = _this.get('data.filter');
      var _filter_type = _filter.type;

      
      _this.set('posts_filtered', []);
      var _posts_filtered = [];
      
      
      if (_filter.enabled !== true) {
//           _posts_filtered = _this.get('posts');
          _filter_type = '';
      }

      
      switch (_filter_type) {
        
        case 'categories':
                
          var _posts = _this.get('posts');
          var _categories_selected = _this.get('categories_selected');
          var _categories_list = [];
            
          _categories_selected.forEach(function(_cat, _i) {
            _categories_list.push(_cat.name);
          });
            
          _posts_filtered = _posts.filter(function(_post, _i) {
              return _post.categories.some(function(_cat, _j) {
                  return (_categories_list.indexOf(_cat) >= 0);
              });
          });
          
          break;

        default:
            _posts_filtered = _this.get('posts');
            break;
      }
      
      
      _filter._posts_filtered = _posts_filtered;
      
      _posts_filtered.forEach(function(_item, _i) {
          _this.push('posts_filtered', _item);
      });
      
      
  }   // EndOf _filter
  
  
  _paginate(_options) {
      
      var _this = this;
      var _pagination = _this.get('data.pagination');
      var _filter = _this.get('data.filter');

      // Check pagination
      if (_pagination === undefined) {
          _this._init_pagination();
          _pagination = _this.get('data.pagination');
      }
      
      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Check options.itemsForPage
      var _itemsForPage = (_options.itemsForPage !== undefined) ? _options.itemsForPage : _pagination.itemsForPage;

      var _posts = _this.get('posts_filtered');
      
      // _pagination.currentPage = 1;
      _pagination._pages = {};
      
      var _i,_j,_k=0;
      for (_i = 0, _j = _posts.length; _i < _j; _i += _itemsForPage) {
          _k++;
          _pagination._pages['page_'+ _k] = {
            'pageNum': _k,
            'items': _posts.slice(_i, _i + _itemsForPage)
          };
      }
      
      // check correct current page
      if (_pagination.currentPage > _k) {
          _pagination.currentPage = 1;
      }

  }   // EndOf _paginate
  
  
  _paginate_gotoPage(_options) {
      
      var _this = this;
      var _JQ = jQuery;
      
      var _pagination = _this.get('data.pagination');
      
      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Check options.currentPage
      var _currentPage = (_options.currentPage !== undefined) ? _options.currentPage : _pagination.currentPage;
      
      _pagination._page.selected = false;
      
      
      if ( (_currentPage <= _pagination._items.length) && 
              (_currentPage >= 1) ) {
          _pagination._page = _pagination._pages['page_' + _currentPage];
      } else {
          _pagination._page = _pagination._pages['page_1'];
      }
      
      
      //_pagination._page = (_pagination._page !== undefined) ? _pagination._page : {};
      if (_pagination._page === undefined) {
          _pagination._page = {
              'items': []
          }
      }
      
      _pagination._page.selected = true;
      
      _pagination.currentPage = _currentPage;
      
      // update post paginated
      _this.set('posts_paginated', []);  
      _pagination._page.items.forEach(function(_item, _i){
          _this.push('posts_paginated', _item);
      });
      
      
      // Update pagintaion items and render paginators
      _this.set('data.pagination._items', []);
      
      _this.shadowRoot.querySelector('#pages_top').render();
      _this.shadowRoot.querySelector('#pages_down').render();
      
      for (var _key in _pagination._pages) {
          _this.push('data.pagination._items', _pagination._pages[_key]);
      }
      
      _this.shadowRoot.querySelector('#pages_top').render();
      _this.shadowRoot.querySelector('#pages_down').render();
      
      // Update 'next' and 'prev' button
      let _prev = this.get('data._buttons_prev');
      let _next = this.get('data._buttons_next');
      
      if (_currentPage > 1) {
          _JQ(_prev).removeClass('disabled');
      } else {
          _JQ(_prev).addClass('disabled');
      }
      
      if (_currentPage < _pagination._items.length) {
          _JQ(_next).removeClass('disabled');
      } else {
          _JQ(_next).addClass('disabled');
      }
      
      
      // Close details and properties
      // var _layer_post_options = _JQ(_this.shadowRoot).find('div[data-name="post-options"]');
      
      // let _layer_post_options = this.get('data._layer_post_options'); 
      let _layer_post_options = _this.shadowRoot.querySelectorAll('div[data-name="post-options"]');
      
      var _button_properties = _JQ(_layer_post_options).find('button[data-name="properties"]');
      var _layer_properties = _JQ(_layer_post_options).find('div[data-name="properties"]');
      var _button_detail = _JQ(_layer_post_options).find('button[data-name="detail"]');
      var _layer_detail = _JQ(_layer_post_options).find('div[data-name="detail"]');
      
      _JQ(_layer_properties).attr('hidden', "true");
      _JQ(_button_properties).removeClass( 'active' );

      _JQ(_layer_detail).attr('hidden', "true");
      _JQ(_button_detail).removeClass( 'active' );
      
      var _span_button = _JQ(_layer_post_options).find('button span[data-name="icon"]');
      _JQ(_span_button).removeClass( 'fa-eye-slash' );
      _JQ(_span_button).addClass( 'fa-eye' );
      
      _JQ(_layer_detail).find('div[data-name="content"]').html('');
      _JQ(_layer_detail).attr('data-loaded', 'false');
      
      // Animate to header (is optional)
      let _animateToscrollTop = (_options.animateToscrollTop !== undefined) ? _options.animateToscrollTop : false;
      if (_animateToscrollTop === true) {
        _JQ('html, body').animate({
          scrollTop: _JQ(_this.shadowRoot.querySelectorAll('div[data-name="header"]')).offset().top
        }, 200);
      }

  }   // EndOf _paginate_goToPage

  
  _clickButton_pagination_GotoPage(_event) {
      
      var _this = this;
      var _pageNum = _event.model.__data._page.pageNum;
      
      _this._paginate_gotoPage({
          'currentPage': _pageNum,
          'animateToscrollTop': true
      });
      
  }   // EndOf _clickButton_pagination_GotoPage
  
  
  _clickButton_pagination_Previous(_event) {
      
      var _this = this;
      var _pagination = _this.get('data.pagination');
      var _currentPage = _pagination.currentPage;

      _currentPage--;

      _this._paginate_gotoPage({
          'currentPage': _currentPage,
          'animateToscrollTop': true
      });
      
  }   // EndOf _clickButton_pagination_Previous
  
  
  _clickButton_pagination_Next(_event) {
      
      var _this = this;
      var _pagination = _this.get('data.pagination');
      var _currentPage = _pagination.currentPage;

      _currentPage++;

      _this._paginate_gotoPage({
          'currentPage': _currentPage,
          'animateToscrollTop': true
      });
      
  }   // EndOf _clickButton_pagination_Next

  
  _clickButton_Filter(_event) {
      
      var _this = this;
      var _filter = _this.get('data.filter');
      
      _filter.enabled = !_filter.enabled;
      
      _this._update_list();
  }


}


//Register the new element with the browser
customElements.define(WAW_PostsList.is, WAW_PostsList);


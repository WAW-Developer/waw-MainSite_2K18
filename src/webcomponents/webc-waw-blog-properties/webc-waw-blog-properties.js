"use strict";

// Import the PolymerElement base class and html helper
import {PolymerElement, html} from '../../thirds/polymer/polymer-element.js';

// Import function 'afterNextRender'
import {afterNextRender} from '../../thirds/polymer/lib/utils/render-status.js';

//Import template repeater
import '../../thirds/polymer/lib/elements/dom-repeat.js';

// Import template
import _template from './webc-waw-blog-properties-template.js';


class WAW_BlogProperties extends PolymerElement {
  static get is() { return "webc-waw-blog-properties"; }
  
  static get properties() {
    return {
      mode: {
          type: String,
          value: 'auto'
        },

        data: {
          type: Object,
          reflectToAttribute: true,
          notify: true,
          value: function() { return {}; }
        },
        
        categories: {
            type: Array,
            reflectToAttribute: true,
            notify: true,
            value: function() { return []; }

        }
    }
  }
  
  
  static get template() {
    return _template.fragment;
  }
  
  
  
  constructor() {
    super();
//     this.textContent = "I'm a custom-element.";
  }
  
  connectedCallback() {
    super.connectedCallback();
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

    
    this.set('data._tabs', _shadowRoot.querySelectorAll('ul[role="tablist"] li.nav-item a.nav-link'));
    this.set('data._tabs_contents', _shadowRoot.querySelectorAll('div.tab-content div[role="tabpanel"]'));
    this.set('data._layer_loading', _shadowRoot.querySelector('div[data-name="loading"]'));

    
  }
  
  _category_Class(_selected) {

      return (_selected === true) ? 'btn-success' : 'btn-secondary';
      
  }    // EndOf _category_Class

  
  set_topic(_options) {
      
      var _this = this;
      var _JQ = jQuery;
      
      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Check options.topic
      var _topic = (_options.topic !== undefined) ? _options.topic : _this.get('data.topic');

      _this.set('data.topic', {});
      _this.set('data.topic', _topic);
      
      
      var _rss_loaded = (_topic._model._rss.loaded !== undefined) ? _topic._model._rss.loaded : false;

      // Update layer for loading
      let _layer_loading = this.get('data._layer_loading');
      _JQ(_layer_loading).toggle(!_rss_loaded);

      // Refresh categories
      if (_topic._model._rss.loaded === true) {
          _this.set_categories({
              'categories': _topic._model._rss.categories
          });
      } else {
          _this.set_categories({
              'categories': []
          });
      }
      
      _this._orderCategories();

  }  // EndOf set_topic       
  
  
  set_categories(_options) {
      
      var _this = this;
      
      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Check options.categories
      var _categories = (_options.categories !== undefined) ? _options.categories : _this.get('categories');

      // clear an array and add new values
      _this.set('categories', []);
      
      _this.shadowRoot.querySelector('#categories_list').render();
      
      _categories.forEach(function(_item, _i){
          
          _item._model = (_item._model !== undefined) ? _item._model : {};
          _item._model._selected = (_item._model._selected !== undefined) ? _item._model._selected : false;

          _this.push('categories', _item);
      });
      
      
      
  }    // EndOf set_categories       
  
  
  
  _click_tab(_event) {
    
    // console.log('WebC_BlogProperties _click_tab');    // TODO: REMOVE DEBUG LOG
    // console.log(_event);    // TODO: REMOVE DEBUG LOG
    
    // let _index = _event.model.index;
    // let _item = _event.model._entityItem;
    let _target = _event.target;
    // console.info('target is:', _target);  // TODO: REMOVE DEBUG LOG
    
    let _data_name = _target.getAttribute("data-name");
    // console.info('data-name is:', _data_name); // TODO: REMOVE DEBUG LOG
    
    let _tabs = this.get('data._tabs');
    let _tabs_contents = this.get('data._tabs_contents');
    
    // @see https://www.w3schools.com/w3css/w3css_tabulators.asp
    for (var _i = 0; _i < _tabs.length; _i++) {
      
      let _link = _tabs[_i];
      // let _link = _current_tab.querySelector('a.nav-link');  // not working
      
      _link.className = _link.className.replace(" active", "");
      
      if (_link.getAttribute("data-name") === _data_name) {
        _link.className += " active";
      }
    }
    
    // @see https://www.w3schools.com/w3css/w3css_tabulators.asp
    for (var _i = 0; _i < _tabs_contents.length; _i++) {
      
      let _current_tab = _tabs_contents[_i];
      _current_tab.style.display = "none";
      
      if (_current_tab.getAttribute("data-name") === _data_name) {
        _current_tab.style.display = "block";
      }
    }

  }
  
  
  
  _orderCategories(_event) {
      
      var _this = this;
      var _data = _this.data;

//       var _rss = _this.get('data.topic._model._rss');
//       var _categories = _rss.categories;
      
      var _categories = _this.get('categories');

      
      var _JQ = jQuery;
      
      var _orderType = "count"
      
      if (_event !== undefined && 
              ((_event.srcElement !== undefined) ||
                _event.originalTarget !== undefined)) {
          
          var _event_source = (_event.srcElement !== undefined) ? _event.srcElement : _event.originalTarget;
          _orderType = _JQ(_event_source).closest('button').attr('data-order');
          
      } else if (_event !== undefined && _event.orderType !== undefined) {
          _orderType = _event.orderType;
      } else if (_data._orderType !== undefined) {
          _orderType = _data._orderType;
      }
      
      _data._orderType = _orderType;
      
      
      switch(_orderType) {
      
        case "name":
            _categories.sort(function(a, b) {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
          });
          break;
              
        case "count":
            _categories.sort(function(a, b) {
              if (a.count > b.count) return -1;
              if (a.count < b.count) return 1;
              return 0;
          });
          break;
            
        default:
            break;
      }

      _this.set_categories({
          'categories': _categories
      });
      
  }    // EndOf orderCategories
  
  
  _clickcategory(_event) {
      
      var _this = this;

      
      var _event_source = (_event.srcElement !== undefined) ? _event.srcElement : _event.originalTarget;
      
      var _category = _event.model.__data._category;

      _category._model = (_category._model === undefined) ? {} : _category._model;
      _category._model._selected = (_category._model._selected === undefined) ? false : _category._model._selected;

      var _JQ = jQuery;
      
      var _button = _JQ(_event_source).closest('a');
      
      /*
      if (_category._model._selected !== true) {
          
          _JQ(_button).removeClass( 'btn-link' );
          _JQ(_button).addClass( 'bg-success' );
          _category._model._selected = true;
          
      } else {
          
          _JQ(_button).removeClass( 'bg-success' );
          _JQ(_button).addClass( 'btn-link' );
          _category._model._selected = false;
      }
      */
      
//       _JQ(_button).toggleClass( 'btn-outline-warning', !!_category._model._selected );
//       _JQ(_button).toggleClass( 'btn-outline-secondary', !_category._model._selected );
      
      _category._model._selected = !_category._model._selected;
      
      _this.set_categories();
      
//       _this.shadowRoot.querySelector('#categories_list').render();
      
//       _JQ(_button).refresh();
//       _this.set_categories();
//       _this.shadowRoot.querySelector('#categories_list').render();
      
      var _event_Detail = {
          'category': _category
      };

      _this.dispatchEvent(new CustomEvent('catepgoryclicked', {
          'detail': _event_Detail
      }));
      
//       _this.fire('catepgoryclicked', {
//           'category': _category
//           });
      
      
  }    // EndOf _clickcategory
  
  
  
}

customElements.define(WAW_BlogProperties.is, WAW_BlogProperties);


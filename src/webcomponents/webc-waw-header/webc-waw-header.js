"use strict";

// Import the PolymerElement base class and html helper
import {PolymerElement, html} from '../../thirds/polymer/polymer-element.js';

// Import function 'afterNextRender'
import {afterNextRender} from '../../thirds/polymer/lib/utils/render-status.js';

//Import template repeater
import '../../thirds/polymer/lib/elements/dom-repeat.js';


//Import template
import _template from './webc-waw-header-template.js';

class WAW_Header extends PolymerElement {
  static get is() { return "webc-waw-header"; }
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

      topics: {
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

    var _this = this;
    
    var _mainsite = waw_mainsite;

    
    _this.set('data.version', _mainsite._version)

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

    
    //this.set('data._tabs', _shadowRoot.querySelectorAll('ul[role="tablist"] li.nav-item a.nav-link'));
    //this.set('data._tabs_contents', _shadowRoot.querySelectorAll('div.tab-content div[role="tabpanel"]'));
    
    this.set('data._modalFor_AboutWeb', _shadowRoot.querySelector('div.modal[data-name="aboutweb"]'));
    this.set('data._modalFor_AboutWAW', _shadowRoot.querySelector('div.modal[data-name="aboutwaw"]'));

  }
  
  
  _itemclicked(_e, _detail) {

    var _this = this;
    let _data_target = _e.model._topic.id;
    
    var _event_Detail = {
        'data-target': _data_target
    };

    _this.dispatchEvent(new CustomEvent('itemclicked', {
        'detail': _event_Detail
    }));

  }
  
  
  _topic_Class(_topic) {
      return _topic._model.selected === true ? 'active' : '';
  }

  
  _click_buttonMenuToggle(_event) {
      
      let _shadowRoot = this.shadowRoot;
      var _JQ = jQuery;
      
      let _button = _shadowRoot.querySelector('button[data-name="buttonMenuToggle"]');
      let _layer = _shadowRoot.querySelector('div[data-name="menuCollapsable"]');
      
      _JQ(_layer).toggleClass('collapse');
      _JQ(_button).toggleClass('active');
      
  }
  
  _click_dropdown(_event) {
    
    let _shadowRoot = this.shadowRoot;
    let _JQ = jQuery;
    let _target = _event.target;
    
    let _dropdown_menu = _JQ(_target).parent().find('div.dropdown-menu')[0];  // layer for dropdown menu
    let _button = _shadowRoot.querySelector('a[data-toggle="dropdown"]');
 
    let _state = _dropdown_menu.getAttribute('data-state'); // check state
    
    switch (_state) {
      case 'closed':
        _dropdown_menu.setAttribute('data-state', 'open');
        _JQ(_button).addClass('active');
        break;
  
      default:
        _dropdown_menu.setAttribute('data-state', 'closed');
        _JQ(_button).removeClass('active');
        break;
    }

  }
  
  
  _show_modal_aboutweb(_event) {
      
      var _this = this;
      var _JQ = jQuery;
      
      // var _modal = _JQ(_this.shadowRoot).find('div[role="dialog"][data-name="aboutweb"]');
      let _modal = this.get('data._modalFor_AboutWeb');
      
      _JQ(_modal).modal('show');
      
  }

  _show_modal_aboutwaw(_event) {
      
      var _this = this;
      var _JQ = jQuery;
      
      // var _modal = _JQ(_this.shadowRoot).find('div[role="dialog"][data-name="aboutwaw"]');
      let _modal = this.get('data._modalFor_AboutWAW');
      _JQ(_modal).modal('show');
      
  }
  
  _download_config() {
    // window.location.href = "js/config.json";
    window.open('config/config.json?v=/* @echo version */');
  }
  
  
  set_topics(_options) {
      
      var _this = this;
      
      _options = (_options !== undefined) ? _options: {};
      var _topics = (_options.topics !== undefined) ? _options.topics : _this.get('topics');
      
       // clear an array
      _this.set('topics', []);
      _this.$.topics_list.render();
   
      _topics.forEach(function(_item, _id){
//           _data.topics.push(_item);

          if (_item._model === undefined) {
              _item._model = {};
          }
          
          _item._model.selected = (_item._model.selected === true) ? true : false;

          _this.push('topics', _item);
      });
      
  }
  
  
  set_active_topic(_options) {
      
    var _this = this;
    var _topic_ID = _options.topic;
    var _data = _this.data;
    var _topics = _this.topics;
    
    _topics.forEach(function(_topic, _i) {
        _this.set('topics.' + _i + '._model.selected', _topic.id === _topic_ID ? true: false);
        });
    
    _this.set_topics();

  }

    
}


// Register the new element with the browser
customElements.define(WAW_Header.is, WAW_Header);
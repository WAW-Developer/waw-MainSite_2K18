"use strict";

// Import the PolymerElement base class and html helper
import {PolymerElement, html} from '../../thirds/polymer/polymer-element.js';

// Import function 'afterNextRender'
import {afterNextRender} from '../../thirds/polymer/lib/utils/render-status.js';


// Import template
import _template from './webc-waw-topic-detail-template.js';

class WAW_TopicDetail extends PolymerElement {
  static get is() { return "webc-waw-topic-detail"; }
  
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
        }
    }
  }
  
  
  constructor() {
    super();
//     this.textContent = "I'm a custom-element.";
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
    
    this.set('data._layer_img', _shadowRoot.querySelector('div[data-name="image"]'));
    this.set('data._button_blog', _shadowRoot.querySelector('a.btn[data-name="blog"]'));
    this.set('data._button_info', _shadowRoot.querySelector('a.btn[data-name="information"]'));
  }
  
  
  _update(_options) {
      var _this = this;
      var _topic = _this.get('data.topic');
      
      var _JQ = jQuery;
      
      let _layer_img = this.get('data._layer_img');
      let _button_blog = this.get('data._button_blog');
      let _button_info = this.get('data._button_info');

      if (_topic.iconImage !== undefined && 
              _topic.iconImage !== null ) {
          _JQ(_layer_img).show();
      } else {
          _JQ(_layer_img).hide();
      }
      
      if (_topic.url_blog !== undefined && 
              _topic.url_blog !== null ) {
          _JQ(_button_blog).show();
      } else {
          _JQ(_button_blog).hide();
      }
      
      if (_topic.url_main !== undefined && 
              _topic.url_main !== null ) {
          _JQ(_button_info).show();
      } else {
          _JQ(_button_info).hide();
      }
  }
  
  set_topic(_options) {
      
    var _this = this;
    var _topic = _options.topic;
    
    var _JQ = jQuery;
    
    _this.set('data.topic', _topic);
    
    // Paint description
    var _description = '';
    
    if (Array.isArray(_topic.summary) === true) {
        _topic.summary.forEach(function(_line, _i) {
            _description = _description + _line;
        });
    } else {
        _description = _topic.summary;
    }
    
    
    // Polymer.dom(_this.$.description).innerHTML =_description;
    _this.$.description.innerHTML =_description;
    
    _this._update();
    
  }
  
  
}

// Register the new element with the browser
customElements.define(WAW_TopicDetail.is, WAW_TopicDetail);
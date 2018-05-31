"use strict";

// Import the PolymerElement base class and html helper
import {PolymerElement, html} from '../../thirds/polymer/polymer-element.js';

// Import function 'afterNextRender'
import {afterNextRender} from '../../thirds/polymer/lib/utils/render-status.js';

// Import template repeater
import '../../thirds/polymer/lib/elements/dom-repeat.js';

// Import template
import _template from './webc-waw-footer-template.js';


class WAW_Footer extends PolymerElement {
  static get is() { return "webc-waw-footer"; }
  
  static get properties() {
    return {
      mode: {
          type: String,
          value: 'auto'
        },

      topics: {
          type: Array,
          reflectToAttribute: true,
          notify: true,
          value: function() { return []; }

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
    
    // let _shadowRoot = _this.shadowRoot;
    
    // this.set('data._tabs', _shadowRoot.querySelectorAll('ul[role="tablist"] li.nav-item a.nav-link'));
    // this.set('data._tabs_contents', _shadowRoot.querySelectorAll('div.tab-content div[role="tabpanel"]'));
  }
  
}


// Register the new element with the browser
customElements.define(WAW_Footer.is, WAW_Footer);


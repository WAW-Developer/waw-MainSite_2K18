"use strict";

// Import the PolymerElement base class and html helper
import {PolymerElement, html} from '../../thirds/polymer/polymer-element.js';

// Import function 'afterNextRender'
import {afterNextRender} from '../../thirds/polymer/lib/utils/render-status.js';

// Import template repeater
import '../../thirds/polymer/lib/elements/dom-repeat.js';

// Import template
import _template from './webc-waw-topics-list-template.js?v=/* @echo version */';


class WAW_TopicsList extends PolymerElement {
  static get is() { return "webc-waw-topics-list"; }
  
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
    
    // let _shadowRoot = _this.shadowRoot;
    
    // this.set('data._tabs', _shadowRoot.querySelectorAll('ul[role="tablist"] li.nav-item a.nav-link'));
    // this.set('data._tabs_contents', _shadowRoot.querySelectorAll('div.tab-content div[role="tabpanel"]'));
    
  }
  
  
  _itemclicked(_e, _topic) {

    var _this = this;
    var _data_target = _e.model.__data._topic.id;
      
    _this.set_active_topic({
        'topic': _data_target
    });
    
    var _event_Detail = {
        'data-target': _data_target
    };

    _this.dispatchEvent(new CustomEvent('itemclicked', {
        'detail': _event_Detail
    }));
    
  }
  
  
  _topic_Class(_selected) {

      return _selected === true ? 'active' : '';
  }

  
  _topicImage_Class(_selected) {

      return _selected === true ? 'blinking' : '';
  }
  
  set_topics(_options) {
      
      var _this = this;
      var _topics = _options.topics;
      
      // clear an array
      _this.set('topics', []);

      _topics.forEach(function(_item, _id){
//           _data.topics.push(_item);

          _item._model = (_item._model !== undefined) ? _item._model : {};
          
          // _item._model.selected = (_item._model.selected === true) ? true : false;
          _item._model.selected = false;

          _this.push('topics', _item);
      });

  }
  
  
  set_active_topic(_options) {
      
      var _this = this;
      var _topics = _this.topics;
//       var _topics = _this.data.topics.slice(0);

     // Check options
     _options = (_options === undefined) ? {} : _options;

     // Check options.topic
     var _topic_ID = (_options.topic !== undefined) ? _options.topic : null;

     // Check options.none
     var _none = (_options.none !== undefined ) ? _options.none : false;
      
      _topics.forEach(function(_topic, _i) {
//           _topic._model.selected = _topic.id === _topic_ID ? true: false;
          _this.set('topics.' + _i + '._model.selected', ((_topic.id === _topic_ID) && (_none !== true)) ? true : false);
      });
          
  }
  
}

// Register the new element with the browser
customElements.define(WAW_TopicsList.is, WAW_TopicsList);



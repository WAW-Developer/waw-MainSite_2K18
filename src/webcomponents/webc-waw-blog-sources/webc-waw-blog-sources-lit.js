"use strict";

// Import the LitElement base class and html helper
import {LitElement, html} from '../../thirds/lit-element/lit-element.js';

// import repeat
import { repeat } from '../../thirds/lit-html/lib/repeat.js';

// Import template
import _template from './webc-waw-blog-sources-template.js';


export class WAW_BlogSources extends LitElement {
  
  static get properties() {
      return {
        data: {
          type: Object,
          reflectToAttribute: false,
          notify: true,
          value: function() { return {}; }
        },
        
        sources: {
          type: Array,
          reflectToAttribute: false,
          notify: true,
          value: function() { return []; }
        }
        
      };
  }

  connectedCallback() {
      super.connectedCallback();
  }

  constructor() {
      super();
      // this.onClick = this.onClick.bind(this);
  }
  
  _render() {
    return _template.fragment;
  }
  
  onClick() {
      /*
      this.dispatchEvent(new CustomEvent('buy', { 
          detail: { 
              count: this.$('counter').value 
          } 
      }));
      */
  }

  
  _loading(_options) {
    
    var _this = this;
    var _JQ = jQuery;
    
    return new Promise(function(_resolve, _reject) {
      try {
          
        // Check options
        _options = (_options === undefined) ? {} : _options;
        
        // Check options.loading
        var _loading = (_options.loading !== undefined) ? _options.loading : false;

        // Update layer for loading
        let _layers_loading = _this.shadowRoot.querySelectorAll('div[data-name="loading"]');
        let _layers_content = _this.shadowRoot.querySelectorAll('div[data-name="content"]');
        
        _JQ(_layers_loading).toggle(_loading);
        _JQ(_layers_content).toggle(!_loading);
        
        // resolve with some time extra for animations...
        setTimeout(function() { 
            _resolve({
                'result': 'OK'
            });
            
        }, 200);
          
      } catch (_e) {
          _reject(_e);
      }
    });

  }   // EndOF _loading  
  
  
  _init_chart_SourcesUsed(_options) {
    
    let _this = this;
    let _JQ = jQuery;
    
    // Check options
    _options = (_options === undefined) ? {} : _options;
    
    let _topic = this.get('data.topic');
    let _feed_DATA = _topic._model._rss.feed_DATA; 

    // Destroy chart if exists...
    let _chart_SourcesUsed_cache = this.get('data.chart_SourcesUsed');
    if (_chart_SourcesUsed_cache !== undefined) { _chart_SourcesUsed_cache.destroy(); }

    let _source_hosts = _feed_DATA.source_hosts;
    let _max_items = 10; // only display the first 10 items
    let _source_hosts_Used = _source_hosts.slice(0, _max_items); 
    
    let _chart_labels = [];
    let _chart_data = [];

    let _others = 0;  // counter for other items 
    
    _source_hosts_Used.forEach(function(_item, _i) {  // add items to chart data and labels
        _chart_labels.push(_item.host);
        _chart_data.push(_item.count);
        _others++;
    });
    
    // Add others to chat dta and labels
    _others = _source_hosts.length - _others;
    _chart_labels.push('others');
    _chart_data.push(_others);
    
    let _layer_chart_SourcesUsed = this.shadowRoot.querySelector('canvas[data-name="chart_SourcesUsed"]');
    
    let _data = { // Setup chat data
        labels: _chart_labels,
        datasets: [
          {
            data: _chart_data,
            backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB",
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB",
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB"
            ]
        }]
    };
    
    let _chart_SourcesUsed = new Chart(_layer_chart_SourcesUsed, {  // create the chart
        type: 'doughnut',
        data: _data
    });
    
    this.set('data.chart_SourcesUsed', _chart_SourcesUsed); // set the chart into element data
    
  } // EndOf _init_chart_SourcesUsed
  
  
  _init_charts(_options) {
    this._init_chart_SourcesUsed();
  }  
  
  
  set_topic(_options) {
    
    var _this = this;
    var _JQ = jQuery;

    // Check options.topic
    var _topic = (_options.topic !== undefined) ? _options.topic : _this.get('data.topic');
    
    var _rss_loaded;

    this.set('data.topic', {});
    this.set('data.topic', _topic);

    // Check options.loading
    let _loading = (_options.loading !== undefined) ? _options.loading : false;
    
    this._loading({
        'loading': _loading
    }).then(function(_data) {
        
      if (_topic === undefined) {
        return;
      }

      // Refresh categories
      if (_topic._model._rss.loaded === true) {
          
        _this._set_sources({
            'sources': _topic._model._rss.feed_DATA.source_hosts
        });
        
        if (_loading === false) {
            _this._init_charts();
            console.info('Sources for topic', _topic);  // TODO: REMOVE DEBUG LOG
        }
          
      } else {
        _this._set_sources({
          'sources': []
        });
      }
        
    });
    
  } // EndOf set_topic
  
  
  _set_sources(_options) {
    
    let _this = this;
    
    // Check options
    _options = (_options === undefined) ? {} : _options;
    
    // Check options.categories
    let _sources = (_options.sources !== undefined) ? _options.sources : this.get('sources');

    // clear an array and add new values
    this.set('sources', _sources);
    this.invalidate();  // to force render
    
  } // EndOf _set_sources 
  
  
}


customElements.define('webc-waw-blog-sources', WAW_BlogSources);

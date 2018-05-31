"use strict";

// Import the PolymerElement base class and html helper
import {PolymerElement, html} from '../../thirds/polymer/polymer-element.js';

// Import function 'afterNextRender'
import {afterNextRender} from '../../thirds/polymer/lib/utils/render-status.js';

// Import template
import _template from './webc-waw-blog-data-template.js';


class WAW_BlogData extends PolymerElement {
  static get is() { return "webc-waw-blog-data"; }
  
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
  
  
  constructor() {
    super();
//     this.textContent = "I'm a custom-element.";

//     var _this = this;
//     _this._initCharts();

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
    
    this.set('data._layer_chart_CategoriesUsed', _shadowRoot.querySelector('canvas[data-name="chart_CategoriesUsed"]'));
    this.set('data._layer_chart_CategoriesLinked', _shadowRoot.querySelector('canvas[data-name="chart_CategoriesLinked"]'));
    this.set('data._layer_chart_PostsOverTime', _shadowRoot.querySelector('canvas[data-name="chart_PostsOverTime"]'));

  }
  
  _init_chart_CategoriesUsed(_options) {
      
      var _this = this;
      var _JQ = jQuery;
      
      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      var _topic = _this.get('data.topic');
      var _feed_DATA = _topic._model._rss.feed_DATA; 

      var _categories = _this.get('categories');
      
      // Destroy chart if exists...
      var _chart_CategoriesUsed_cache = _this.get('data.chart_CategoriesUsed');
      if (_chart_CategoriesUsed_cache !== undefined) { _chart_CategoriesUsed_cache.destroy(); }
      
      _categories.sort(function(_a, _b) {
          if (_a.count > _b.count) return -1;
          if (_a.count < _b.count) return 1;
          return 0;
      });
      
      var _categories_Used = _categories.slice(0,10);
      
      var _chart_labels = [];
      var _chart_data = [];

      var _others = 0;
      
      _categories_Used.forEach(function(_item, _i) {
          _chart_labels.push(_item.name);
          _chart_data.push(_item.count);
          _others += _item.count;
      });
      
      _others = _feed_DATA.categories_total_entries - _others;
      _chart_labels.push('others');
      _chart_data.push(_others);
      
      let _layer_chart_CategoriesUsed = this.get('data._layer_chart_CategoriesUsed');

      var _data = {
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
      
      var _chart_CategoriesUsed = new Chart(_layer_chart_CategoriesUsed, {
          type: 'pie',
          data: _data
      });
      
      _this.set('data.chart_CategoriesUsed', _chart_CategoriesUsed);
      
  }
  
  
  _init_chart_CategoriesLinked(_options) {
      
      var _this = this;
      var _JQ = jQuery;
      
      var _topic = _this.get('data.topic');
      var _feed_DATA = _topic._model._rss.feed_DATA; 
      
      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Destroy chart if exists...
      var _chart_CategoriesLinked_cache = _this.get('data.chart_CategoriesLinked');
      if (_chart_CategoriesLinked_cache !== undefined) { _chart_CategoriesLinked_cache.destroy(); }

      var _categories_Linked = _feed_DATA.top_categories_linked.slice(0,10);
      
      var _chart_labels = [];
      var _chart_data = [];
      
      _categories_Linked.forEach(function(_item, _i) {
          _chart_labels.push(_item.name);
          _chart_data.push(_item._model._rss_data.related_categories.length);
      });

      let _layer_chart_CategoriesLinked = this.get('data._layer_chart_CategoriesLinked');
      
      var _data = {
          datasets: [{
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
            label: 'Categories linked' // for legend
          }],
          labels: _chart_labels
      };

      
      var _chart_CategoriesLinked = new Chart(_layer_chart_CategoriesLinked, {
          type: 'polarArea',
          data: _data
      });
      
      _this.set('data.chart_CategoriesLinked', _chart_CategoriesLinked);
      
  }
  
  
  
  _init_chart_PostsOverTime(_options) {
      
      var _this = this;
      var _JQ = jQuery;
      
      var _topic = _this.get('data.topic');
      var _feed_DATA = _topic._model._rss.feed_DATA; 

      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Destroy chart if exists...
      var _chart_PostsOverTime_cache = _this.get('data.chart_PostsOverTime');
      if (_chart_PostsOverTime_cache !== undefined) { _chart_PostsOverTime_cache.destroy(); }

      
      var _chart_labels = [];
      var _chart_data = [];
      
      for (var _i_year in _feed_DATA.entries_by_year) {
         _chart_labels.push(_i_year);
         _chart_data.push(_feed_DATA.entries_by_year[_i_year].length);
      }
      
      let _layer_chart_PostsOverTime = this.get('data._layer_chart_PostsOverTime');

      var _data = {
          labels: _chart_labels,
          datasets: [
              {
                  label: "Posts over time",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: _chart_data,
                  spanGaps: false,
              }
          ]
      };
      
      var _chart_PostsOverTime = new Chart(_layer_chart_PostsOverTime, {
          type: 'line',
          data: _data
      });
      
      _this.set('data.chart_PostsOverTime', _chart_PostsOverTime);

  }

  
  
  _init_charts(_options) {
      var _this = this;
      _this._init_chart_CategoriesUsed();
      _this._init_chart_CategoriesLinked();
      _this._init_chart_PostsOverTime();
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

  
  set_topic(_options) {
      
      var _this = this;
      var _JQ = jQuery;

      // Check options.topic
      var _topic = (_options.topic !== undefined) ? _options.topic : _this.get('data.topic');
      
      var _rss_loaded;

      _this.set('data.topic', {});
      _this.set('data.topic', _topic);

      // Check options.loading
      var _loading = (_options.loading !== undefined) ? _options.loading : false;
      
      _this._loading({
          'loading': _loading
      }).then(function(_data) {
          
          if (_topic === undefined) {
              return;
          }

          // Refresh categories
          if (_topic._model._rss.loaded === true) {
              
              _this._set_categories({
                  'categories': _topic._model._rss.categories
              });
              
              if (_loading === false) {
                  _this._init_charts();
              }
              
          } else {
              _this._set_categories({
                  'categories': []
              });
          }
          
      });
      
  }
  
  
  _set_categories(_options) {
      
      var _this = this;
      
      // Check options
      _options = (_options === undefined) ? {} : _options;
      
      // Check options.categories
      var _categories = (_options.categories !== undefined) ? _options.categories : _this.get('categories');

      // clear an array and add new values
      _this.set('categories', []);
      
      
      _categories.forEach(function(_item, _i){
          
          _this.push('categories', _item);
      });
      
      
  }    // EndOf set_categories       
  
  
  
}

customElements.define(WAW_BlogData.is, WAW_BlogData);


"use strict";


/**
 * import config library
 * @ignore
 */
import config_mod from "../config/config.js";
import rss_data_mod from "./rss_data.js";


let _rss = {
  
  'load_feed': function(_options) {
    return new Promise(function(_resolve, _reject) {
      try {
          
        if (_options === undefined) {
            _options = {};
        }
        
        if (_options.url === undefined) {
            throw ('url option is required.');
        }
        let _url = _options.url;
        
        // Check option config
        let _config = (_options.config !== undefined) ? _options.config : config_mod.get_current_config();
        
        // Check option max_results
        let _max_results = (_options.max_results !== undefined) ? _options.max_results : 500;
        
        let _JQ = _config.jquery_Lib;
        
        let _feed = {
            'url': _url,
            'entries': []
        };
        
        let _url_Feed = _url + '?max-results=' + _max_results;  // set url for load feed
        
        _JQ.ajax({  // load feed using jquery ajax method and datatype: jsonp 
            type: 'GET',
            url: _url_Feed,
            dataType: 'jsonp',
            success: function (_data) {
                
              let _xml = _JQ(_data);  // transform result data into xml
              
              _xml.find("entry").each(function (_item) {  // parse each item
                  
                let _this = _JQ(this);
                
                let _id = _JQ(_this).find("id").text();;
                let _title = _JQ(_this).find("title").text();
                let _content =_JQ(_this).find("content").text();
                let _published =_JQ(_this).find("published").text();
                let _link = _this.find("link[rel='alternate']").attr('href');
                let _author = _this.find("author name").text();
                
                let _entry = {  // put information into the entry object
                  'id': _id,
                  'title': _title,
                  'content': _content,
                  'published': _published,
                  'link': _link,
                  'author': _author,
                  
                  'categories': []
                };
                
                _this.find("category").each(function () { // parse each category
                    
                    let _category_xml = _JQ(this);
                    let _category_string_ = _JQ(_category_xml).attr('term');

                    _entry.categories.push(_category_string_);
                    
                });

                _feed.entries.push(_entry);
                
              });
              
              _resolve({  // resolve with the xml and the feed object
                  'xml': _xml,
                  'feed': _feed
              });

            },
            beforeSend: function(_xhr) {
//                        _xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            }
        });
          
      } catch (_e) {  // catch exception
        _reject(_e);
      }
    });
  },
  
  
  'get_TopicbyID': function (_options) {
      
    var _topics = _options.topics;
    var _id = _options.id;
    var _topic = null;
    
    var _elementPos = _topics.map(function(_x) {return _x.id; }).indexOf(_id);
    
    if (_elementPos >= -1) {
        _topic = _topics[_elementPos];
    }
    
    var _response = {
        'topic': _topic,
        'position': _elementPos
    };
    
    return _response;
      
  },  // EndOf get_TopicbyID
  
  
  'get_detailForCategories': function(_options) {
      return new Promise(function(_resolve, _reject) {

        try {
            
          if (_options === undefined) {
              _options = {};
          }
          
          if (_options.feed === undefined) {
              throw ('feed option is required.');
          }
          let _feed = _options.feed;
          
          let _config = config_mod.get_current_config();
          if (_options.config !== undefined) {
              _config = _options.config;
          }
          
          let _JQ = _config.jquery_Lib;
          
          let _categories_RAW = {};
          
          _feed.entries.forEach(function(_entry, _i_entry) {
            _entry.categories.forEach(function(_category, _i_category) {
                
              if (_categories_RAW[_category] === undefined) {
                  _categories_RAW[_category] = {
                          'posts': [],
                          'count': 0
                  };
              }
              _categories_RAW[_category].posts.push(_entry);
              _categories_RAW[_category].count++;
                
            });
          });

          let _categories = [];
          for (var _category in _categories_RAW) {
            _categories.push({
                'name': _category,
                'posts': _categories_RAW[_category].posts,
                'count': _categories_RAW[_category].count
            });
          }
          
          _resolve({
              'categories': _categories
          });
            
        } catch (_e) {
            _reject(_e);
        }
          
      });
  },   // EndOf get_detailForCategories
  
  
  'get_TopicBlogEntries': function(_options) {
    return new Promise(function(_resolve, _reject) {
       
      try {
        // Check options
        _options = (_options !== undefined) ? _options : {};
        
        if (_options.topic === undefined) {
            throw ('topic option is required.');
        }
        let _topic = _options.topic;
        
        // Check option analize
        let _analize = (_options.analize !== undefined) ? _options.analize : false;
        
        let _config = config_mod.get_current_config();
        if (_options.config !== undefined) {
            _config = _options.config;
        }
        
        let _JQ = _config.jquery_Lib;

        
        _rss.load_feed({  // load feed
            'url': _topic.url_feed
        })
        .then(function(_data_load_feed) {
              
          // Make changes for each entry of feed
          let _feed = _data_load_feed.feed;
          _feed.entries.forEach(function(_item, _i) {
              _item.published_raw = _item.published;
              _item.published = _item.published_raw.split('T')[0];  // published date in another format
          });
          
          _rss.get_detailForCategories({  // detail for categories
              'feed': _data_load_feed.feed
          })
          .then(function(_data_categories) {

            let _result = { // prepare result
                'categories': _data_categories.categories,
                'feed': _data_load_feed.feed
            };
            
            // Analize the data of the feed (optional)
            if (_analize === true) {
                
              rss_data_mod.analize_feed({
                  'categories': _data_categories.categories,
                  'feed': _data_load_feed.feed
              }).then(function(_feed_DATA) {
                  _result.feed_DATA = _feed_DATA;
                  _resolve(_result);  // resolve with result
              }, 
              function(_feed_DATA_error) {
                  _reject(_feed_DATA_error);
              }); // EndOf analize_feed
                
            } else {
              _resolve(_result);  // resolve with result
            }
                
          },
          function(_error_categories) { // function for manage error of categories
            _reject(_error_categories);
          }); // EndOf get_detailForCategories
            
        },
        function(_error_load_feed) {  // function for manage error of load feed
          _reject(_error_load_feed);
        }); // EndOf load_feed
          
      } catch (_e) {  // catch error and reject
        _reject(_e);
      }
        
    });
  }   // EndOf get_TopicBlogEntries
      
};


const _export_load_feed = _rss.load_feed;

export {
  _export_load_feed as load_feed
};


export default _rss;

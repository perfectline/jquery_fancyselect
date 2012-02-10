jQuery plugin for awesome looking selects
=========================================

The goal of this plugin is to give designers full control over how select elements appear. This plugin replaces
the traditional HTML select element with DIV elements that can be styled in any way the designer needs to.

The following native select behaviours are currently implemented:

- opening the select when clicking on it
- hovering over an element shows a hover effect
- up + down, left + right move to previous or next element
- enter or mouse click chooses the currently selected element
- escape closes the select
- clicking anywhere on the document outside the select closes the select

What's not supported is:
- typing the first few letters of an option to have it automatically be chosen

Future plans:
- build the DOM automatically from select elements


Usage:
------

  $(document).ready(function(){
     $('div.fancyselect').fancyselect({

       onOpen: function(){
         console.log("select opened");
       },

       onClose: function(){
         console.log("select closed");
       },

       onSelect: function(item){
         console.log(item);
       }

     });
  });


Demo
----

See demo.html for the required DOM structure and a generic example on how to use the plugin.

Authors
-------

**Martin Kivi** (<http://twitter.com/martinkivi>)
**Tanel Suurhans** (<http://twitter.com/tanelsuurhans>)
**Tarmo Lehtpuu** (<http://twitter.com/tarmolehtpuu>)

License
-------
Copyright 2012 by PerfectLine LLC (<http://www.perfectline.co.uk>) and is released under the MIT license.
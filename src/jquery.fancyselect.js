(function () {

  var DEFAULT_OPTIONS = {

    onOpen : function () {
    },

    onClose : function () {
    },

    onSelect : function () {
    }

  };

  var KEYS = {
    ENTER : 13,
    ESC   : 27,
    UP    : 38,
    DOWN  : 40,
    LEFT  : 37,
    RIGHT : 39
  };

  var HOVER_NEXT = -20;
  var HOVER_PREV = -30;

  var FancySelect = function (element, options) {
    this.init(element, options);
  };

  FancySelect.prototype = {

    element : null,

    init : function (element, options) {

      this.options = $.extend(true, {}, DEFAULT_OPTIONS, options);
      this.element = $(element);

      this.element.find('div.selected').bind('click', $.proxy(function (event) {

        event.stopImmediatePropagation();
        event.stopPropagation();

        var target = $(event.target);

        if (target.hasClass('arrow')) {
          target = target.parent('div.selected');
        }

        if (target.hasClass('open')) {
          this.close();
        } else {
          this.open();
        }


      }, this));
    },

    open : function () {

      this.element.find('div.selected').addClass('open');

      this.element.find('div.wrapper li').each($.proxy(function (index, item) {

        $(item).removeClass('hover');

        $(item).bind('mouseenter.fancyselect', $.proxy(function () {
          this.hover(this.element.find('div.wrapper li').index(item));
        }, this));

        $(item).bind('click.fancyselect', $.proxy(function () {
          this.select();
        }, this));

      }, this));

      $(document).bind('keydown.fancyselect', $.proxy(function (event) {

        switch (event.keyCode) {

          case KEYS.ENTER:
            this.select();
            break;

          case KEYS.LEFT:
          case KEYS.UP:
            this.hover(HOVER_PREV);
            break;

          case KEYS.RIGHT:
          case KEYS.DOWN:
            this.hover(HOVER_NEXT);
            break;

          case KEYS.ESC:
            this.close();
            break;
        }

      }, this));


      $(document).bind('click.fancyselect', $.proxy(function () {
        this.close();
      }, this));

      if (typeof(this.options.onOpen) == "function") {
        this.options.onOpen();
      }

    },

    close : function () {

      this.element.find('div.selected').removeClass('open');

      $(document).unbind('keydown.fancyselect');
      $(document).unbind('keydown.fancyselect');

      this.element.find('div.wrapper li').each(function () {
        $(this).unbind('mouseenter.fancyselect');
        $(this).unbind('click.fancyselect');
      });

      if (typeof(this.options.onClose) == "function") {
        this.options.onClose();
      }

    },

    hover : function (index) {

      var elements = this.element.find('div.wrapper li');
      var selected = this.element.find('div.wrapper li.hover');

      var selectedIndex = elements.index(selected);

      if (index == HOVER_NEXT) {
        index = selectedIndex + 1;

        if (index > elements.length - 1) {
          index = 0;
        }
      }

      if (index == HOVER_PREV) {
        index = selectedIndex - 1;

        if (index < 0) {
          index = elements.length - 1;
        }
      }

      $(elements).each($.proxy(function (elementIndex, element) {

        if (elementIndex == index) {
          $(element).addClass('hover');

        } else {
          $(element).removeClass('hover');

        }

      }, this));

    },

    select : function () {

      var element = this.element.find('div.wrapper li.hover');

      var id = $(element).data('id');
      var name = $(element).data('name');

      console.log(element);

      this.element.find('div.selected div.title').text(name);

      if (this.options.onSelect != null) {
        this.options.onSelect({id : id, name : name});
      }

      this.close();

    }

  };

  jQuery.fn.fancyselect = function (options) {
    return this.each(function () {
      new FancySelect(this, options);
    });
  };


})();
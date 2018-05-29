var app = (function () {
    var initialisation = {
        global_init: function () {
            animation.init();
        }
    };

    var animation = {
        $animation_elements : $('.css-animation-element'),
        $window : $(window),

        init :function () {
            animation.$window.on('scroll resize', animation.check_if_in_view);
            animation.$window.trigger('scroll');
        },

        check_if_in_view : function () {
            var window_height = animation.$window.height();
            var window_top_position = animation.$window.scrollTop();
            var window_bottom_position = (window_top_position + window_height);
            $.each(animation.$animation_elements, function() {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                //check to see if this current container is within viewport
                if ((element_bottom_position >= window_top_position) &&
                    (element_top_position <= window_bottom_position)) {
                    $element.addClass('in-view');

                    if( $element.hasClass("progress-bar")){
                        $element.css('width',$element.attr('aria-valuenow') + "%" );
                    }
                }
            });
        },
    };


    return {
        init: initialisation.global_init,
    };
})();


(function($){
    $(document).ready(function() {
        app.init();
    });
})(jQuery);



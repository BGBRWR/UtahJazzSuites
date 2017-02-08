//Fixed transition on scroll without wow.min.js
$(document).ready(function() {
    // Navigation Page Scroll
    $('#navbar a').click(function(e) {
        var theId = $(this).attr('href');
        e.preventDefault();
        $('body').scrollTo(theId, {
            duration: 'fast',
            offset: {
                top: -10
            }
        });
    });
});

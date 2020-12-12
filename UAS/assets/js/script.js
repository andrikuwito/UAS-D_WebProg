$(document).ready(function() {
    
    $('#myCarousel').carousel({
		interval:   4000
	});
	
	var clickEvent = false;
	$('#myCarousel').on('click', '.nav a', function() {
			clickEvent = true;
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.nav').children().length -1;
			var current = $('.nav li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.nav li').first().addClass('active');	
			}
		}
		clickEvent = false;
	});
    
    /* animation scrolling */
    $('.js--carousel').waypoint(function(direction) {
        $('.js--carousel').addClass('animated fadeIn');
    }, {
        offset: '100%'
    })
    
    $('.js--new-release').waypoint(function(direction) {
        $('.js--new-release').addClass('animated fadeIn');
    }, {
        offset: '90%'
    })
    
    $('.js--special-offer').waypoint(function(direction) {
        $('.js--special-offer').addClass('animated fadeIn');
    }, {
        offset: '90%'
    })

    $('.js--free-game').waypoint(function(direction) {
        $('.js--free-game').addClass('animated pulse');
    }, {
        offset: '50%'
    })

    $('.js--genre-section').waypoint(function(direction) {
        $('.js--genre-section').addClass('animated fadeInUp');
    }, {
        offset: '90%'
    })
    
    $('.js--more-from').waypoint(function(direction) {
        $('.js--more-from').addClass('animated fadeIn');
    }, {
        offset: '70%'
    }) 
    
    $('.description').waypoint(function(direction) {
        $('.description').addClass('animated fadeIn');
    }, {
        offset: '70%'
    }) 
    
    $('.profile').waypoint(function(direction) {
        $('.profile').addClass('animated fadeIn');
    }, {
        offset: '70%'
    }) 

    
});
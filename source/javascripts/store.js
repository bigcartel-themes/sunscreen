API.onError = function(errors) {
  var errorList = $('.error-list');
  $.each(errors, function(index, error) {
    errorList.append('<div class="error-list-item">').html(error);
  });
  $('.error-modal').show();
}

$('.product-form').submit(function(e) {
  e.preventDefault();
  var quantity = 1
  , itemID = $("#option").val()
  , addButton = $('.add-to-cart-button')
  if (addButton.length) {
    var addMethod = addButton;
    var updateElement = addButton;
    var addText = addButton.html();
  }
  var addedText = addMethod.data('added-text')
  , addingText = addMethod.data('adding-text')
  if (!addMethod.hasClass('adding')) {
    if (quantity > 0 && itemID > 0) {
      addMethod.addClass('adding');
      addMethod.blur();
      Cart.addItem(itemID, quantity, function(cart) {
        setTimeout(function() {
          updateElement.html(addingText);
          setTimeout(function() {
            updateElement.html(addedText);
            $('.cart-item-count').html(cart.item_count);
            $('.cart-item-count').removeClass('no-items');
            addMethod.removeClass('adding');
            setTimeout(function() {
              updateElement.html(addText);
            }, 900)
          }, 600);
        }, 300);
      });
    }
  }
});

var nav_position = $('.header-nav-container').offset().top;
var header_nav_height = $('.header-nav-container').outerHeight();

$(window).on("scroll", function(e) {
  if ($(window).scrollTop() > nav_position) {
    $('.header-nav-container').addClass("fixed");
    $('body').css('padding-top',header_nav_height+'px');
  } else {
     $('.header-nav-container').removeClass("fixed");
     $('body').css('padding-top',0);
  }
});

$('.close-errors').click(function(e) {
  $('.error-modal').hide();
});

$(document).on('keyup',function(e) {
  if (e.keyCode == 27) {
    if ($('.error-modal').is(":visible")) {
      $('.error-modal').hide();
    }
  }
});

$('.contact-form input[type="text"], .contact-form textarea').focus(function(){
  $(this).parents('.contact-form-group').addClass('focused');
});

$('.contact-form input[type="text"], .contact-form textarea').blur(function(){
  var inputValue = $(this).val();
  if (inputValue.length == 0) {
    $(this).removeClass('filled');
    $(this).parents('.contact-form-group').removeClass('focused');
  } else {
    $(this).addClass('filled');
  }
})

$(document).ready(function() {
  $('.contact-form input[type="text"], .contact-form textarea').each(function(){
    var inputValue = $(this).val();
    if (inputValue.length > 0) {
      $(this).addClass('filled');
      $(this).parents('.contact-form-group').addClass('focused');
    }
  })
  autoExpand($('textarea')[0]);
  if ($('.all-similar-products').length) {
    var num_products = $('.all-similar-products > a').length;
    var elements = $('.all-similar-products').children().toArray();
    var num_to_display = 3;
    for (var i=1; i<=num_to_display; i++) {
      var randomIndex = getRandomIndex(elements);
      $('.similar-product-list').append($('.all-similar-products').children().eq(randomIndex));
      elements.splice(randomIndex, 1);
    }
    $('.similar-product-list .product-list-image').each(function() {
      this_class = $(this).attr('class');
      this_src = $(this).attr('src');
      this_data_src = $(this).attr('data-src');
      this_data_srcset = $(this).attr('data-srcset');

      img = $('<img />').attr('alt','').attr('class',this_class).attr('src',this_src).attr('data-src',this_data_src).attr('data-srcset',this_data_srcset);
      $(this).parent().append(img);
      $(this).remove();
    })
    $('.all-similar-products').remove();

    window.document.dispatchEvent(new Event("DOMContentLoaded", {}));
  }
});


document.addEventListener('input', function (event) {
	if (event.target.tagName.toLowerCase() !== 'textarea') return;
	autoExpand(event.target);
}, false);

function autoExpand(textarea) {
  if (textarea) {
    if (textarea.value) {
      textarea.style.height = 'inherit';
      var height = textarea.scrollHeight;
      textarea.style.height = height + 'px';
    }
  }
};
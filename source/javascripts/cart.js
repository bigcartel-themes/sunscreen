$('body')
  .on( 'click', '.cart-item-remove', function(e) {
    e.preventDefault();
    item_id = $(this).parent().data("item-id");
    new_val = 0;
    Cart.updateItem(item_id, new_val, function(cart) {
      processUpdate('', item_id, '', cart);
    });
  })
  .on( 'blur change','.option-quantity', function(e) {
    var item_id = $(this).parent().data("item-id");
    var new_val = $(this).val();
    var input = $(this);
    Cart.updateItem(item_id, new_val, function(cart) {
      processUpdate(input, item_id, new_val, cart);
    });
  })

var processUpdate = function(input, item_id, new_val, cart) {
  var sub_total = Format.money(cart.total, true, true);
  var item_count = cart.item_count;
  $('.cart-subtotal-amount').html(sub_total);
  $('.cart-item-count').html(item_count);
  $('.error-container').hide();
  if (item_count == 0) {
    $('.cart-item-count').hide();

    $('.cart-form').slideUp('fast',function() {
      $('.cart-container').addClass('empty-cart');
      $("html, body").animate({ scrollTop: 0 }, "fast");
    });

  }
  else {
    if (input) {
      input.val(new_val);
    }
  }
  if (new_val > 0) {
    for (itemIndex = 0; itemIndex < cart.items.length; itemIndex++) {
      if (cart.items[itemIndex].id == item_id) {
        item_price = cart.items[itemIndex].price;
        formatted_item_price = Format.money(item_price, true, true);
        $('.cart-item[data-item-id="'+item_id+'"]').find('.cart-item-details-price').html(formatted_item_price)
      }
    }

  }
  else {
    $('.cart-item[data-item-id="'+item_id+'"]').slideUp('fast');
  }
  return false;
}
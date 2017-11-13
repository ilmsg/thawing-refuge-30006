function readURL(input, imgObject) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      imgObject.attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function(){

  $('#inputTag').tagsInput({
    'height': '50px',
    'width': '100%',
    'defaultText':'เพิ่มแท็ก',
  });

  $(".alert").fadeTo(2000, 500).slideUp(500, function(){
    $(this).slideUp(500);
  });

  $(document).on('click', '#inputCheckboxAll', function(e){
    //alert('select all')
    $('.input-checkbox').prop('checked', $(this).prop('checked'));
  });

  $(document).on('click', '.input-checkbox', function(e){
    // alert('select once')
  });

  $(document).on('change', '#inputPicture', function(e){
    var input = this;
    imgObject = $('#imgPreview');
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        imgObject.attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  });

});

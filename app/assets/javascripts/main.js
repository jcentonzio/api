$(function (){

  var $leads = $('#task');
  var $project_name = $('#project_name');
  var $email = $('#email');
  var $duration = $('#duration');
  var $description = $('#description');

  var $error = $('#error');
  var $notice = $('.notice');

  var date = new Date();

  
	$.ajax({
		type: 'GET',
		url: '/api/leads.json',
		success: function(leads){
		
			$.each(leads, function(i, lead){

              $.each(lead, function(index, value) {
                  $leads.append('<tr><td>' + value.project_name + '</td><td>' + value.email + '</td><td>' + value.description + '</td><td>' + value.period + '</td></tr>');
              });
               
			});

		},
		error: function(){
			alert('ups algo anda mal');
		}
	});


	$('#add-task').on('click', function(){
		var lead = {
			lead: {project_name: $project_name.val(), email: $email.val(), description: $description.val(), period: date}
          //email: $name.val(),
		};
		$('#project_name').val('');
		$('#email').val('');
		$('#duration').val('');
		$('#description').val('');
		$('.alert').hide();
		$.ajax({
			type: 'POST',
			url: '/api/leads',
			data: lead,
			dataType: 'json',
			success: function(xhr, data){
				$(".form-group").removeClass("has-error");
                $(".help-block").empty();
                
				$leads.prepend('<tr><td>' + xhr.project_name + '</td><td>' + xhr.email + '</td><td>' + xhr.description + '</td><td>' + xhr.period + '</td></tr>');
                $notice.append('<div role="alert" class="alert alert-success">Tarea agregada correctamente</div>');
                
			},
			error: function(xhr, data, status){

                 $.each(xhr.responseJSON.error, function(field, messages) {
                   var $input;
                   $input = $("input[id=" + field + "]");
                   $input.closest('.form-group').addClass('has-error').find('.help-block').html(messages.join(' & '));

                   var $text;
                   $text = $("textarea[id=" + field + "]");
                   $text.closest('.form-group').addClass('has-error').find('.help-block').html(messages.join(' & '));
                 });
                 

                // $.each(xhr.responseJSON.error, function( index, value ) {
                //   console.log( index + ": " + value );
                //   $error.append('<li>' + value + '</li>');
                // });
	            

			}

		});
	});

});
$('#signup-btn').click(function() {
    const firstname = $('#firstname').val(); 
    const lastname = $('#lastname').val();
    const username = $('#username').val();
    const password = $('#password').val();

    $.ajax({
        type: "POST",
        url: "/signup",
        contentType: 'application/json',
        data: JSON.stringify({
            firstname,
            lastname,
            username,
            password,
        }),
        success: function(data) {
            console.warn(data);
        }
    })
})
User = Backbone.Model.extend(
    defaults:
            name:"",
            birthday:"",
            email:"",
            url:"",
            phone:"",
            skill:"",
            gender:"",
            password:"",
            passwordrepeat:""
            description:""
    
    convertDate:(attrs)->
        optinsM=
            month:"long"
        optinsD=
            day:"numeric"
        optinsY=
            year:"numeric"
        Dataday=new Date(this.attributes.birthday).toLocaleString( "en-US", optinsD)
        Datamonth=new Date(this.attributes.birthday).toLocaleString( "en-US", optinsM)
        Datayear=new Date(this.attributes.birthday).toLocaleString( "en-US", optinsY)
        Dataday+" "+Datamonth+" "+Datayear

)
startValue=
    "name":"John Doe",
    "birthday":"1983-04-15",
    "email":"johndoe@mail.com",
    "url":"www.mywebsite.com",
    "phone":"+65 336889425",
    "skill":"123",
    "gender":"male",
    "password":"123",
    "passwordrepeat":"123"
    "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu efficitur est. Sed est felis, fringilla sit amet rutrum pharetra, aliquam eget odio."
john = new User(startValue);

updateValueView=(object)->
    $("#value_name").html(object.get("name"));
    $("#value_birthday").html(object.convertDate());
    $("#value_email").html(object.get("email"));    
    $("#value_url").html(object.get("url"));
    $("#value_phone").html(object.get("phone"));
    $("#value_skill").html("Skill "+object.get("skill"));
    $("#value_gender").html(object.get("gender"));
    $("#value_description").html(object.get("description"));
    return
updateValueForm=(object)->
    $("#fname").attr("value",object.get("name"));
    $("#fbirthday").attr("value",object.get("birthday"));
    $("#femail").attr("value",object.get("email"));    
    $("#furl").attr("value",object.get("url"));
    $("#fphone").attr("value",object.get("phone"));
    $("#fskill").attr("value",object.get("skill"));
    $("#fpassword").attr("value",object.get("password"));
    $("#fpasswordrepeat").attr("value",object.get("passwordrepeat"));
    $("#fdescription").attr("value",object.get("description"));
    if object.get("gender") is "male" then $("#fgender-male").attr("checked","checked");else $("#fgender-female").attr("checked","checked")
    return
updateValueView(john);
$('#edit').on "click", -> 
    updateValueForm(john);
    $("label:not(.radio_label)").addClass("focused")
    $("#subscribe").fadeToggle("fast", "linear");
    return
$("#cancel").on "click",->
    $("#subscribe").fadeToggle("fast", "linear");
    return
$("#save").on "click",()->
    return $(".error").html("You cannot born in future") if new Date($("#fbirthday").attr("value")).getTime() > new Date().getTime()
    
    return $(".error").html("Password doesnt match" ) if $("#fpassword").attr("value") isnt $("#fpasswordrepeat").attr("value")
    
    john.set("name",$("#fname").attr("value"));
    john.set("birthday",$("#fbirthday").attr("value"));
    john.set("email",$("#femail").attr("value"));
    john.set("url",$("#furl").attr("value"));
    john.set("phone",$("#fphone").attr("value"));
    john.set("skill",$("#fskill").attr("value"));
    john.set("password",$("#fpassword").attr("value"));
    john.set("passwordrepeat",$("#fpasswordrepeat").attr("value"));
    john.set("description",$("#fdescription").attr("value"));
    if $("#fgender-male").attr("checked") is "checked"
            john.set("gender","male")
        else if $("#fgender-female").attr("checked") is "checked"
                john.set("gender","female");
    updateValueView(john);
    $("#subscribe").fadeToggle("fast", "linear");
    $.ajax(
        type: 'POST'
        url: 'http://localhost/form_server/web/process-form'
        data: john.toJSON();
        success:(data)->
            alert(data)
            console.log(data);
            return
        error:(xhr, ajaxOptions, thrownError)->
            alert(xhr.status)
            console.log(xhr, ajaxOptions, thrownError)
            return
    )
    return
$('input:not([type=radio])').on "change",->
    if this.value isnt "" 
    then $(this).next().addClass('focused') if $(this).hasClass('focused') is no
    else $(this).next().removeClass('focused') if $(this).hasClass('focused') is yes
    
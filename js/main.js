// Generated by CoffeeScript 1.10.0
(function() {
  var User, john, startValue, updateValueForm, updateValueView;

  User = Backbone.Model.extend({
    defaults: {
      name: "",
      birthday: "",
      email: "",
      url: "",
      phone: "",
      skill: "",
      gender: "",
      password: "",
      passwordrepeat: "",
      description: ""
    },
    convertDate: function(attrs) {
      var Dataday, Datamonth, Datayear, optinsD, optinsM, optinsY;
      optinsM = {
        month: "long"
      };
      optinsD = {
        day: "numeric"
      };
      optinsY = {
        year: "numeric"
      };
      Dataday = new Date(this.attributes.birthday).toLocaleString("en-US", optinsD);
      Datamonth = new Date(this.attributes.birthday).toLocaleString("en-US", optinsM);
      Datayear = new Date(this.attributes.birthday).toLocaleString("en-US", optinsY);
      return Dataday + " " + Datamonth + " " + Datayear;
    }
  });

  startValue = {
    "name": "John Doe",
    "birthday": "1983-04-15",
    "email": "johndoe@mail.com",
    "url": "www.mywebsite.com",
    "phone": "+65 336889425",
    "skill": "123",
    "gender": "male",
    "password": "123",
    "passwordrepeat": "123",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu efficitur est. Sed est felis, fringilla sit amet rutrum pharetra, aliquam eget odio."
  };

  john = new User(startValue);

  updateValueView = function(object) {
    $("#value_name").html(object.get("name"));
    $("#value_birthday").html(object.convertDate());
    $("#value_email").html(object.get("email"));
    $("#value_url").html(object.get("url"));
    $("#value_phone").html(object.get("phone"));
    $("#value_skill").html("Skill " + object.get("skill"));
    $("#value_gender").html(object.get("gender"));
    $("#value_description").html(object.get("description"));
  };

  updateValueForm = function(object) {
    $("#fname").attr("value", object.get("name"));
    $("#fbirthday").attr("value", object.get("birthday"));
    $("#femail").attr("value", object.get("email"));
    $("#furl").attr("value", object.get("url"));
    $("#fphone").attr("value", object.get("phone"));
    $("#fskill").attr("value", object.get("skill"));
    $("#fpassword").attr("value", object.get("password"));
    $("#fpasswordrepeat").attr("value", object.get("passwordrepeat"));
    $("#fdescription").attr("value", object.get("description"));
    if (object.get("gender") === "male") {
      $("#fgender-male").attr("checked", "checked");
    } else {
      $("#fgender-female").attr("checked", "checked");
    }
  };

  updateValueView(john);

  $('#edit').on("click", function() {
    updateValueForm(john);
    $("label:not(.radio_label)").addClass("focused");
    $("#subscribe").fadeToggle("fast", "linear");
  });

  $("#cancel").on("click", function() {
    $("#subscribe").fadeToggle("fast", "linear");
  });

  $("#save").on("click", function() {
    if (new Date($("#fbirthday").attr("value")).getTime() > new Date().getTime()) {
      return $(".error").html("You cannot born in future");
    }
    if ($("#fpassword").attr("value") !== $("#fpasswordrepeat").attr("value")) {
      return $(".error").html("Password doesnt match");
    }
    john.set("name", $("#fname").attr("value"));
    john.set("birthday", $("#fbirthday").attr("value"));
    john.set("email", $("#femail").attr("value"));
    john.set("url", $("#furl").attr("value"));
    john.set("phone", $("#fphone").attr("value"));
    john.set("skill", $("#fskill").attr("value"));
    john.set("password", $("#fpassword").attr("value"));
    john.set("passwordrepeat", $("#fpasswordrepeat").attr("value"));
    john.set("description", $("#fdescription").attr("value"));
    if ($("#fgender-male").attr("checked") === "checked") {
      john.set("gender", "male");
    } else if ($("#fgender-female").attr("checked") === "checked") {
      john.set("gender", "female");
    }
    updateValueView(john);
    $("#subscribe").fadeToggle("fast", "linear");
    $.ajax({
      type: 'POST',
      url: 'http://localhost/form_server/web/process-form',
      data: john.toJSON(),
      success: function(data) {
        alert(data);
        console.log(data);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        console.log(xhr, ajaxOptions, thrownError);
      }
    });
  });

  $('input:not([type=radio])').on("change", function() {
    if (this.value !== "") {
      if ($(this).hasClass('focused') === false) {
        return $(this).next().addClass('focused');
      }
    } else {
      if ($(this).hasClass('focused') === true) {
        return $(this).next().removeClass('focused');
      }
    }
  });

}).call(this);

var jsonData = [{ meta: { version: 1, type: "test" } }];

jQuery.ajaxSetup({ cache: true });

function plsdo(city) {
  jQuery.getJSON(
    ` https://bankdetails-api.herokuapp.com/api/branches?q=${city}&limit=null`,
    function (data) {
      console.log(data);
      jsonData = data;

      $(`#${city}`).DataTable({
        data: jsonData.branches,
        stateSave: true,
        columns: [
          {
            data: null,
            render: function (data, type, row) {
              if (type === "display") {
                return '<input type="checkbox" class="editor-active">';
              }
              return data;
            },
            className: "dt-body-center",
          },
          { data: "ifsc" },
          { data: "bank_id" },
          { data: "branch" },
          { data: "address" },
          { data: "city" },
          { data: "district" },
          { data: "state" },
        ],

        stateLoadParams: function (settings, data) {
          data.checkboxes = {};
        },
      });

      $("#loader").hide();
      $("#myAnswers").fadeIn("slow");
    }
  );
}

$("#loader").fadeIn("slow");
$("#myAnswers").hide();

plsdo("bangalore");
plsdo("delhi");
plsdo("pune");
plsdo("kolkata");
plsdo("mumbai");

// window.alert = function () {};
$("#myAnswers > div").hide();

$(function () {
  $("#QuestionOptions").change(function () {
    $("#myAnswers > div").hide();
    $("#myAnswers")
      .find("#" + $(this).val())
      .fadeIn("slow");
  });
});

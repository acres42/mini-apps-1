var app = {
    init: function() {
      $('#app').append(`<form id='form'></form>`);
      $('#form').append(`<input type=textarea id='text'>`);
      $('#form').append(`<button type='submit' id='submit'>Submit</button>`);
      $('#submit').on('click', app.handleSubmit);
    },

    handleSubmit: function(event) {
      var body = {
        text: $('#text').val()
      };
      $.ajax({
        type: 'POST',
        data: JSON.stringify(body),
        contentType: 'application/json',
        success: function(data) {
          $('#text').val('');
          app.handleDownloadButton();
        }
      });
      event.preventDefault();
    },
    // https://expressjs.com/en/api.html#res.download
    //https://stackoverflow.com/questions/24956231/how-to-make-action-on-node-js-server-after-button-click-using-jquery-ajax
    handleDownloadButton: function() {
      $('#app').append(`<button type='button' id='dl'>Download Final CSV</button>`);
      $('#dl').on('click', function(event){
        $('#dl').detach();
        $.get("/download", function(file){
          // https://github.com/mholt/PapaParse/issues/175 - hatip to mholt
          var blob = new Blob([file]);
          if (window.navigator.msSaveOrOpenBlob){
            window.navigator.msSaveBlob(blob, "final.csv");
          } else {
            var a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
            a.download = "final.csv";
            document.body.appendChild(a);
            a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
            document.body.removeChild(a);
          }
        });
      });
    },
}


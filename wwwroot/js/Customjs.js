// Upload ProccessBar
function _(el) {
    return document.getElementById(el);
  }

  function uploadFile() {
    var file = _("file1").files[0];
    // alert(file.name+" | "+file.size+" | "+file.type);
    var formdata = new FormData();
    formdata.append("file1", file);
    var ajax = new XMLHttpRequest();
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "file_upload_parser.php"); // http://www.developphp.com/video/JavaScript/File-Upload-Progress-Bar-Meter-Tutorial-Ajax-PHP
    //use file_upload_parser.php from above url
    ajax.send(formdata);
  }

  function progressHandler(event) {
    _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
    var percent = (event.loaded / event.total) * 100;
    _("progressBar").value = Math.round(percent);
    _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
  }

  function completeHandler(event) {
    _("status").innerHTML = event.target.responseText;
    _("progressBar").value = 0; //wil clear progress bar after successful upload
  }

  function errorHandler(event) {
    _("status").innerHTML = "Upload Failed";
  }

  function abortHandler(event) {
    _("status").innerHTML = "Upload Aborted";
  }

//////////////////////////////////////////////////////////////////////////////////////////

// UploadButton

  $('#getFile').change(function() {
    var i = $(this).prev('label').clone();
    var file = $('#getFile')[0].files[0].name;
    $(this).prev('label').text(file);
  });

  $("#files").change(function() {
    filename = this.files[0].name;
    console.log(filename);
  });

///////////////////////////////////////////////////////////////////////////////////////////

// OTP
const inputs = document.querySelectorAll(".otp-field input");

inputs.forEach((input, index) => {
  input.dataset.index = index;
  input.addEventListener("keyup", handleOtp);
  input.addEventListener("paste", handleOnPasteOtp);
});

function handleOtp(e) {
  /**
   * <input type="text" 👉 maxlength="1" />
   * 👉 NOTE: On mobile devices `maxlength` property isn't supported,
   * So we to write our own logic to make it work. 🙂
   */
  const input = e.target;
  let value = input.value;
  let isValidInput = value.match(/[0-9a-z]/gi);
  input.value = "";
  input.value = isValidInput ? value[0] : "";

  let fieldIndex = input.dataset.index;
  if (fieldIndex < inputs.length - 1 && isValidInput) {
      input.nextElementSibling.focus();
  }

  if (e.key === "Backspace" && fieldIndex > 0) {
      input.previousElementSibling.focus();
  }

  if (fieldIndex == inputs.length - 1 && isValidInput) {
      submit();
  }
}

function handleOnPasteOtp(e) {
  const data = e.clipboardData.getData("text");
  const value = data.split("");
  if (value.length === inputs.length) {
      inputs.forEach((input, index) => (input.value = value[index]));
      submit();
  }
}

function submit() {
  console.log("Submitting...");
  // 👇 Entered OTP
  let otp = "";
  inputs.forEach((input) => {
      otp += input.value;
      input.disabled = true;
      input.classList.add("disabled");
  });
  console.log(otp);
  // 👉 Call API below
}
/////////////////////////////////////////////////////////////////////////////////////

// Done Or Fail Alert
const alertPlaceholder = document.getElementById('Done')

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    alert('ثبت نام شما با موفقیت انجام شد', 'success')
  })
}
/////////////////////////////////////////////////////////////////////////////////////////////
// Melli Code Validation
function MellicodeValidation() {
  var xv = document.getElementById('input3').value;
  if (isNaN(xv)) {
      alert("کد ملی را وارد کنید");
  } else if (xv == "") {
    alert("کد ملی را وارد کنید");
  } else if (xv.length < 10) {
    alert("کد ملی اشتباه است");
  } else {
      var yy = 0;
      var yv = parseInt(yv);
      for (let i = 0; i < xv.length; i++) {
          yv = xv[i] * (xv.length - i);
          yy += yv;
      }
      var x = yy % 11;
      if (x === 0) {
          alert("your code is valid !");
      } else {
          alert("کد ملی اشتباه است");
      }
      yy = 0;
  }
}

// ************************************************************************************************************************
// admin JS

// Data Table Translate to Persian

var table = new DataTable('#AdminListTable', {
  language: {
      url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/fa.json',
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Hide Search and number off show row Data table
$(document).ready(function () {
  $('#AdminListTable').DataTable({
      "searching": false, // Hide search box
      "lengthChange": false // Show "Show Entries" dropdown
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
function GenderSelect(){
  var Gender = document.getElementById("GenderSellection").value;
  if (Gender=="2"){
  document.getElementById("SoldierSelection").classList.add("DisplayHide")
  document.getElementById("SoldierTableRow").classList.add("DisplayHide")
  ;
  }
  else{
  document.getElementById("SoldierSelection").classList.remove("DisplayHide")
  document.getElementById("SoldierTableRow").classList.remove("DisplayHide")
  }
}
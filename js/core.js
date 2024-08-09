function copy() {
  textRange = document.extractor.output.createTextRange();
  textRange.execCommand("RemoveFormat");
  textRange.execCommand("Copy");
}

function paste() {
  textRange = document.extractor.input.createTextRange();
  textRange.execCommand("RemoveFormat");
  textRange.execCommand("Paste");
}

function copymails() {
  var output1 = document.getElementById("output").value;
  if (output1.length < 1) {
    $("#copydone").html("No mails to copy");
  } else {
    $("#output").select();
    document.execCommand("copy");
    $("#copydone").html("The addresses have been copied to clipboard");
  }
}

function ChangedAddressType() {
  $("#ForMail").toggle();
}

function help() {
  var imgwid = 450;
  var imghgt = 360;

  content = "<html><head><title>Email Extractor : Help</title>";
  content += '<style type="text/css">';
  content +=
    "body,td,th,ul,p       { font: normal normal normal 8pt/1em Verdana; color: #000; }";
  content += "</style>";
  content += '</head><body onload="window.focus();">';
  content += "<strong>Quick and dirty</strong>";
  content += "<ol>";
  content +=
    "<li>Copy all text from any webpages, documents, files, etc...</li>";
  content += "<li>Paste it into <strong>Input Window</strong>.</li>";
  content += '<li>Click "<em>Extract</em>" button.</li>';
  content +=
    "<li>Copy the result from <strong>Output Window</strong> to somewhere and save it.</li>";
  content += '<li>Click "<em>Reset</em>" button to start all over again.</li>';
  content += "</ol>";
  content += "<br /><br /><strong>More Controls</strong>";
  content += "<ol>";
  content +=
    '<li>Click "<em>Paste Input</em>" link to paste any text you copied elsewhere into <strong>Input Window</strong>.</li>';
  content +=
    '<li>Click "<em>Copy Output</em>" link to copy whatever text inside <strong>Output Window</strong>.</li>';
  content +=
    "<li>Choose different separator from the dropdown menu or specify your own. Default is comma.</li>";
  content +=
    "<li>You can group a number of emails together. Each group is separated by a new line. Please enter number only.</li>";
  content +=
    '<li>Check "<em>Sort Alphabetically</em>" checkbox to arrange extracted emails well... alphabetically.</li>';
  content +=
    "<li>You can extract or exclude emails containing certain string (text). Useful if you only want to get email from a particular domain.</li>";
  content +=
    "<li>You can choose to extract web addresses instead of email addresses.</li>";
  content += "</ol>";
  content +=
    '<div align="center"><input type="button" value="Close" onClick="javascript:window.close();" /></div>';
  content += "</body></html>";

  var winl = (screen.width - imgwid) / 2;
  var wint = (screen.height - imghgt) / 2;
  helpwindow = window.open(
    "",
    "help",
    "width=" +
      imgwid +
      ",height=" +
      imghgt +
      ",resizable=0,scrollbars=0,top=" +
      wint +
      ",left=" +
      winl +
      ",toolbar=0,location=0,directories=0,status=0,menubar=0,copyhistory=0"
  );
  helpwindow.document.write(content);
  helpwindow.document.close();
}

function checksep(value) {
  if (value) document.extractor.sep.value = "other";
}

function numonly(value) {
  if (isNaN(value)) {
    window.alert(
      "Please enter a number or else \nleave blank for no grouping."
    );
    document.extractor.groupby.focus();
  }
}

function findEmail() {
  const input = document.extractor.input.value;
  const separator =
    document.extractor.sep.value === "new"
      ? "\n"
      : document.extractor.sep.value === "other"
      ? document.extractor.othersep.value
      : document.extractor.sep.value;
  const string = document.extractor.string.value;
  const groupBy = Math.round(document.extractor.groupby.value);
  const addressType = document.extractor.address_type.value;
  const filterType = document.extractor.filter_type.value;
  const removeKeywords = (document.extractor.RemoveKeywords.value || "")
    .replace(/ /g, "")
    .split(",");

  let emailRegex;

  if (addressType === "web") {
    emailRegex = /([A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_%&\?\/.=]+)/gi;
  } else {
    emailRegex = document.extractor.RemoveNumeric.checked
      ? /([a-zA-Z._-]+@[a-zA-Z._-]+\.[a-zA-Z._-]+)/gi
      : /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
  }

  const rawEmails = input.match(emailRegex) || [];

  const uniqueEmails = [...new Set(rawEmails)]; // Use a Set for faster unique filtering

  const filteredEmails = uniqueEmails.filter((email) => {
    const shouldInclude =
      filterType === "1" ? email.includes(string) : !email.includes(string);
    const shouldKeep = !removeKeywords.some((keyword) =>
      email.includes(keyword)
    );
    return shouldInclude && shouldKeep;
  });

  if (document.extractor.sort.checked) {
    filteredEmails.sort();
  }

  let email = "";
  let inGroup = 0;

  for (const emailAddress of filteredEmails) {
    if (inGroup !== 0) {
      email += separator;
    }
    email += emailAddress;
    inGroup++;

    if (groupBy && inGroup === groupBy) {
      email += "\n\n";
      inGroup = 0;
    }
  }

  document.extractor.count.value = filteredEmails.length;
  document.extractor.output.value = email;
}

/////  End -->

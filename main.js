(() => {
  var ugly = document.getElementById("myTextArea").value;
  var obj = JSON.parse(ugly);
  var pretty = JSON.stringify(obj, undefined, 2);
  document.getElementById("myTextArea").value = pretty;
});
const sendJob = () => {
  let hereApiKey = document.getElementById("here-api-key").value;
  if (!hereApiKey) {
    alert("API KEY is required..");
    return;
  }
  document.getElementById("here-api-key-driver").value = hereApiKey;
  let payload = document.getElementById("myTextArea").value;
  const url = `https://fce.ls.hereapi.com/1/sendjob.json?apiKey=${hereApiKey}`;

  fetch(url, {
    method: "POST",
    body: JSON.stringify(JSON.parse(payload)),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
      if (result.issues) {
        alert(result.issues[0].message);
      }
      if (result.error) {
        alert(result.error_description);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const getUpdates = () => {
  let driverApikey = document.getElementById("here-api-key-driver").value;
  if (!driverApikey) {
    alert("API KEY is required..");
    return;
  }
  let assetID = document.getElementById("asset-id").value;
  if (!assetID) {
    alert("Asset ID is required..");
    return;
  }
  let dispatcherID = document.getElementById("dispatcher-id").value;
  if (!dispatcherID) {
    alert("Dispatcher ID is required..");
    return;
  }
  let hereApiKey = document.getElementById("here-api-key").value;
  const url = `https://fce.ls.hereapi.com/1/assetupdate.json?apiKey=${driverApikey}&event={"asset_id":"${assetID}","dispatcher_id":"${dispatcherID}"}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error_description);
        return;
      }
      cleanTable();
      data.jobs.map((job, index) => {
        addRow(job);
        console.log(job);
      });
    });
};

const cleanTable = () => {
  let table = document.getElementById("display_job");
  for (var i = table.rows.length; i > 1; i--) table.deleteRow(i - 1);
};
const addRow = (job) => {
  let table = document.getElementById("display_job");
  let row = table.insertRow(1);
  let job_id = row.insertCell(0);
  let dispatcher_id = row.insertCell(1);
  let message = row.insertCell(2);
  let action = row.insertCell(3);

  job_id.innerHTML = job.job_id;
  dispatcher_id.innerHTML = job.dispatcher_id;
  message.innerHTML = job.message;
  action.innerHTML = `<button type="button" class="btn btn-info">Action</button>`;
};

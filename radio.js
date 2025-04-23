<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Internet Radio Client</title>
  <!-- Import Materialize CSS -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
  <!-- Import Materialize JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <!-- Import jQuery -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <!-- Custom Styles -->
  <style>
    body {
      background-color: #f5f5f5; /* Light background */
      color: #212121;
    }
    .card {
      background-color: #ffffff; /* White cards */
    }
    .card .card-title,
    .card-content label {
      color: #212121;
    }
    .btn {
      border-radius: 50px;
    }
    .btn.teal {
      background-color: #00796b !important;
    }
    .btn.blue {
      background-color: #1976d2 !important;
    }
    .collection {
      background-color: #ffffff;
      border: 1px solid #e0e0e0;
    }
    .collection-item {
      background-color: #ffffff;
      border-bottom: 1px solid #e0e0e0;
      color: #212121;
    }
    .collection-item .value {
      font-weight: bold;
      color: #00796b;
    }
    .input-field input[type="text"] {
      color: #212121;
      border-bottom: 1px solid #00796b;
    }
    .input-field input[type="text"]:focus {
      border-bottom: 1px solid #00796b;
      box-shadow: 0 1px 0 0 #00796b;
    }
    .input-field label {
      color: #00796b;
    }
    .input-field label.active {
      color: #00796b;
    }
  </style>
  <!-- Import radio.js -->
  <script src="radio.js"></script>
  <script>
    // Initialize Materialize components and handle events
    document.addEventListener('DOMContentLoaded', function() {
      // Initialize Materialize tooltips
      const elems = document.querySelectorAll('.tooltipped');
      M.Tooltip.init(elems);

      // jQuery ready function
      $(document).ready(function() {
        // Set URL logic
        $('#set-url-btn').click(function() {
          const newUrl = $('#url-input').val();
          if (newUrl) {
            radio.url = `http://${newUrl}/fsapi/`;
            $('#url .value').text(radio.url);
            M.toast({html: 'URL updated! Now fetching radio information.', classes: 'green'});
          } else {
            M.toast({html: 'Please enter a valid URL or IP address.', classes: 'red'});
          }
        });

        // Fetch Info logic
        $('#fetch-info-btn').click(function() {
          M.toast({html: 'Fetching radio information...', classes: 'blue'});
          radio.getSessionId(function(radio) {
            $('#session-id .value').text(radio.sessionId);

            radio.getFriendlyName(function(radio) {
              $('#friendly-name .value').text(radio.friendlyName);
            });

            radio.getVolumeSteps(function(radio) {
              $('#volume-steps .value').text(radio.volumeSteps);
            });

            radio.getPlayInfoName(function(radio) {
              $('#play-info-name .value').text(radio.playInfoName);
            });

            radio.getPlayInfoText(function(radio) {
              $('#play-info-text .value').text(radio.playInfoText);
            });

            radio.getVolume(function(radio) {
              $('#volume .value').text(radio.volume);
            });
          });
        });
      });
    });
  </script>
</head>
<body>
  <!-- Main Container -->
  <div class="container">
    <!-- Header -->
    <div class="card-panel teal">
      <h4 class="white-text center-align">Internet Radio Client</h4>
    </div>

    <!-- URL Input Section -->
    <div class="card">
      <div class="card-content">
        <span class="card-title">Radio Configuration</span>
        <div class="input-field">
          <input id="url-input" type="text" placeholder="Enter radio IP or hostname">
          <label for="url-input">Radio IP/Hostname</label>
        </div>
        <div class="card-action">
          <button id="set-url-btn" class="btn btn-rounded waves-effect waves-light teal tooltipped" data-position="top" data-tooltip="Set the radio URL">
            Set URL
          </button>
          <button id="fetch-info-btn" class="btn btn-rounded waves-effect waves-light blue tooltipped" data-position="top" data-tooltip="Fetch radio information">
            Fetch Info
          </button>
        </div>
      </div>
    </div>

    <!-- Display Radio Information -->
    <div class="card">
      <div class="card-content">
        <span class="card-title">Radio Information</span>
        <ul class="collection">
          <li class="collection-item" id="url">URL: <span class="value">Not Set</span></li>
          <li class="collection-item" id="session-id">Session ID: <span class="value"></span></li>
          <li class="collection-item" id="friendly-name">Friendly Name: <span class="value"></span></li>
          <li class="collection-item" id="volume-steps">Volume Steps: <span class="value"></span></li>
          <li class="collection-item" id="volume">Current Volume: <span class="value"></span></li>
          <li class="collection-item" id="play-info-name">Now Playing: <span class="value"></span></li>
          <li class="collection-item" id="play-info-text">Play Info Text: <span class="value"></span></li>
        </ul>
      </div>
    </div>
  </div>
</body>
</html>

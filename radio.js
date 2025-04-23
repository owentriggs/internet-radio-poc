var radio = {
  url: 'http://revo/fsapi/',
  sessionId: null,
  friendlyName: null,
  volumeSteps: null,
  volume: null,
  playInfoName: null,
  playInfoText: null,

  request: function (operation, value, success) {
    var url = this.url + operation + '?pin=1234';
    if (radio.sessionId) {
      url += '&sid=' + radio.sessionId;
    }
    if (value) {
      url += '&value=' + value;
    }
    console.log('Request URL:', url);

    $.get({
      url: url,
      success: function (data) {
        console.log('API Response:', data); // Log raw API response
        var xml = $('fsapiResponse', data);
        console.log('Parsed XML:', xml); // Log parsed XML
        if (typeof success !== 'undefined') {
          success(radio, xml);
        }
      },
      error: function (xhr, status, error) {
        console.error('API Request Failed:', status, error); // Log errors
      }
    });
  },

  updateUI: function (id, value) {
    console.log(`Updating UI element #${id} with value:`, value); // Debugging
    $(`#${id} .value`).text(value || 'N/A'); // Update the value or show 'N/A' if empty
  },

  getSessionId: function (success) {
    this.request('CREATE_SESSION', null, function (radio, xml) {
      radio.sessionId = xml.find('sessionId').text();
      radio.updateUI('session-id', radio.sessionId);
      success(radio);
    });
  },

  getFriendlyName: function (success) {
    this.request('GET/netRemote.sys.info.friendlyName', null, function (radio, xml) {
      radio.friendlyName = xml.find('value').text();
      radio.updateUI('friendly-name', radio.friendlyName);
      success(radio);
    });
  },

  getVolumeSteps: function (success) {
    this.request('GET/netRemote.sys.caps.volumeSteps', null, function (radio, xml) {
      radio.volumeSteps = xml.find('value').text();
      radio.updateUI('volume-steps', radio.volumeSteps);
      success(radio);
    });
  },

  getVolume: function (success) {
    this.request('GET/netRemote.sys.audio.volume', null, function (radio, xml) {
      radio.volume = xml.find('value').text();
      radio.updateUI('volume', radio.volume);
      success(radio);
    });
  },

  getPlayInfoName: function (success) {
    this.request('GET/netRemote.play.info.name', null, function (radio, xml) {
      radio.playInfoName = xml.find('value').text();
      radio.updateUI('play-info-name', radio.playInfoName);
      success(radio);
    });
  },

  getPlayInfoText: function (success) {
    this.request('GET/netRemote.play.info.text', null, function (radio, xml) {
      radio.playInfoText = xml.find('value').text();
      radio.updateUI('play-info-text', radio.playInfoText);
      success(radio);
    });
  }
};

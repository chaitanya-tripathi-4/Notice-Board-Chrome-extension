document.addEventListener('DOMContentLoaded', function() {
    const settingsForm = document.getElementById('settings-form');
  
    // Load settings
    chrome.storage.sync.get({
      enabledWidgets: {
        googleCalendar: true,
        poll: true,
        announcements: true,
        opportunityBoard: true,
        googleMeet: true,
        googleForm: true,
        issueTracker: true,
        googleSlides: true,
        pomodoroTimer: true
      }
    }, function(items) {
      const { enabledWidgets } = items;
      for (const widget in enabledWidgets) {
        document.getElementById(widget).checked = enabledWidgets[widget];
      }
    });
  
    // Save settings
    settingsForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const enabledWidgets = {
        googleCalendar: document.getElementById('googleCalendar').checked,
        poll: document.getElementById('poll').checked,
        announcements: document.getElementById('announcements').checked,
        opportunityBoard: document.getElementById('opportunityBoard').checked,
        googleMeet: document.getElementById('googleMeet').checked,
        googleForm: document.getElementById('googleForm').checked,
        issueTracker: document.getElementById('issueTracker').checked,
        googleSlides: document.getElementById('googleSlides').checked,
        pomodoroTimer: document.getElementById('pomodoroTimer').checked
      };
  
      chrome.storage.sync.set({ enabledWidgets }, function() {
        alert('Settings saved');
      });
    });
  });
  
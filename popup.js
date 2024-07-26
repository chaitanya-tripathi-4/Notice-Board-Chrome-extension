document.addEventListener('DOMContentLoaded', function() {
    // Load user settings and then load widgets
    chrome.storage.sync.get({
      enabledWidgets: {
        googleSlides: true,
        issueTracker: true,
        pomodoroTimer: true,
        announcements: true,
        googleCalendar: true,
        opportunityBoard: true,
        googleMeet: true,
        googleForm: true
        
        
      }
    }, function(items) {
      const { enabledWidgets } = items;
  
      if (enabledWidgets.googleSlides) loadGoogleSlides();
      if (enabledWidgets.issueTracker) loadIssueTracker();
      if (enabledWidgets.announcements || enabledWidgets.pomodoroTimer) loadAnnouncementsAndPomodoro();
      if (enabledWidgets.googleCalendar) loadGoogleCalendar();
      if (enabledWidgets.opportunityBoard) loadOpportunityBoard();
      if (enabledWidgets.googleMeet) loadGoogleMeet();
      if (enabledWidgets.googleForm) loadGoogleForm();
      
      
      
    });
  });
  function loadGoogleSlides() {      
    const widgetContainer = document.getElementById('widget-container');
    const widget = document.createElement('div');
    widget.className = 'widget';
    widget.id = 'google-slides-widget';
    widget.innerHTML = `
      <h2>Google Slides</h2>
      <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT3TVtuJZ2ema1iC6bflaUtmvvteyUDH4XMrT8jLUfQOFdz9QhSN9UajIBR94R7mRSeBL9tng3EQWU_/embed?start=true&loop=true&delayms=15000" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
   `;
   widgetContainer.appendChild(widget);
   }
   
   function loadAnnouncementsAndPomodoro() {
    const widgetContainer = document.getElementById('widget-container');
    const combinedWidget = document.createElement('div');
    combinedWidget.className = 'widget combined-widget';
    
    const announcementsWidget = document.createElement('div');
    announcementsWidget.id = 'announcements-widget';
    announcementsWidget.className = 'announcements';
    announcementsWidget.innerHTML = `
        <h2>Announcements</h2>
        <marquee>FIRST ANNOUNCEMENT!!!!! SECOND ANNOUNCEMENT!!!! THIRD ANNOUNCEMENT!!!!</marquee>
    `;
    
    const pomodoroWidget = document.createElement('div');
    pomodoroWidget.id = 'pomodoro-widget';
    pomodoroWidget.className = 'pomodoro-timer';
    pomodoroWidget.innerHTML = `
        <h2>Pomodoro Timer</h2>
        <div id="timer">
            <span id="minutes">25</span>:<span id="seconds">00</span>
        </div>
        <button id="start-timer">Start</button>
        <button id="reset-timer">Reset</button>
    `;
    
    combinedWidget.appendChild(announcementsWidget);
    combinedWidget.appendChild(pomodoroWidget);
    widgetContainer.appendChild(combinedWidget);

    let minutes = 25;
    let seconds = 0;
    let timerInterval;

    const timerDisplay = pomodoroWidget.querySelector('#timer');
    const startButton = pomodoroWidget.querySelector('#start-timer');
    const resetButton = pomodoroWidget.querySelector('#reset-timer');

    function updateTimer() {
        timerDisplay.innerHTML = `<span id="minutes">${String(minutes).padStart(2, '0')}</span>:<span id="seconds">${String(seconds).padStart(2, '0')}</span>`;
    }

    function startTimer() {
        if (timerInterval) return;

        timerInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert('Time is up!');
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            updateTimer();
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        minutes = 25;
        seconds = 0;
        updateTimer();
    }

    startButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);

    updateTimer();
}

  function loadGoogleCalendar() {
    const widgetContainer = document.getElementById('widget-container');
    const widget = document.createElement('div');
    widget.className = 'widget';
    widget.innerHTML = `
      <h2>Google Calendar Day View</h2>
      <iframe src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=your_time_zone" style="border: 0" width="100%" height="300" frameborder="0" scrolling="no"></iframe>
    `;
    widgetContainer.appendChild(widget);
  }



  function loadGoogleMeet() {
    const widgetContainer = document.getElementById('widget-container');
    const widget = document.createElement('div');
    widget.className = 'widget';
    
    // Define your topics and corresponding Google Meet links
    const topics = [
      { title: 'Topic 1', link: 'https://meet.google.com/your-meet-id-1' },
      { title: 'Topic 2', link: 'https://meet.google.com/your-meet-id-2' },
      { title: 'Topic 3', link: 'https://meet.google.com/your-meet-id-3' },
      { title: 'Topic 4', link: 'https://meet.google.com/your-meet-id-4' }
    ];
  
    // Set the top-level heading for the widget
    widget.innerHTML = `
      <h2>Google Meet</h2>
      <p>Select a topic below to join the Google Meet meeting:</p>
    `;
    
    // Create sections for each topic
    topics.forEach(topic => {
      const topicSection = document.createElement('div');
      topicSection.className = 'topic';
  
      topicSection.innerHTML = `
        <h2>${topic.title}</h2>
        <button onclick="window.open('${topic.link}', '_blank')">Join Meeting</button>
      `;
  
      widget.appendChild(topicSection);
    });
  
    widgetContainer.appendChild(widget);
  }

  function loadOpportunityBoard() {
    const widgetContainer = document.getElementById('widget-container');
    const widget = document.createElement('div');
    widget.className = 'widget';
    widget.innerHTML = `
        <h2>Opportunity Board</h2>
        <p>Check out the latest opportunities:</p>
        <ul>
            <li class="opportunity">
                <strong>Opportunity 1:</strong> Solve repetitive tasks for the marketing team.
                <a href="https://example.com/opportunity1" target="_blank">Learn more</a>
            </li>
            <li class="opportunity">
                <strong>Opportunity 2:</strong> Build an internal tool for the sales team.
                <a href="https://example.com/opportunity2" target="_blank">Learn more</a>
            </li>
            <li class="opportunity">
                <strong>Opportunity 3:</strong> Improve data analysis processes.
                <a href="https://example.com/opportunity3" target="_blank">Learn more</a>
            </li>
        </ul>
    `;
    widgetContainer.appendChild(widget);
}
  
  
  function loadGoogleForm() {
    const widgetContainer = document.getElementById('widget-container');
    const widget = document.createElement('div');
    widget.className = 'widget';
    widget.innerHTML = `
      <h2>Google Form</h2>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScDOm3-LcKRjbzFmwTI3UTrO1CcrCduley6x8W6bIE33AJPlA/viewform?embedded=true" width="300" height="400" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
    `;
    widgetContainer.appendChild(widget);
  }

  
  
  function loadIssueTracker() {
    const widgetContainer = document.getElementById('widget-container');
    const widget = document.createElement('div');
    widget.className = 'widget';
    
    widget.innerHTML = `
      <h2>Issue Tracker</h2>
      <form id="issue-form">
        <label for="issue-title">Title:</label>
        <input type="text" id="issue-title" name="issue-title" required>
        
        <label for="issue-description">Description:</label>
        <textarea id="issue-description" name="issue-description" rows="4" required></textarea>
        
        <button type="submit">Submit Issue</button>
      </form>
      <div id="issue-list">
        <h3>Reported Issues</h3>
        <ul id="issues">
          <!-- Issues will be listed here -->
        </ul>
      </div>
    `;
    
    widgetContainer.appendChild(widget);

    // Example of fetching existing issues (you would replace the URL with your actual data source)
    // fetch('/api/issues')
    //   .then(response => response.json())
    //   .then(issues => {
    //     const issueList = document.getElementById('issues');
    //     issues.forEach(issue => {
    //       const listItem = document.createElement('li');
    //       listItem.textContent = `Title: ${issue.title} - Description: ${issue.description}`;
    //       issueList.appendChild(listItem);
    //     });
    //   });

    // Handle form submission
    document.getElementById('issue-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('issue-title').value;
        const description = document.getElementById('issue-description').value;
        
        const issueList = document.getElementById('issues');
        const newIssue = document.createElement('li');
        newIssue.textContent = `Title: ${title} - Description: ${description}`;
        
        issueList.appendChild(newIssue);
        
        // Clear the form
        document.getElementById('issue-form').reset();
        
        // Optionally, send the new issue to your server
        fetch('/api/issues', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description })
        });
    });
}




  

  
  
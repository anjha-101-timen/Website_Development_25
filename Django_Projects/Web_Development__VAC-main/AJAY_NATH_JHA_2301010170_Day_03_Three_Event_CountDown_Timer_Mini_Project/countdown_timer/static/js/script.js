
const countdownContainer = document.getElementById('countdown');
const eventForm = document.getElementById('eventForm');
const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');
const hourSelect = document.getElementById('hour');
const minuteSelect = document.getElementById('minute');
const secondSelect = document.getElementById('second');
const ampmSelect = document.getElementById('ampm');

function populateSelect(select, options) 
{
  select.innerHTML = '';
  options.forEach
  (option => 
    {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
    }
  );
}

const years = Array.from({ length: 101 }, (_, i) => new Date().getFullYear() + i);
populateSelect(yearSelect, years);

const months = 
['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
populateSelect(monthSelect, months);

function populateDays(year, month) 
{
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  populateSelect(daySelect, days);
}

populateDays(new Date().getFullYear(), new Date().getMonth());

const hours = Array.from({ length: 24 }, (_, i) => i);
populateSelect(hourSelect, hours);

const minutes = Array.from({ length: 60 }, (_, i) => i);
populateSelect(minuteSelect, minutes);

const seconds = Array.from({ length: 60 }, (_, i) => i);
populateSelect(secondSelect, seconds);

monthSelect.addEventListener
('change', () => 
{
  const year = parseInt(yearSelect.value);
  const month = months.indexOf(monthSelect.value);
  populateDays(year, month);
}
);

eventForm.addEventListener
('submit', (event) => 
  {
  event.preventDefault();

  const year = parseInt(yearSelect.value);
  const month = months.indexOf(monthSelect.value);
  const day = parseInt(daySelect.value);
  const hour = parseInt(hourSelect.value);
  const minute = parseInt(minuteSelect.value);
  const second = parseInt(secondSelect.value);
  const ampm = ampmSelect.value;

  if (year < 1900 || month < 0 || month > 11 || day < 1 || day > 31 || 
    hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) 
    {
    alert('Invalid input values');
    return;
    }

  let eventDate = new Date(year, month, day, hour, minute, second);

  if (ampm === 'pm') 
    {
    eventDate.setHours(eventDate.getHours() + 12);
    }

  countdown(eventDate);
  }
);

function countdown(deadline) 
{
  const countdownInterval = setInterval(() => 
    {
    const now = new Date().getTime();
    const timeRemaining = deadline - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (timeRemaining <= 0) 
      {
      clearInterval(countdownInterval);
      countdownContainer.textContent = 'Event has ended!';
      }
    }, 1000);
}
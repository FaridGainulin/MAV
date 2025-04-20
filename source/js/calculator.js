/////////////////////////////////////////////////////////////////////
//КАЛЬКУЛЯТОР
/////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const selectHeader = document.getElementById('select-header');
  const selectOptions = document.getElementById('select-options');
  const selectedOption = document.getElementById('selected-option');

  const track = document.querySelector('.custom-range__track');
  const progress = document.querySelector('.custom-range__progress');
  const thumb = document.querySelector('.custom-range__thumb');
  const monthSpans = document.querySelectorAll('.calculation-section__months span');

  const resultSpan = document.getElementById('result');

  const steps = 8;
  const stepValues = [3, 6, 9, 12, 15, 18, 21, 24];
  const earningsMap = {
    '500000': 813000,
    '500001': 1032000,
  };

  let selectedPopulation = '500000'; // Значение по умолчанию: до 500 000 жителей
  let currentStep = stepValues.indexOf(12); // Значение по умолчанию: 12 месяцев

  // ==== ФУНКЦИИ ====
  function updateThumbPosition(stepIndex) {
    const percent = (stepIndex / (steps - 1)) * 100;
    progress.style.width = `${percent}%`;
    thumb.style.left = `${percent}%`;
  }

  function setActiveMonth(index) {
    monthSpans.forEach((span, i) => {
      span.classList.toggle('active', i === index);
    });
  }

  function calculateResult() {
    if (selectedPopulation && currentStep >= 0) {
      const baseValue = earningsMap[selectedPopulation];
      const months = stepValues[currentStep];
      const result = baseValue * months;
      resultSpan.textContent = result.toLocaleString();
    }
  }

  // ==== КАСТОМНЫЙ СЕЛЕКТ ====
  selectHeader.addEventListener('click', (e) => {
    e.stopPropagation();
    selectOptions.classList.toggle('show');
  });

  selectOptions.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      selectedPopulation = e.target.getAttribute('data-value');
      selectedOption.textContent = e.target.textContent;
      selectOptions.classList.remove('show');
      calculateResult();
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select')) {
      selectOptions.classList.remove('show');
    }
  });

  // ==== ПЕРЕМЕЩЕНИЕ БЕГУНКА И ПОДСВЕТКА МЕСЯЦЕВ ====
  monthSpans.forEach((span, index) => {
    span.addEventListener('click', () => {
      currentStep = index;
      updateThumbPosition(index);
      setActiveMonth(index);
      calculateResult();
    });
  });

  // ==== ПЕРЕТАСКИВАНИЕ БЕГУНКА ====
  let isDragging = false;

  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const trackRect = track.getBoundingClientRect();
      let position = e.clientX - trackRect.left;
      position = Math.max(0, Math.min(position, trackRect.width));

      const percent = (position / trackRect.width) * 100;

      const closestStep = stepValues.reduce((prev, _, index) => {
        const stepPercent = (index / (steps - 1)) * 100;
        return Math.abs(stepPercent - percent) < Math.abs((prev / (steps - 1)) * 100 - percent)
          ? index
          : prev;
      }, 0);

      currentStep = closestStep;
      updateThumbPosition(closestStep);
      setActiveMonth(closestStep);
      calculateResult();
    }
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.userSelect = '';
    }
  });

  track.addEventListener('click', (e) => {
    const trackRect = track.getBoundingClientRect();
    let position = e.clientX - trackRect.left;
    position = Math.max(0, Math.min(position, trackRect.width));

    const percent = (position / trackRect.width) * 100;

    const closestStep = stepValues.reduce((prev, _, index) => {
      const stepPercent = (index / (steps - 1)) * 100;
      return Math.abs(stepPercent - percent) < Math.abs((prev / (steps - 1)) * 100 - percent)
        ? index
        : prev;
    }, 0);

    currentStep = closestStep;
    updateThumbPosition(closestStep);
    setActiveMonth(closestStep);
    calculateResult();
  });

  // ==== УСТАНОВКА ЗНАЧЕНИЙ ПО УМОЛЧАНИЮ ====
  function setDefaults() {
    selectedOption.textContent = 'До 500 000 жителей';
    selectedPopulation = '500000';

    currentStep = stepValues.indexOf(12);
    updateThumbPosition(currentStep);
    setActiveMonth(currentStep);

    calculateResult();
  }

  setDefaults();
});

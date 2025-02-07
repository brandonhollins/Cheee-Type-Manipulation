const text = document.getElementById('text');
const speedControl = document.getElementById('speed');
const yeastMinControl = document.getElementById('yeastMin');
const yeastMaxControl = document.getElementById('yeastMax');
const gravityMinControl = document.getElementById('gravityMin');
const gravityMaxControl = document.getElementById('gravityMax');
const tempMinControl = document.getElementById('tempMin');
const tempMaxControl = document.getElementById('tempMax');
const translateYControl = document.getElementById('translateY');
const rotateControl = document.getElementById('rotate');

// Set the data-text attribute for the slime effect
text.setAttribute('data-text', text.textContent);

text.innerHTML = text.textContent.split('').map(char => 
    `<span class="char">${char}</span>`
).join('');

function updateAnimation() {
    const speed = speedControl.value;
    const yeastMin = yeastMinControl.value;
    const yeastMax = yeastMaxControl.value;
    const gravityMin = gravityMinControl.value;
    const gravityMax = gravityMaxControl.value;
    const tempMin = tempMinControl.value;
    const tempMax = tempMaxControl.value;
    const translateY = translateYControl.value;
    const rotate = rotateControl.value;

    document.documentElement.style.setProperty('--yeast-min', yeastMin);
    document.documentElement.style.setProperty('--yeast-max', yeastMax);
    document.documentElement.style.setProperty('--gravity-min', gravityMin);
    document.documentElement.style.setProperty('--gravity-max', gravityMax);
    document.documentElement.style.setProperty('--temp-min', tempMin);
    document.documentElement.style.setProperty('--temp-max', tempMax);
    document.documentElement.style.setProperty('--translate-y', `${translateY}px`);
    document.documentElement.style.setProperty('--rotate-deg', `${rotate}deg`);

    const chars = document.querySelectorAll('.char');
    chars.forEach((char, index) => {
        char.style.animationDuration = `${speed * (1 + (index % 4) * 0.1)}s`;
    });

    // Update text color based on temperature
    const tempAvg = (parseInt(tempMin) + parseInt(tempMax)) / 2;
    const hue = Math.floor(120 - (tempAvg / 1000) * 120); // 120 (green) at 0, 0 (red) at 1000
    text.style.setProperty('--text-color', `hsl(${hue}, 100%, 50%)`);
}

[speedControl, yeastMinControl, yeastMaxControl, gravityMinControl, gravityMaxControl, 
 tempMinControl, tempMaxControl, translateYControl, rotateControl].forEach(control => {
    control.addEventListener('input', updateAnimation);
});

updateAnimation();

import './ui.css'

document.getElementById('arabic').onchange = (event) => {
  const target = event.target as HTMLInputElement;
  const display = target.checked ? 'block' : 'none';
  (document.getElementById('isolates').parentNode as HTMLElement).style.display = display;
  (document.getElementById('ligatures').parentNode as HTMLElement).style.display = display;
  (document.getElementById('space-hack').parentNode as HTMLElement).style.display = display;
}

function getOptions() {
  const arabic = (document.getElementById('arabic') as HTMLInputElement).checked;
  const isolates = (document.getElementById('isolates') as HTMLInputElement).checked;
  const ligatures = (document.getElementById('ligatures') as HTMLInputElement).checked;
  const spaceHack = (document.getElementById('space-hack') as HTMLInputElement).checked;

  if(arabic) {
    return ({
      arabic,
      isolates,
      ligatures,
      spaceHack,
    })
  }
  else {
    return ({
      arabic,
      isolates: false,
      ligatures: false,
      spaceHack: false,
    })
  }
}

const fix = () => {
  const text = (document.getElementById('text') as HTMLTextAreaElement).value;
  parent.postMessage({ pluginMessage: { type: 'fix-text', text, options: getOptions() } }, '*')
}

document.getElementById('help').onclick = () => {
  document.getElementById('about').style.display = 'flex';
  document.getElementById('plugin').style.display = 'none';
}

document.getElementById('back').onclick = () => {
  document.getElementById('about').style.display = 'none';
  document.getElementById('plugin').style.display = 'flex';
}

document.getElementById('fix').addEventListener("click", fix);
document.getElementById('arabic').addEventListener("change", fix);
document.getElementById('isolates').addEventListener("change", fix);
document.getElementById('ligatures').addEventListener("change", fix);
document.getElementById('space-hack').addEventListener("change", fix);
document.getElementById('text').addEventListener("input", fix);

onmessage = (event) => {
  if(event.data.pluginMessage.type === 'init') {
    if(event.data.pluginMessage.data) {
      (document.getElementById('text') as HTMLInputElement).value = event.data.pluginMessage.data.text;
      (document.getElementById('arabic') as HTMLInputElement).checked = event.data.pluginMessage.data.options.arabic;
      (document.getElementById('isolates') as HTMLInputElement).checked = event.data.pluginMessage.data.options.isolates;
      (document.getElementById('ligatures') as HTMLInputElement).checked = event.data.pluginMessage.data.options.ligatures;
      (document.getElementById('space-hack') as HTMLInputElement).checked = event.data.pluginMessage.data.options.spaceHack;
    }
  }
}

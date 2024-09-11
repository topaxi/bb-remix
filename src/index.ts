import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

const markdownFiles = import.meta.glob('../slides/*.md', {
  query: 'raw',
  eager: true,
});

console.log(markdownFiles)

function main() {
  initializeReveal();
}

function initializeReveal() {
  let revealRoot = document.createElement('div');
  revealRoot.className = 'reveal'

  let slides = document.createElement('div');
  slides.className = 'slides';

  for (const path in markdownFiles) {
    let section = document.createElement('section');
    section.dataset.markdown = path

    let wrapper = document.createElement('section');
    wrapper.append(section)
    slides.append(wrapper);
  }

  revealRoot.append(slides);
  document.body.prepend(revealRoot);

  let deck = new Reveal({
    plugins: [Markdown],
  });

  deck.initialize();
}

main();

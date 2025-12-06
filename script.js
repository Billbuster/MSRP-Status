/*
script.js
Loads services.json, renders categories and services,
and draws the uptime history bars.
*/

async function load() {
  const res = await fetch('services.json');
  const data = await res.json();
  renderBoard(data);
}

function renderBoard(data) {
  const board = document.getElementById('board');
  board.innerHTML = '';

  data.categories.forEach(cat => {
    const section = document.createElement('section');
    section.className = 'category';

    const title = document.createElement('h2');
    title.textContent = cat.name;

    const card = document.createElement('div');
    card.className = 'card';

    const servicesList = document.createElement('div');
    servicesList.className = 'services-list';

    // Loop services in this category
    cat.services.forEach(srv => {
      const item = document.createElement('div');
      item.className = 'service-item';

      // LEFT SIDE
      const left = document.createElement('div');
      left.className = 'service-meta';

      const pct = document.createElement('span');
      pct.className = 'pct';
      pct.textContent = `${srv.uptime}%`;

      const name = document.createElement('div');
      name.className = 'service-name';
      name.textContent = srv.name;

      const tag = document.createElement('div');
      tag.className = 'tag';
      tag.textContent = srv.type;

      const sub = document.createElement('div');
      sub.className = 'service-sub';
      sub.textContent = srv.description || '';

      left.appendChild(pct);
      left.appendChild(name);
      left.appendChild(tag);
      left.appendChild(sub);

      // RIGHT SIDE — timeline bars
      const right = document.createElement('div');
      right.className = 'timeline';

      const barsWrap = document.createElement('div');
      barsWrap.className = 'bars';

      const barsInner = document.createElement('div');
      barsInner.className = 'bars-inner';

      // render tiny bars using srv.history
      if (srv.history && Array.isArray(srv.history)) {
        srv.history.forEach(val => {
          const bar = document.createElement('div');
          bar.className = 'bar';

          // 1 = UP, 0 = DOWN, 3 = PARTIAL OUTAGE
          if (val === 1) {
            bar.style.background = 'var(--accent)'; // GREEN
          } else if (val === 0) {
            bar.style.background = 'var(--red)';    // RED
          } else if (val === 3) {
            bar.style.background = 'var(--yellow)'; // YELLOW PARTIAL
          }

          barsInner.appendChild(bar);
        });
      }

      barsWrap.appendChild(barsInner);
      right.appendChild(barsWrap);

      // Put left + right inside item
      item.appendChild(left);
      item.appendChild(right);

      // Add item to list
      servicesList.appendChild(item);
    });

    card.appendChild(servicesList);
    section.appendChild(title);
    section.appendChild(card);
    board.appendChild(section);
  });
}

// Load on startup
load();

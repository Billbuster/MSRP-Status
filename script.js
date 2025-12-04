/*
script.js
- loads services.json
- renders categories and services
- uses `history` array in each service to draw the tiny bars
*/


async function load() {
const res = await fetch('services.json');
const data = await res.json();
renderBoard(data);
}


function renderBoard(data){
const board = document.getElementById('board');
board.innerHTML='';


data.categories.forEach(cat => {
const section = document.createElement('section');
section.className='category';


const title = document.createElement('h2');
title.textContent = cat.name;


const card = document.createElement('div');
card.className='card';


const servicesList = document.createElement('div');
servicesList.className='services-list';


cat.services.forEach(srv => {
const item = document.createElement('div');
item.className='service-item';


const left = document.createElement('div');
left.className='service-meta';


const pct = document.createElement('span');
pct.className='pct';
pct.textContent = `${srv.uptime}%`;


const name = document.createElement('div');
name.className='service-name';
name.textContent = srv.name;


const tag = document.createElement('div');
tag.className='tag';
tag.textContent = srv.type;


const sub = document.createElement('div');
sub.className='service-sub';
sub.textContent = srv.description || '';


left.appendChild(pct);
left.appendChild(name);
left.appendChild(tag);
left.appendChild(sub);


const right = document.createElement('div');
right.className='timeline';


const barsWrap = document.createElement('div');
barsWrap.className='bars';


const barsInner = document.createElement('div');
barsInner.className='bars-inner';


});

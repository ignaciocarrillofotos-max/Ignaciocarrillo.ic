const CONFIG = window.GALLERY_CONFIG || {};
let images = Array.isArray(window.galeriaActual) ? window.galeriaActual.slice() : [];
const gallery = document.getElementById('galleryGrid');
const modal = document.getElementById('lightbox');
const mainImg = document.getElementById('lbImage');
const counter = document.getElementById('lbCounter');
const thumbs = document.getElementById('lbThumbs');
const caption = document.getElementById('lbCaption');
let current = 0, scale = 1, startX=0, startY=0, panX=0, panY=0;

function fileLabel(src){
  const f=decodeURIComponent(src.split('/').pop()||'').replace(/\.[^.]+$/,'');
  return f.replace(/[-_]+/g,' ').replace(/\b\d+\b/g,'').trim();
}
function render(filter='all'){
  gallery.innerHTML='';
  images.forEach((src,i)=>{
    const card=document.createElement('article'); card.className='media-card'; card.dataset.index=i;
    card.innerHTML=`<button class="media-open" aria-label="Abrir fotografía ${i+1}"><img loading="lazy" src="${src}" alt="${CONFIG.title||'Fotografía'} — ${i+1}"><span class="media-scrim"></span><span class="media-meta"><b>${String(i+1).padStart(2,'0')}</b><small>${CONFIG.title||'IG-C'}</small></span></button>`;
    card.querySelector('button').addEventListener('click',()=>openLightbox(i));
    gallery.appendChild(card);
  });
  document.getElementById('resultCount').textContent=images.length;
}
function openLightbox(i){
  current=(i+images.length)%images.length; scale=1; panX=panY=0; updateTransform();
  modal.classList.add('is-open'); document.body.classList.add('no-scroll'); updateLightbox();
}
function closeLightbox(){modal.classList.remove('is-open'); document.body.classList.remove('no-scroll');}
function updateTransform(){mainImg.style.transform=`translate(${panX}px,${panY}px) scale(${scale})`; mainImg.style.cursor=scale>1?'grab':'zoom-in';}
function updateLightbox(){
  if(!images.length)return; mainImg.src=images[current]; mainImg.alt=`${CONFIG.title||'Fotografía'} ${current+1}`;
  counter.textContent=`${current+1} / ${images.length}`; caption.textContent=fileLabel(images[current]);
  thumbs.innerHTML=images.map((s,i)=>`<button class="thumb ${i===current?'active':''}" aria-label="Ir a fotografía ${i+1}"><img src="${s}" alt=""></button>`).join('');
  thumbs.querySelectorAll('.thumb').forEach((b,i)=>b.onclick=()=>{current=i;scale=1;panX=panY=0;updateTransform();updateLightbox();});
}
function step(n){current=(current+n+images.length)%images.length;scale=1;panX=panY=0;updateTransform();updateLightbox();}
document.getElementById('lbClose').onclick=closeLightbox;
document.getElementById('lbPrev').onclick=()=>step(-1);
document.getElementById('lbNext').onclick=()=>step(1);
document.getElementById('lbZoom').onclick=()=>{scale=scale===1?2:1;panX=panY=0;updateTransform();};
document.addEventListener('keydown',e=>{if(!modal.classList.contains('is-open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1);if(e.key==='+'||e.key==='='){scale=Math.min(4,scale+.5);updateTransform();}if(e.key==='-'){scale=Math.max(1,scale-.5);updateTransform();}});
mainImg.addEventListener('wheel',e=>{e.preventDefault();scale=Math.max(1,Math.min(4,scale+(e.deltaY<0?.25:-.25)));if(scale===1)panX=panY=0;updateTransform();},{passive:false});
mainImg.addEventListener('dblclick',()=>{scale=scale===1?2:1;panX=panY=0;updateTransform();});
mainImg.addEventListener('mousedown',e=>{if(scale<=1)return;mainImg.dataset.drag='1';startX=e.clientX-panX;startY=e.clientY-panY;});
window.addEventListener('mouseup',()=>mainImg.dataset.drag='');
window.addEventListener('mousemove',e=>{if(mainImg.dataset.drag!=='1')return;panX=e.clientX-startX;panY=e.clientY-startY;updateTransform();});
let touchX=0;modal.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;});modal.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX;if(scale===1&&Math.abs(dx)>60)step(dx<0?1:-1);});
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');}));
render();

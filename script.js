(() => {
  const wedding = new Date('2026-12-10T09:00:00+05:30');
  const parts = ['days','hours','minutes','seconds'];
  function updateCountdown(){
    let diff = Math.max(0, wedding.getTime() - Date.now());
    const vals=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
    parts.forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=String(vals[i]).padStart(2,'0')});
    if(diff===0){const note=document.querySelector('.countdown-note');if(note)note.textContent='The celebration day is here — let the blessings begin!'}
  }
  updateCountdown();setInterval(updateCountdown,1000);
  document.getElementById('openInvitation').addEventListener('click',()=>{
    startMusic();const cover=document.getElementById('cover');cover.classList.add('opened');cover.setAttribute('aria-label','Invitation opened');
    setTimeout(()=>{cover.style.display='none';document.getElementById('welcome').scrollIntoView({behavior:'smooth',block:'start'})},1000);
  });
  const music=document.getElementById('bgMusic'), toggle=document.getElementById('musicToggle');
  let startRequested=false;
  function setMusicState(isPlaying){
    toggle.classList.toggle('playing',isPlaying);
    toggle.setAttribute('aria-label',isPlaying?'Pause wedding music':'Play wedding music');
    toggle.title=isPlaying?'Pause wedding music':'Tap to play wedding music';
  }
  async function startMusic(){
    if(startRequested&&!music.paused)return;
    startRequested=true;
    try{await music.play();setMusicState(true)}catch(e){startRequested=false;setMusicState(false)}
  }
  function toggleMusic(){if(music.paused){startMusic()}else{music.pause();startRequested=false;setMusicState(false)}}
  toggle.addEventListener('click',toggleMusic);
  music.addEventListener('ended',()=>{startRequested=false;setMusicState(false)});
  music.addEventListener('error',()=>{startRequested=false;setMusicState(false);toggle.title='Audio could not be played; try reloading the page'});
  setMusicState(false);
  startMusic();
  document.addEventListener('pointerdown',event=>{if(!event.target.closest('#musicToggle'))startMusic()},{once:true});  const galleryThumbs=[...document.querySelectorAll('.gallery-thumb')];
  if(galleryThumbs.length){
    const galleryStage=document.getElementById('galleryStage'), featured=document.getElementById('featuredPhoto'), galleryCaption=document.getElementById('galleryCaption'), galleryCounter=document.getElementById('galleryCounter');
    const lightbox=document.getElementById('photoLightbox'), lightboxImage=document.getElementById('lightboxImage'), lightboxCaption=document.getElementById('lightboxCaption');
    const photos=galleryThumbs.map(button=>({src:button.querySelector('img').getAttribute('src'),caption:button.dataset.caption,alt:'K. Muthu Bharathi and R. Mariselvi — '+button.dataset.caption}));
    let currentPhoto=0, transitionId=0, rotationTimer;
    function showPhoto(index,animate=true){
      currentPhoto=(index+photos.length)%photos.length;const item=photos[currentPhoto];const token=++transitionId;
      const apply=()=>{if(token!==transitionId)return;featured.src=item.src;featured.alt=item.alt;galleryStage.style.setProperty('--gallery-backdrop',`url("${item.src}")`);galleryCaption.textContent=item.caption;galleryCounter.textContent=String(currentPhoto+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0');galleryThumbs.forEach((button,i)=>{button.classList.toggle('is-active',i===currentPhoto);button.setAttribute('aria-pressed',String(i===currentPhoto))});if(!lightbox.hidden){lightboxImage.src=item.src;lightboxImage.alt=item.alt;lightboxCaption.textContent=item.caption}featured.classList.remove('is-changing')};
      if(animate){featured.classList.add('is-changing');setTimeout(apply,210)}else apply();
    }
    function startRotation(){clearInterval(rotationTimer);rotationTimer=setInterval(()=>showPhoto(currentPhoto+1),5200)}
    function openLightbox(){clearInterval(rotationTimer);lightbox.hidden=false;document.body.classList.add('photo-viewer-open');showPhoto(currentPhoto,false);document.getElementById('lightboxClose').focus()}
    function closeLightbox(){lightbox.hidden=true;document.body.classList.remove('photo-viewer-open');document.getElementById('galleryOpen').focus();startRotation()}
    document.getElementById('galleryPrevious').addEventListener('click',()=>showPhoto(currentPhoto-1));
    document.getElementById('galleryNext').addEventListener('click',()=>showPhoto(currentPhoto+1));
    galleryThumbs.forEach(button=>button.addEventListener('click',()=>showPhoto(Number(button.dataset.index))));
    document.getElementById('galleryOpen').addEventListener('click',openLightbox);
    document.getElementById('galleryExpand').addEventListener('click',openLightbox);
    document.getElementById('lightboxPrevious').addEventListener('click',()=>showPhoto(currentPhoto-1,false));
    document.getElementById('lightboxNext').addEventListener('click',()=>showPhoto(currentPhoto+1,false));
    document.getElementById('lightboxClose').addEventListener('click',closeLightbox);
    lightbox.addEventListener('click',event=>{if(event.target===lightbox)closeLightbox()});
    document.addEventListener('keydown',event=>{if(lightbox.hidden)return;if(event.key==='Escape')closeLightbox();if(event.key==='ArrowLeft')showPhoto(currentPhoto-1,false);if(event.key==='ArrowRight')showPhoto(currentPhoto+1,false)});
    showPhoto(0,false);startRotation();
  }  const sections=document.querySelectorAll('.section');sections.forEach(s=>s.classList.add('reveal'));
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});sections.forEach(s=>observer.observe(s));
  const field=document.querySelector('.petal-field');function petal(){if(document.hidden)return;const el=document.createElement('i');el.className='petal';el.style.left=Math.random()*100+'vw';el.style.animationDuration=(7+Math.random()*7)+'s';el.style.setProperty('--drift',(Math.random()*140-70)+'px');el.style.background=['#e8b4a3','#f1d079','#fff0d4'][Math.floor(Math.random()*3)];field.appendChild(el);setTimeout(()=>el.remove(),14500)}setInterval(petal,1100);
})();

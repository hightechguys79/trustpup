// TrustPuppy modal loader
(function(){
  function ensureModal(){
    let wrap = document.getElementById('tp-modal');
    if (!wrap){
      wrap = document.createElement('div');
      wrap.id = 'tp-modal';
      document.body.appendChild(wrap);
    }
    if (!wrap.classList.contains('mounted')){
      wrap.classList.add('mounted');
      wrap.innerHTML = `
        <div class="tp-backdrop" data-close="true"></div>
        <div class="tp-dialog" role="dialog" aria-modal="true" aria-label="Details">
          <button class="tp-close" aria-label="Close">×</button>
          <div class="tp-content">Loading…</div>
        </div>`;
      wrap.querySelector('.tp-close').addEventListener('click', close);
      wrap.querySelector('.tp-backdrop').addEventListener('click', (e)=>{ if(e.target.dataset.close) close(); });
      document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
    }
    return wrap;
  }
  function open(){ ensureModal().classList.add('open'); }
  function close(){ const m=document.getElementById('tp-modal'); if(m) m.classList.remove('open'); }
  async function load(url){
    console.log('Modal load called with URL:', url);
    open();
    const cont = document.querySelector('#tp-modal .tp-content');
    cont.innerHTML = 'Loading…';
    try{
      console.log('Fetching:', url);
      
      // Try fetch first, fallback to alternative method if needed
      let html;
      try {
        const res = await fetch(url, {cache:'no-store'});
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        html = await res.text();
      } catch (fetchError) {
        console.warn('Fetch failed, trying alternative method:', fetchError);
        // Fallback for file:// protocol issues
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status === 0 || xhr.status === 200) {
          html = xhr.responseText;
        } else {
          throw new Error(`XHR ${xhr.status}: ${xhr.statusText}`);
        }
      }
      
      console.log('Loaded HTML length:', html.length);
      const tmp = document.createElement('div'); 
      tmp.innerHTML = html;
      const art = tmp.querySelector('article');
      cont.innerHTML = art ? art.outerHTML : html;
      setTimeout(()=>{ document.querySelector('#tp-modal .tp-dialog').focus(); }, 0);
    }catch(e){
      console.error('Modal load error:', e);
      cont.innerHTML = `<p>Failed to load content: ${e.message}</p>`;
    }
  }
  window.TrustPuppyModal = { open, close, load };
  console.log('TrustPuppyModal initialized successfully');
})();
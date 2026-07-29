(async function loadComponents() {
  const components = [
    { id: 'sidebar-root', url: 'components/sidebar.html' },
    { id: 'footer-root', url: 'components/footer.html' }
  ];

  try {
    await Promise.all(components.map(async (comp) => {
      const resp = await fetch(comp.url);
      if (!resp.ok) throw new Error('Failed to load ' + comp.url);
      const html = await resp.text();
      document.getElementById(comp.id).innerHTML = html;
    }));
    document.dispatchEvent(new Event('componentsLoaded'));
  } catch (e) {
    console.warn('Component load failed:', e);
  }
})();

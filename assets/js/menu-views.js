window.JJSTAR_MENU_VIEWS = (() => {
  const careerCodes = [
    'L04TGJB', 'L04INJB', 'L04MJDV', 'L04DCRM', 'L04MCRM', 'L04LEAD',
    'L04JBCP', 'L04NCSJ', 'L04JJKE', 'L04JBEF',
    'L04STRG', 'L04MBTI', 'L04UITY', 'L04PSYC', 'L04ETCT',
    'L04CN11', 'L04MENT', 'L04ONCN', 'L04PSCN',
    'L04BIZH', 'L04STSC',
    'L04INJP', 'L04COMP', 'L04MTJP', 'L04REQJ', 'L04PTJP', 'L04JBIN', 'L04EXAC', 'L04JBST',
    'L04INAG', 'L04INAP', 'L04INHI', 'L04INSV', 'L04INDR', 'L04INFA',
    'L04MYLF', 'L04MYCP', 'L04MYJB', 'L04MYCR', 'L04PORT'
  ];

  function select(menu, name) {
    if (name !== 'career') return { menu, title: '', count: null };
    const order = new Map(careerCodes.map((code, index) => [code, index]));
    function prune(nodes) {
      return nodes.filter(node => node.enabled !== false).flatMap(node => {
        if (node.children?.length) {
          const children = prune(node.children);
          return children.length ? [{ ...node, children }] : [];
        }
        return order.has(node.code) ? [{ ...node }] : [];
      }).sort((a, b) => firstIndex(a) - firstIndex(b));
    }
    function firstIndex(node) {
      return node.children?.length ? firstIndex(node.children[0]) : order.get(node.code);
    }
    const filtered = prune(menu);
    function countLeaves(nodes) {
      return nodes.reduce((sum, node) => sum + (node.children?.length ? countLeaves(node.children) : 1), 0);
    }
    return { menu: filtered, title: '진로·취업 가이드', count: countLeaves(filtered) };
  }

  return { select };
})();

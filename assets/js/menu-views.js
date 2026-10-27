window.JJSTAR_MENU_VIEWS = (() => {
  const hiddenCodes = new Set([
    'L04AMC5',
    'L04WITH',
    'L04AHAC',
    'L04JBST',
    'L04INJB',
    'L04NCRD',
    'L04MLEV',
    'L04SURS',
    'L04CPMG',
    'L04CN11',
    'L04CPRA',
    'L04KMOC',
    'L04LEAV',
    'L04MJDG',
    'L04OVRP',
    'L04ROOM',
    'L04SLEP',
    'L04SVPL',
    'L04SVRP',
    'L04TALG',
    'L04INCV',
    'L04MCRT',
    'L04NCCF',
    'L04MENT',
    'L04PRJT',
    'L04TGTH',
    'L04LEVD',
    'L04SVAP',
    'L04BEST',
    'L04CMMT',
    'L04CMRP',
    'L04ELCT',
    'L04GRDC',
    'L04GREJ',
    'L04INAP',
    'L04INDR',
    'L04INDC',
  ]);

  const homeHiddenCodes = new Set([
    'L02JEJE',
    'L02SRCH',
  ]);

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
    function excludeHidden(nodes) {
      return nodes.filter(node => !hiddenCodes.has(node.code) && !homeHiddenCodes.has(node.code)).flatMap(node => {
        if (!node.children?.length) return [node];
        const children = excludeHidden(node.children);
        return children.length ? [{ ...node, children }] : [];
      });
    }
    menu = excludeHidden(menu);
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

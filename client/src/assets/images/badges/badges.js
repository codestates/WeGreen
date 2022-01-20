const importAll = (r) => r.keys().map(r);

const Badges = importAll(require.context('./', false, /\.(png)$/));

export default Badges

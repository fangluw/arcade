export const site = {
	title: "Carmen's Website",
	homeTitle: "Carmen's Website For CS5610",
	updated: 'Oct 2026'
};

export const games = [
	{
		id: 'crossword',
		href: '/crossword',
		navLabel: 'Crossword',
		title: 'Mini Crossword',
		linkText: 'Play the mini crossword'
	},
	{
		id: '2048',
		href: '/2048',
		navLabel: '2048',
		title: '2048',
		linkText: 'Play 2048'
	}
];

export const navItems = [
	{ href: '/', label: 'Home' },
	...games.map((game) => ({ href: game.href, label: game.navLabel })),
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' }
];

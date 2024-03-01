export const appName = 'StreamBlend TV';

export const netflixBaseUrl = 'https://www.netflix.com';

// https://www.netflix.com/watch/81212177?trackId=14170286&tctx=2%2C0%2Cdb5e46e1-0016-4801-83fa-bef545a4fd05-5156608%2CNES_EDA0ACD3A0EE36B40CA302FB8C3073-994911DC4F528C-246D9A40FA_p_1708656285252%2CNES_EDA0ACD3A0EE36B40CA302FB8C3073_p_1708656285252%2C%2C%2C%2C%2CVideo%3A80986854%2CminiDpPlayButton
// https://www.netflix.com/watch/81212177?trackId=14170286

export interface Genre {
	id: number;
	name: string;
}

// Anime example
// https://www.netflix.com/watch/81015879?trackId=250322545&tctx=1%2C0%2Cdb5e46e1-0016-4801-83fa-bef545a4fd05-5211992%2CNES_6D02943813BC7919DCE67FD56095C8-DA1E3B0A33B938-7066962EF5_p_1708656973636%2C%2C%2C%2C%2C%2CVideo%3A80107103%2CdetailsPagePlayButton
// https://www.netflix.com/watch/81015880?trackId=250322545

export const netflixGenres: Genre[] = [
	{
		id: 83,
		name: 'TV Shows',
	},
	{
		id: 89814,
		name: 'Award-Winning TV Shows',
	},
];

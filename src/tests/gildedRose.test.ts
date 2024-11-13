import { Item, GildedRose } from '../core/gildedRose';

describe('The Gilded Rose', () => {
	it('updates quality for a new item', () => {
		const gildedRose = new GildedRose([new Item('new item', 0, 0)]);

		const items = gildedRose.updateQuality();

		expect(items[0]).toEqual({"name": "new item", "quality": 0, "sellIn": -1});
	});
});

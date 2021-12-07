import { Item, GildedRose } from '../core/gilded-rose';

describe('The Gilded Rose', () => {
	xit('updates quality for a new item', () => {
		const gildedRose = new GildedRose([new Item('new item', 0, 0)]);

		const items = gildedRose.updateQuality();

		expect(items[0]).toEqual({"name": "foo", "quality": 0, "sellIn": -1});
	});

	it('updates quality (using golden master approval technique)', () => {
		const items = generateCombinationOfItemsFrom(
			['new item', 'Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros'],
			range(-1, 13),
			range(0, 51))
		const gildedRose = new GildedRose(items);

		const updatedItems = gildedRose.updateQuality();

		expect(updatedItems).toMatchSnapshot();
	});
});

function generateCombinationOfItemsFrom(names:string[], sellinDays: number[], qualities:number[]) {
	return names.flatMap(
		name => sellinDays.flatMap(
			sellin => qualities.flatMap(
				quality => new Item(name, sellin, quality))))
}

function range(from:number, length:number): number[] {
	return Array.from({ length: length }, (_, i) => i + from);
}
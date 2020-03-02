import test from 'ava'
import actions from '../public/game/actions'
import Dungeon, {CampfireRoom, MonsterRoom, Monster} from '../public/game/dungeon'

const a = actions

// Each test gets a fresh game state.
test.beforeEach(t => {
	let state = a.createNewGame()
	state = a.drawStarterDeck(state)
	state = a.drawCards(state)
	t.context = {state}
})

test('can create a dungeon', t => {
	const simpleDungeon = new Dungeon({
		rooms: [new MonsterRoom(new Monster()), new CampfireRoom(), new MonsterRoom(new Monster())]
	})

	t.is(simpleDungeon.rooms.length, 3)
	t.is(simpleDungeon.rooms[0].type, 'monster')
	t.is(simpleDungeon.rooms[0].monsters.length, 1)
	t.is(simpleDungeon.rooms[1].type, 'campfire')
	t.is(simpleDungeon.rooms[2].type, 'monster')
})

test('can create rooms with many monsters', t => {
	const advancedDungeon = new Dungeon({
		rooms: [new MonsterRoom(new Monster(), new Monster({hp: 100})), new CampfireRoom()]
	})

	t.is(advancedDungeon.rooms[0].monsters.length, 2)
	t.is(advancedDungeon.rooms[0].monsters[1].currentHealth, 100)
})

test('we know when a room is won', t => {
	const room = new MonsterRoom(new Monster())
	t.false(room.isComplete)
	room.monsters[0].currentHealth = 0
	t.true(room.isComplete)
})

test('we can navigate a dungeon', t => {
	const dungeon = new Dungeon({
		rooms: [new CampfireRoom(), new CampfireRoom(), new CampfireRoom()]
	})
	t.deepEqual(dungeon.currentRoom.id, dungeon.rooms[0].id)
	dungeon.goToNextRoom()
	t.deepEqual(dungeon.currentRoom.id, dungeon.rooms[1].id)
	dungeon.goToNextRoom()
	t.deepEqual(dungeon.currentRoom.id, dungeon.rooms[2].id)
	t.throws(() => dungeon.goToNextRoom())
	t.is(dungeon.currentIndex, 2)
})

test('campfire can rest or upgrade', t => {
	const camp = new CampfireRoom()
	t.is(typeof camp.rest, 'function')
	t.is(typeof camp.upgrade, 'function')
	t.is(typeof camp.remove, 'function')
})
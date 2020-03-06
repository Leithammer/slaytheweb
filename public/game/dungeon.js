import {uuid} from './utils.js'

// A dungeon is where the adventure starts. It has a path of rooms, you know where you are and you can continue to the next room.
export default function Dungeon(props) {
	if (!props.rooms) throw new Error('You must pass in rooms to create a dungeon')
	return {
		id: uuid(),
		rooms: props.rooms,
		roomNumber: 0
	}
}

// A campfire gives our hero the opportunity to rest, remove or upgrade a card.
export function CampfireRoom() {
	return {
		id: uuid(),
		type: 'campfire'
	}
}

// A monster room has one or more monsters.
export function MonsterRoom(...monsters) {
	return {
		id: uuid(),
		type: 'monster',
		monsters: monsters
	}
}

// A monster has health, probably some damage and a list of intents.
// Intents are cycled through as the monster plays its turn.
export function Monster(props = {}) {
	return {
		id: uuid(),
		maxHealth: props.hp || 42,
		currentHealth: props.hp || 42,
		damage: props.damage || 5,
		powers: {}
	}
}

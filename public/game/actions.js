import {cards, Card} from './cards.js'
import produce from '../web_modules/immer.js'

// This is the big object of game state. Everything should start here.
export function createNewGame() {
	return {
		cards: [],
		player1: {
			maxEnergy: 3,
			currentEnergy: 3,
			maxHealth: 100,
			currentHealth: 100
		},
		player2: {
			maxEnergy: 3,
			currentEnergy: 3,
			maxHealth: 42,
			currentHealth: 42
		}
	}
}

export function drawCard(name) {
	return new Card(cards.find(card => card.name === name))
}

export function drawStarterDeck({state}) {
	const deck = [
		drawCard('Bash'),
		drawCard('Defend'),
		// drawCard('Defend'),
		// drawCard('Defend'),
		// drawCard('Defend'),
		// drawCard('Strike'),
		// drawCard('Strike'),
		// drawCard('Strike'),
		drawCard('Strike')
	]
	return produce(state, draft => {
		draft.cards = deck
	})
}

export function playCard({state, card}) {
	if (!card) throw new Error('No card to play')
	if (state.player1.currentEnergy < card.cost) throw new Error('Not enough energy to play card')
	return produce(state, draft => {
		// Recaclculate energy.
		draft.player1.currentEnergy = state.player1.currentEnergy - card.cost
		// Remove the card from our hand.
		draft.cards = state.cards.filter(c => c.id !== card.id)
		card.use()
	})
}

export default {
	createNewGame,
	drawCard,
	drawStarterDeck,
	playCard
}

// ### Deck Modification

// * `deck add [id] {cardcount} {upgrades}` add card to deck (optional: integer # of times you want to add this card) (optional: integer # of upgrades)
// * `deck remove [id]` remove card from deck
// * `deck remove all` remove all cards from deck

// ## Console Commands

// ### Anytime

// * `gold add [amount]` gain gold
// * `gold lose [amount]` lose gold
// * `potion [pos] [id]` gain specified potion in specified slot (0, 1, or 2)
// * `hp add [amount]` heal amount
// * `hp remove [amount]` hp loss
// * `maxhp add [amount]` gain max hp
// * `maxhp remove [amount]` lose max hp
// * `debug [true/false]` sets `Settings.isDebug`

// ### During Combat

// * `draw [num]` draw cards
// * `energy add [amount]` gain energy
// * `energy inf` toggles infinite energy
// * `energy remove [amount]` lose energy
// * `hand add [id] {cardcount} {upgrades}` add card to hand with (optional: integer # of times to add the card) (optional: integer # of upgrades)
// * `hand remove all` exhaust entire hand
// * `hand remove [id]` exhaust card from hand
// * `kill all` kills all enemies in the current combat
// * `kill self` kills your character
// * `power [id] [amount]` bring up a targetting reticle to apply amount stacks of a power to either the player or an enemy

// ### Outside of Combat

// * `fight [name]` enter combat with the specified encounter
// * `event [name]` start event with the specified name

// ### Anytime

// * `gold add [amount]` gain gold
// * `gold lose [amount]` lose gold
// * `info toggle` Settings.isInfo
// * `potion [pos] [id]` gain specified potion in specified slot (0, 1, or 2)
// * `hp add [amount]` heal amount
// * `hp remove [amount]` hp loss
// * `maxhp add [amount]` gain max hp
// * `maxhp remove [amount]` lose max hp
// * `debug [true/false]` sets `Settings.isDebug`

// ### Relics

// * `relic add [id]` generate relic
// * `relic list` logs all relic pools
// * `relic remove [id]` lose relic
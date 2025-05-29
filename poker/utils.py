RANK_VALUES = {
    '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9,
    '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
}

class CardObj:
    def __init__(self, card_code):
        self.rank = ''.join([ch for ch in card_code if ch.isalnum()])
        self.suit = ''.join([ch for ch in card_code if not ch.isalnum()])
        self.value = RANK_VALUES[self.rank]

class Combinations:
    def __init__(self, cards):  # cards: list[str]
        card_objs = [CardObj(card) for card in cards]
        self.suits = [c.suit for c in card_objs]
        self.values = sorted([c.value for c in card_objs])
        self.counts = {v: self.values.count(v) for v in set(self.values)}

    def is_flush(self):
        return len(set(self.suits)) == 1

    def is_straight(self):
        vals = sorted(set(self.values))
        if len(vals) != 5:
            return False
        return vals[-1] - vals[0] == 4 or vals == [2, 3, 4, 5, 14]

    def score(self):
        if self.is_flush() and self.values == [10, 11, 12, 13, 14]:
            return 1, "Royal Flush"
        if self.is_flush() and self.is_straight():
            return 2, "Straight Flush"
        if 4 in self.counts.values():
            return 3, "Four of a Kind"
        if 3 in self.counts.values() and 2 in self.counts.values():
            return 4, "Full House"
        if self.is_flush():
            return 5, "Flush"
        if self.is_straight():
            return 6, "Straight"
        if 3 in self.counts.values():
            return 7, "Three of a Kind"
        if list(self.counts.values()).count(2) == 2:
            return 8, "Two Pairs"
        if 2 in self.counts.values():
            return 9, "One Pair"
        return 10, "High Card"

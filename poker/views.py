from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import GameSession
from .serializers import GameSessionSerializer
from .utils import Combinations
import random

SUITS = ['♠', '♥', '♦', '♣']
RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

def get_card_image(card_code):
    rank_map = {
        '10': '0', 'J': 'J', 'Q': 'Q', 'K': 'K', 'A': 'A',
        '2': '2', '3': '3', '4': '4', '5': '5',
        '6': '6', '7': '7', '8': '8', '9': '9'
    }
    suit_map = {'♠': 'S', '♥': 'H', '♦': 'D', '♣': 'C'}

    rank = ''.join([ch for ch in card_code if ch.isalnum()])
    suit = ''.join([ch for ch in card_code if not ch.isalnum()])
    rank_letter = rank_map.get(rank, rank)
    suit_letter = suit_map.get(suit, 'S')

    return f"https://deckofcardsapi.com/static/img/{rank_letter}{suit_letter}.png"


def draw_hand(deck):
    return [deck.pop(), deck.pop(), deck.pop(), deck.pop(), deck.pop()]

class PlayView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        deck = [rank + suit for rank in RANKS for suit in SUITS]
        random.shuffle(deck)

        player_hand = draw_hand(deck)
        bot_hand = draw_hand(deck)

        player_score, player_combo = Combinations(player_hand).score()
        bot_score, bot_combo = Combinations(bot_hand).score()

        if player_score < bot_score:
            winner = "player"
        elif player_score > bot_score:
            winner = "bot"
        else:
            winner = "draw"

        GameSession.objects.create(
            user=request.user,
            player_cards=player_hand,
            bot_cards=bot_hand,
            winner=winner
        )

        def format_hand(hand):
            return [{"code": card, "img": get_card_image(card)} for card in hand]

        return Response({
            "player_cards": format_hand(player_hand),
            "bot_cards": format_hand(bot_hand),
            "player_combination": player_combo,
            "bot_combination": bot_combo,
            "winner": winner
        })

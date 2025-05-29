from django.db import models
from users.models import User  # если у тебя кастомный User

class GameSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    player_cards = models.JSONField()
    bot_cards = models.JSONField()
    winner = models.CharField(max_length=10)  # 'player' / 'bot' / 'draw'
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Game {self.id} - {self.user.username} vs Bot"

from rest_framework import serializers
from .models import GameSession

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = ['id', 'user', 'player_cards', 'bot_cards', 'winner', 'created_at']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        return GameSession.objects.create(**validated_data)
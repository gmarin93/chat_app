import django.contrib.auth.models
from rest_framework import serializers
from room.models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'description', 'room_type', 'avatar', 'created_by', 'created_at', 'updated_at']
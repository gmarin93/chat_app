import django.contrib.auth.models
from rest_framework import serializers
from room.models import RoomMembership

class RoomMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomMembership
        fields = ['id', 'user', 'room', 'role', 'can_send_messages', 'can_invite_users', 'joined_at', 'last_read_at']
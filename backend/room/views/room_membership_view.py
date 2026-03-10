import django.contrib.auth.models
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from room.models import RoomMembership
from room.serializers import RoomMembershipSerializer

class RoomMembershipView(APIView):
    def get(self, request):
        room_memberships = RoomMembership.objects.all()
        serializer = RoomMembershipSerializer(room_memberships, many=True)
        return Response(serializer.data)